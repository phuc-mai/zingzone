import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const createOrUpdateUser = async (id, username, first_name, last_name, image_url, email_addresses) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          username,
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
        },
      },
      { upsert: true, new: true } // Create a new user if the user does not exist, and return the updated document
    );

    return user;
  } catch (err) {
    throw new Error(`Failed to create or update user: ${err.message}`);
  }
}


export const deleteUser = async (id) => {
  try {
    await connectToDB();

    await User.findOneAndDelete({ clerkId: id });

  } catch (err) {
    throw new Error(`Failed to delete user: ${err.message}`);
  }
}
