import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const PREDEFINED_FOCUS_AREAS = [
  "Beginner Setup",
  "Troubleshooting",
  "Gear Reviews",
  "Maintenance",
  "DIY / Mods",
  "Buying Guide",
];

const UpdateGroup = () => {
  const group = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(group.image);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: group.name,
      category: group.category,
      description: group.description,
      startDate: group.startDate?.slice(0, 10),
      maxMembers: group.maxMembers,
      location: group.location,
      image: group.image,
      difficultyLevel: group.difficultyLevel,
      isPhysicalMeetup: group.meetupType === "Physical",
      focusAreas: group.focusAreas || [],
      customFocusArea: "",
    },
  });

  const isPhysical = watch("isPhysicalMeetup");

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire("Error", "Image must be under 2MB", "error");
      return;
    }

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      setValue("image", data.secure_url, { shouldValidate: true });
      setImagePreview(data.secure_url);
    } catch {
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = async (data) => {
    let focusAreas = [...(data.focusAreas || [])];

    if (data.customFocusArea) {
      const custom = data.customFocusArea
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      focusAreas.push(...custom);
    }

    const updatedGroup = {
      ...group,
      name: data.name,
      slug: generateSlug(data.name),
      category:
        data.category === "other" && data.customCategory
          ? data.customCategory
          : data.category,
      description: data.description,
      meetupType: data.isPhysicalMeetup ? "Physical" : "Online",
      location: data.location,
      focusAreas,
      difficultyLevel: data.difficultyLevel,
      startDate: data.startDate,
      maxMembers: Number(data.maxMembers),
      image: data.image,
      updatedAt: new Date(),
      updatedBy: {
        name: user.displayName,
        email: user.email,
      },
    };

    const confirm = await Swal.fire({
      title: "Update Group?",
      text: `Save changes to "${group.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `https://hobby-hub-server-psi-bay.vercel.app/groups/${group._id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedGroup),
      }
    );

    const result = await res.json();
    if (result.modifiedCount) {
      Swal.fire("Updated!", "Group updated successfully", "success");
      navigate("/myGroups");
    }
  };

  return (
    <div className="mb-10 max-w-5xl mx-auto py-8 md:py-16 px-6 md:px-12 mt-4">
      <Helmet>
        <title>HobbyHub || Update Group</title>
      </Helmet>

      <div className="text-center pb-8">
        <h2 className="text-4xl text-primary font-semibold mb-3">
          Update Hobby Space
        </h2>
        <p className="text-gray-500 text-lg">
          Keep your community up to date
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Group Name */}
        <fieldset className="fieldset border p-4 rounded-box mb-4">
          <label className="label">Group Name</label>
          <input
            className="input input-bordered bg-transparent w-full"
            {...register("name", { required: true })}
          />
        </fieldset>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset className="fieldset border p-4 rounded-box">
            <label className="label">Category</label>
            <select
              className="select select-bordered bg-transparent w-full"
              {...register("category", { required: true })}
            >
              <option value="aquarium">Aquarium & Fish Keeping</option>
              <option value="photography">Photography</option>
              <option value="mechanical-keyboards">Mechanical Keyboards</option>
              <option value="home-coffee">Home Coffee Brewing</option>
              <option value="fitness">Fitness</option>
              <option value="other">Other</option>
            </select>

            {watch("category") === "other" && (
              <input
                className="input input-bordered bg-transparent mt-2"
                placeholder="Specify category"
                {...register("customCategory")}
              />
            )}
          </fieldset>

          <fieldset className="fieldset border p-4 rounded-box">
            <label className="label">Difficulty</label>
            <select
              className="select select-bordered bg-transparent w-full"
              {...register("difficultyLevel", { required: true })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </fieldset>

          <fieldset className="fieldset border p-4 rounded-box">
            <label className="label">Start Date</label>
            <input
              type="date"
              className="input input-bordered bg-transparent w-full"
              {...register("startDate", { required: true })}
            />
          </fieldset>

          <fieldset className="fieldset border p-4 rounded-box">
            <label className="label">Max Members</label>
            <input
              type="number"
              className="input input-bordered bg-transparent w-full"
              {...register("maxMembers", { required: true, min: 2 })}
            />
          </fieldset>
        </div>

        {/* Meetup Type */}
        <fieldset className="border p-4 rounded-box mt-4">
          <label className="label font-medium">Meetup Type</label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...register("isPhysicalMeetup")}
            />
            <span>Physical meetup</span>
          </label>

          <input
            className="input input-bordered bg-transparent w-full mt-3"
            placeholder="Location or meeting link"
            {...register("location", { required: true })}
          />
        </fieldset>

        {/* Focus Areas */}
        <fieldset className="border p-4 rounded-box mt-4">
          <label className="label font-medium">Focus Areas</label>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {PREDEFINED_FOCUS_AREAS.map((area) => (
              <label key={area} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={area}
                  {...register("focusAreas")}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span>{area}</span>
              </label>
            ))}
          </div>

          <input
            className="input input-bordered bg-transparent mt-3 w-full"
            placeholder="Other focus areas (comma separated)"
            {...register("customFocusArea")}
          />
        </fieldset>

        {/* Description */}
        <fieldset className="border p-4 rounded-box mt-4">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered bg-transparent w-full"
            {...register("description", { required: true, minLength: 20 })}
          />
        </fieldset>

        {/* Image */}
        <fieldset className="border p-4 rounded-box mt-4">
          <label className="label">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <input type="hidden" {...register("image", { required: true })} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full max-h-64 object-cover rounded-lg"
            />
          )}
        </fieldset>

        <button
          disabled={isSubmitting || imageUploading}
          className="btn btn-primary w-full mt-6"
        >
          {isSubmitting ? "Updating..." : "Update Group"}
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
