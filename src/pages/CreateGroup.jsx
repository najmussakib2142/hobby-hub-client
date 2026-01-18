import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthContext';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

const generateSlug = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const CreateGroup = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [imageUploading, setImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
        watch
    } = useForm({
        defaultValues: {
            isPhysicalMeetup: false,
            location: ""
        }
    });

    const focusAreas = watch("focusAreas") || [];
    const isPhysical = watch("isPhysicalMeetup");

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            Swal.fire('Error', 'Image must be under 2MB', 'error');
            return;
        }
        setImageUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append(
                'upload_preset',
                import.meta.env.VITE_CLOUDINARY_PRESET
            );

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD
                }/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await res.json();

            if (!data?.secure_url) {
                throw new Error('Upload failed');
            }

            // ✅ RHF value
            setValue('image', data.secure_url, { shouldValidate: true });

            // ✅ preview source
            setImagePreview(data.secure_url);

            // ✅ inject image URL into React Hook Form
            setValue('image', data.secure_url, { shouldValidate: true });

            // Swal.fire('Success', 'Image uploaded successfully', 'success');
        } catch (error) {
            Swal.fire('Error', 'Image upload failed', 'error');
        } finally {
            setImageUploading(false);
        }
    };


    const onSubmit = async (data) => {
        const finalCategory =
            data.category === 'other'
                ? data.customCategory
                : data.category;

        let finalFocusAreas = Array.isArray(data.focusAreas) ? [...data.focusAreas] : [];

        if (finalFocusAreas.includes("Other")) {
            // 1. Always remove the "Other" string from the array
            finalFocusAreas = finalFocusAreas.filter(area => area !== "Other");

            // 2. Only add custom areas if the input isn't empty
            if (data.customFocusArea) {
                const customTags = data.customFocusArea
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(tag => tag !== "");
                finalFocusAreas = [...finalFocusAreas, ...customTags];
            }
        }

        const newGroup = {
            name: data.name,
            slug: generateSlug(data.name),
            image: data.image,
            category: finalCategory,
            description: data.description,
            meetupType: data.isPhysicalMeetup ? 'Physical' : 'Online',
            location: data.location,
            focusAreas: finalFocusAreas,
            difficultyLevel: data.difficultyLevel,

            startDate: data.startDate,

            maxMembers: Number(data.maxMembers),    // from form
            membersCount: 1,                 // creator joined automatically

            createdBy: {
                name: user.displayName,
                email: user.email,
            },

            createdAt: new Date(),
        };


        try {
            const res = await fetch(
                'https://hobby-hub-server-psi-bay.vercel.app/groups',
                {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newGroup),
                }
            );

            const result = await res.json();

            if (result.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: `"${newGroup.name}" created successfully!`,
                    text: 'Redirecting to All Groups...',
                    timer: 2000,
                    showConfirmButton: false,
                });

                reset();
                navigate('/allGroups');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: 'Please try again later',
            });
        }
    };

    return (
        <div className="mb-10 max-w-5xl mx-auto py-8 md:py-16 px-6 md:px-12 mt-4 ">
            <Helmet>
                <title>HobbyHub || Create Group</title>
            </Helmet>

            <div className="text-center pb-8">
                <h2 className="text-4xl text-primary font-semibold mb-3">
                    Create Hobby Space
                </h2>
                <p className="text-gray-500 text-lg">
                    Start a focused community around a hobby
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Group Name */}
                <fieldset className="fieldset bg-transparent border border-gray-400 dark:border-gray-600 mb-4 p-4 rounded-box">
                    <label className="label">Group Name</label>
                    <input
                        className="input bg-transparent input-bordered w-full"
                        placeholder="e.g. Aquarium Problem Solvers"
                        {...register('name', { required: 'Group name is required' })}
                    />
                    {errors.name && (
                        <p className="text-error text-sm">{errors.name.message}</p>
                    )}
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">



                    {/* Category */}
                    <fieldset className="fieldset bg-transparent border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Hobby Category</label>
                        <select
                            className="select bg-transparent select-bordered w-full"
                            {...register('category', { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="aquarium">Aquarium & Fish Keeping</option>
                            <option value="photography">Photography</option>
                            <option value="mechanical-keyboards">Mechanical Keyboards</option>
                            <option value="home-coffee">Home Coffee Brewing</option>
                            <option value="fitness">Fitness</option>
                            <option value="other">Other</option>
                        </select>
                        {watch('category') === 'other' && (
                            <input
                                type="text"
                                className="input input-bordered bg-transparent mt-2"
                                placeholder="Specify your category"
                                {...register('customCategory', {
                                    required: 'Please specify your category',
                                    minLength: 3,
                                })}
                            />
                        )}

                    </fieldset>


                    {/* Start Date */}
                    <fieldset className="fieldset bg-transparent border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Start Date</label>
                        <input
                            type="date"
                            className="input bg-transparent input-bordered w-full"
                            {...register('startDate', { required: true })}
                        />
                    </fieldset>



                    {/* <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                        <label className="label">Meetup Type</label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                {...register('isPhysicalMeetup')}
                            />
                            <span>Physical meetup (uncheck = online only)</span>
                        </label>

                    </fieldset>

                    <fieldset className="fieldset bg-transparent border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Location</label>
                        <input
                            className="input bg-transparent input-bordered w-full"
                            placeholder="City / Online"
                            {...register('location', { required: true })}
                        />
                    </fieldset> */}




                    {/* Max Members */}
                    <fieldset className="fieldset bg-transparent border border-gray-400 dark:border-gray-600 p-4 rounded-box">
                        <label className="label">Max Members</label>
                        <input
                            type="number"
                            className="input bg-transparent input-bordered w-full"
                            {...register('maxMembers', {
                                required: true,
                                min: 2,
                                valueAsNumber: true
                            })}
                        />
                    </fieldset>



                    {/* Difficulty Level */}
                    <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                        <label className="label">Difficulty Level</label>

                        <select
                            className="select select-bordered bg-transparent w-full"
                            {...register('difficultyLevel', { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>Select difficulty</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </fieldset>




                </div>
                <div className="card  shadow-xl p-4 border border-gray-400 dark:border-gray-600  rounded-box mt-4">
                    <h2 className="text-lg font-bold mb-4">Event Logistics</h2>

                    <div className="flex flex-col gap-6">
                        {/* Toggle Section */}
                        <div className="flex items-center justify-between bg-gray-800/10 dark:bg-gray-100/10 p-4 rounded-lg">
                            <div>
                                <span className="font-medium block">Meetup Type</span>
                                <span className="text-xs text-gray-500">
                                    {isPhysical ? "Happening at a physical venue" : "Happening online via video call"}
                                </span>
                            </div>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary toggle-lg"
                                {...register('isPhysicalMeetup')}
                            />
                        </div>

                        {/* Dynamic Location Field */}
                        <div className="form-control  w-full">
                            <label className="label ">
                                <span className="label-text pb-1   font-semibold">
                                    {isPhysical ? " Venue Location" : "🔗 Meeting Link"}
                                </span>
                            </label>
                            <input
                                type="text"
                                className={`input input-bordered w-full bg-gray-800/10 dark:bg-gray-100/10 transition-all duration-300 ${isPhysical ? "border-blue-400/50" : "border-purple-400/50"
                                    }`}
                                placeholder={isPhysical ? "e.g. KIB Complex, Khamar Bari Rd, Dhaka 1215" : "e.g. https://zoom.us/j/..."}
                                {...register('location', {
                                    required: "This field is required",
                                    pattern: !isPhysical ? {
                                        value: /^(https?:\/\/)/,
                                        message: "Please enter a valid URL for online meetups"
                                    } : null
                                })}
                            />
                        </div>
                    </div>
                </div>

                <fieldset className="fieldset border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                    <label className="label font-medium">Focus Areas</label>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                            'Beginner Setup', 'Troubleshooting', 'Gear Reviews',
                            'Maintenance', 'DIY / Mods', 'Buying Guide'
                        ].map((area) => (
                            <label key={area} className="flex items-center gap-2 cursor-pointer hover:bg-base-100 p-1 rounded transition-colors">
                                <input
                                    type="checkbox"
                                    value={area}
                                    {...register('focusAreas', { required: 'Select at least one focus area' })}
                                    className="checkbox checkbox-primary checkbox-sm"
                                />
                                <span>{area}</span>
                            </label>
                        ))}

                        {/* The "Other" Logic */}
                        <label className="flex items-center gap-2 cursor-pointer p-1">
                            <input
                                type="checkbox"
                                value="Other"
                                {...register('focusAreas')}
                                className="checkbox checkbox-primary checkbox-sm"
                            />
                            <span className="italic text-gray-500">Something else?</span>
                        </label>
                    </div>

                    {/* Smart Input: Only appears if "Other" is checked */}
                    {focusAreas.includes("Other") && (
                        <div className="mt-3 animate-in fade-in slide-in-from-top-1">
                            <input
                                type="text"
                                placeholder="Type your custom focus area..."
                                className="input input-bordered bg-gray-800/10 dark:bg-gray-100/10 input-sm  w-full"
                                {...register('customFocusArea', { required: 'Please specify your focus' })}
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                                Tip: Separate multiple areas with commas (e.g. Vintage, Restoration)
                            </p>
                        </div>
                    )}

                    {errors.focusAreas && (
                        <p className="text-error text-xs mt-2">{errors.focusAreas.message}</p>
                    )}
                </fieldset>

                {/* Description */}
                <fieldset className="fieldset bg-transparent border border-gray-400 dark:border-gray-600 mt-4 p-4 rounded-box">
                    <label className="label">Description</label>
                    <textarea
                        className="textarea bg-transparent textarea-bordered w-full"
                        placeholder="What problems does this group focus on?"
                        {...register('description', {
                            required: true,
                            minLength: 20,
                        })}
                    />
                </fieldset>

                {/* Image */}
                <fieldset className="fieldset bg-transparent border border-gray-400 dark:border-gray-600 p-4 rounded-box mt-4">
                    <label className="label">Group Cover Image</label>

                    <label className="flex items-center justify-center w-full h-16 px-4 py-3 bg-transparent border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg cursor-pointer hover:border-black/40focus:ring-black/40  transition-colors duration-200 text-gray-900 dark:text-gray-300">
                        <span className="mr-2">📁</span>
                        <span className="text-sm">Click or drag to upload</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {/* <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered w-full"
                    /> */}

                    {/* hidden field for RHF */}
                    <input
                        type="hidden"
                        {...register('image', { required: 'Image is required' })}
                    />

                    {imageUploading && (
                        <p className="text-sm text-info mt-2">Uploading image...</p>
                    )}

                    {errors.image && (
                        <p className="text-error text-sm">{errors.image.message}</p>
                    )}


                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 mb-2">Image Preview</p>
                            <img
                                src={imagePreview}
                                alt="Group cover preview"
                                className="w-full max-h-64 object-cover rounded-lg border"
                            />
                        </div>
                    )}
                </fieldset>


                <button
                    disabled={isSubmitting || imageUploading}
                    className="btn btn-primary w-full mt-6"
                >
                    {imageUploading
                        ? 'Uploading Image...'
                        : isSubmitting
                            ? 'Creating...'
                            : 'Create Group'}
                </button>
            </form>
        </div>
    );
};

export default CreateGroup;
