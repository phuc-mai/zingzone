/* eslint-disable camelcase */
// Resource: https://clerk.com/docs/users/sync-data-to-your-backend
// Above article shows why we need webhooks i.e., to sync data to our backend

// Resource: https://docs.svix.com/receiving/verifying-payloads/why
// It's a good practice to verify webhooks. Above article shows why we should do it
import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";

import { IncomingHttpHeaders } from "http";

import { NextResponse } from "next/server";
import { createUser } from "./clerkUser";

// Resource: https://clerk.com/docs/integration/webhooks#supported-events
// Above document lists the supported events

export const POST = async (request) => {
  const payload = await request.json();
  const header = headers();

  const heads = {
    "svix-id": header.get("svix-id"),
    "svix-timestamp": header.get("svix-timestamp"),
    "svix-signature": header.get("svix-signature"),
  };

  // Activitate Webhook in the Clerk Dashboard.
  // After adding the endpoint, you'll see the secret on the right side.
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

  try {
    evnt = wh.verify(
      JSON.stringify(payload),
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  // Listen organization creation event
  if (eventType === "user.created") {
    // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/CreateOrganization
    // Show what evnt?.data sends from above resource
    const { id, username, first_name, last_name, image_url, email_addresses } =
      evnt?.data ?? {};

    try {
      // @ts-ignore
      await createUser(
        // @ts-ignore
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
};
