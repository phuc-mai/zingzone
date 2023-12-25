import { Webhook } from "svix";
import { headers } from "next/headers";

import { deleteUser, createOrUpdateUser } from "./clerkUser";
import { NextResponse } from "next/server";

export const POST = async (req) => {

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt?.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, username, first_name, last_name, image_url, email_addresses } =
      evt?.data;

    try {
      await createOrUpdateUser(
        id,
        username,
        first_name,
        last_name,
        image_url,
        email_addresses
      );

      return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.deleted") {
    try {
      const { id } = evt?.data;

      await deleteUser(id);

      return NextResponse.json(
        { message: "User deleted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};
