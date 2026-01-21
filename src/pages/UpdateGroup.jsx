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

const UpdateGroup = () => {
    const group = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [imageUploading, setImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(group.image);
    const PREDEFINED_FOCUS_AREAS = [
        "Beginner Setup",
        "Troubleshooting",
        "Gear Reviews",
        "Maintenance",
        "DIY / Mods",
        "Buying Guide",
    ];

    const dbFocusAreas = group.focusAreas || [];

    const predefinedSelected = dbFocusAreas.filter(area =>
        PREDEFINED_FOCUS_AREAS.includes(area)
    );

    const customSelected = dbFocusAreas.filter(area =>
        !PREDEFINED_FOCUS_AREAS.includes(area)
    );
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

            // 🔑 FIX HERE
            focusAreas:
                customSelected.length > 0
                    ? [...predefinedSelected, "Other"]
                    : predefinedSelected,

            customFocusArea: customSelected.join(", "),
        },
    });

    const isPhysical = watch("isPhysicalMeetup");
    const focusAreas = watch("focusAreas") || [];

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
        const finalCategory =
            data.category === "other" && data.customCategory
                ? data.customCategory
                : data.category;

        let finalFocusAreas = Array.isArray(data.focusAreas)
            ? [...data.focusAreas]
            : [];

        if (finalFocusAreas.includes("Other")) {
            finalFocusAreas = finalFocusAreas.filter(a => a !== "Other");

            if (data.customFocusArea) {
                const custom = data.customFocusArea
                    .split(",")
                    .map(a => a.trim())
                    .filter(Boolean);

                finalFocusAreas.push(...custom);
            }
        }


        const updatedGroup = {
            ...group,
            name: data.name,
            slug: generateSlug(data.name),
            category: finalCategory,
            description: data.description,
            meetupType: data.isPhysicalMeetup ? "Physical" : "Online",
            location: data.location,
            focusAreas: finalFocusAreas,
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
                <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box mb-4">
                    <label className="label">Group Name</label>
                    <input
                        className="input input-bordered bg-transparent w-full"
                        {...register("name", { required: "Group name is required" })}
                    />
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category */}
                    <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Hobby Category</label>
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
                                placeholder="Specify your category"
                                {...register("customCategory")}
                            />
                        )}
                    </fieldset>

                    {/* Difficulty */}
                    <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Difficulty Level</label>
                        <select
                            className="select select-bordered bg-transparent w-full"
                            {...register("difficultyLevel", { required: true })}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </fieldset>

                    {/* Start Date */}
                    <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Start Date</label>
                        <input
                            type="date"
                            className="input input-bordered bg-transparent w-full"
                            {...register("startDate", { required: true })}
                        />
                    </fieldset>

                    {/* Max Members */}
                    <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Max Members</label>
                        <input
                            type="number"
                            className="input input-bordered bg-transparent w-full"
                            {...register("maxMembers", {
                                required: true,
                                min: 2,
                                valueAsNumber: true,
                            })}
                        />
                    </fieldset>
                </div>

                {/* Meetup Type */}
                <div className="border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                    <h3 className="font-semibold mb-4">Event Logistics</h3>

                    <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Meetup Type</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            {...register("isPhysicalMeetup")}
                        />
                    </div>

                    <input
                        type="text"
                        className="input input-bordered bg-transparent w-full"
                        placeholder={
                            isPhysical
                                ? "Physical location address"
                                : "Online meeting link"
                        }
                        {...register("location", {
                            required: "This field is required",
                            pattern: !isPhysical
                                ? {
                                    value: /^(https?:\/\/)/,
                                    message: "Please enter a valid URL",
                                }
                                : undefined,
                        })} />
                </div>

                {/* Focus Areas */}
                <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                    <label className="label font-medium">Focus Areas</label>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                            "Beginner Setup",
                            "Troubleshooting",
                            "Gear Reviews",
                            "Maintenance",
                            "DIY / Mods",
                            "Buying Guide",
                        ].map((area) => (
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

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value="Other"
                                {...register("focusAreas")}
                                className="checkbox checkbox-primary checkbox-sm"
                            />
                            <span className="italic text-gray-500">Other</span>
                        </label>
                    </div>

                    {focusAreas.includes("Other") && (
                        <input
                            className="input input-bordered bg-transparent mt-3 w-full"
                            placeholder="Custom focus areas (comma separated)"
                            {...register("customFocusArea")}
                        />
                    )}
                </fieldset>

                {/* Description */}
                <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                    <label className="label">Description</label>
                    <textarea
                        className="textarea textarea-bordered bg-transparent w-full"
                        {...register("description", { required: true, minLength: 20 })}
                    />
                </fieldset>

                {/* Image Upload */}
                <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                    <label className="label">Group Cover Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

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
