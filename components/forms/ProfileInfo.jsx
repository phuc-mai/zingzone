"use client";

import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { updateUserInfo } from "@app/api/user";
import { useRouter } from "next/navigation";

const ProfileInfo = ({ user }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const profileForm = new FormData();

      for (const key in data) {
        if(key === 'profilePhoto' && typeof data[key] !== 'string') profileForm.append(key, data[key][0]);
        else profileForm.append(key, data[key]);
      }

      const user = await updateUserInfo(profileForm);

      if (user) router.push("/");
      
    } catch (err) {
      console.log("Create or Update profile failed", err.message);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="profile_photo"
        className="flex items-center gap-4 text-light-1 cursor-pointer"
      >
        {watch("profilePhoto") ? (
          //check profilePhoto is a string or a file
          typeof watch("profilePhoto") === "string" ? (
            <Image
              src={watch("profilePhoto")}
              alt="profile"
              width={120}
              height={120}
              className="object-cover rounded-full"
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("profilePhoto")[0])  }
              alt="profile"
              width={120}
              height={120}
              className="object-cover rounded-full"
            />
          )
        ) : (
          <AccountCircle sx={{ fontSize: "90px", color: "white" }} />
        )}
        <p>Upload profile photo</p>
      </label>
      <input
        {...register("profilePhoto", {
          validate: (value) => {
            if (typeof value === "null" || Array.isArray(value) && value.length === 0 || value === "undefined") {
              return "Profile photo is required";
            }
            return true;
          },
        })}
        id="profile_photo"
        type="file"
        style={{ display: "none" }}
      />
      {errors.profilePhoto && (
        <p className="text-red-500">{errors.profilePhoto.message}</p>
      )}

      <div className="w-full flex gap-5 md:gap-10">
        <div className="w-1/2 flex flex-col">
          <label className="text-light-1">First Name</label>
          <input
            {...register("firstName", {
              required: "First name is required",
              validate: (value) => {
                if (value[0] !== value[0].toUpperCase()) {
                  return "First Name must have first letter capitalized";
                }
                if (value.length < 2 || value.length > 20) {
                  return "First name must in between 2 and 20 letters";
                }
              },
            })}
            className="w-full profile-input"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="w-1/2 flex flex-col">
          <label className="text-light-1">Last Name</label>
          <input
            {...register("lastName", {
              required: "Last Name is required",
              validate: (value) => {
                if (value[0] !== value[0].toUpperCase()) {
                  return "Last name must have first letter capitalized";
                }
                if (value.length < 2 || value.length > 20) {
                  return "Last name must in between 2 and 20 letters";
                }
              },
            })}
            className="w-full profile-input"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-light-1">Username</label>
        <input
          {...register("username", {
            required: "Username is required",
            validate: (value) => {
              if (value.length < 5 || value.length > 20) {
                return "Username must be in between 5 and 20 letters";
              }
              if (value.match(/[A-Z]/)) {
                return "Username must not contain capital letters";
              }
            },
          })}
          className="w-full profile-input"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="text-light-1">Bio</label>
        <textarea
          {...register("bio", {
            required: "Bio is required",
            validate: (value) => {
              if (value.length < 10 || value.length > 100) {
                return "Bio must be in between 10 and 100 letters";
              }
            },
          })}
          rows="3"
          className="w-full profile-input"
        />
        {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Submit
      </button>
    </form>
  );
};

export default ProfileInfo;
