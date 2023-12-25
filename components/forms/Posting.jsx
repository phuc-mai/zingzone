"use client";

import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Posting = ({ post, handlePublish }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });


  const onSubmit = async (data) => {
    try {
      const postForm = new FormData();

      for (const key in data) {
        if (key === "postPhoto" && typeof data[key] !== "string")
          postForm.append(key, data[key][0]);
        else postForm.append(key, data[key]);
      }

      const post = await handlePublish(postForm);
      if (post) router.push("/");
    } catch (err) {
      console.log("Create or Update post failed", err.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-7 pb-24"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label
        htmlFor="post_photo"
        className="flex items-center gap-4 text-light-1 cursor-pointer"
      >
        {watch("postPhoto") ? (
          //check postPhoto is a string or a file
          typeof watch("postPhoto") === "string" ? (
            <Image
              src={watch("postPhoto")}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          )
        ) : (
          <AddPhotoAlternateOutlined
            sx={{ fontSize: "100px", color: "white" }}
          />
        )}
        <p>Upload a photo</p>
      </label>
      <input
        {...register("postPhoto", {
          validate: (value) => {
            if (
              typeof value === "null" ||
              (Array.isArray(value) && value.length === 0) ||
              value === "undefined"
            ) {
              return "A photo is required";
            }
            return true;
          },
        })}
        id="post_photo"
        type="file"
        style={{ display: "none" }}
      />
      {errors.postPhoto && (
        <p className="text-red-500">{errors.postPhoto.message}</p>
      )}

      <div>
        <label className="text-light-1">Caption</label>
        <textarea
          {...register("caption", {
            required: "Caption is required",
            validate: (value) => {
              if (value.length < 2) {
                return "Caption must be more than 2 characters";
              }
            },
          })}
          className="w-full profile-input"
          rows="3"
          placeholder="What's on your mind?"
        />
        {errors.username && (
          <p className="text-red-500">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label className="text-light-1">Tag</label>
        <input
          {...register("tag", {
            required: "Tag is required",
          })}
          className="w-full profile-input"
          placeholder="#tag"
        />
        {errors.bio && <p className="text-red-500">{errors.tag.message}</p>}
      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Publish
      </button>
    </form>
  );
};

export default Posting;
