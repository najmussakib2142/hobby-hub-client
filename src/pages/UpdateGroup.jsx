// import React, { useState } from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router';

const UpdateGroup = () => {

    const [hobbyCategory, setCategory] = useState("");

    const { _id,
        name,
        category,
        image,
        description,
        startDate,
        maxMembers,
        userName,
        userEmail,
        location, } = useLoaderData()

    const handleUpdateGroup = e => {
        e.preventDefault();
    }
    return (
        <div className='mb-10 px-10'>
            <div className='text-center py-4 '>
                <p>*private route*</p>
                <h2 className='text-4xl font-semibold mb-3'>Update Group</h2>
                <p className='text-2xl font-semibold mb-5 text-gray-600'>Update your hobby group</p>
            </div>

            <form onSubmit={handleUpdateGroup} >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* 1 */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Group Name</label>
                        <input type="text" name='name' defaultValue={name} className="input select-primary w-full" placeholder="Group Name" />
                    </fieldset>
                    {/* 2 */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Hobby Category</label>
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select select-primary w-full"
                        >
                            <option value="" disabled>Select a hobby category</option>
                            <option value="Drawing & Painting">Drawing & Painting</option>
                            <option value="Photography">Photography</option>
                            <option value="Video Gaming">Video Gaming</option>
                            <option value="Fishing">Fishing</option>
                            <option value="Running">Running</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Reading">Reading</option>
                            <option value="Writing">Writing</option>
                        </select>
                    </fieldset>

                    {/* Description */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Description</label>
                        <input type="text" name="description" defaultValue={description} className="input w-full select-primary" placeholder="Group Description" />
                    </fieldset>

                    {/* Meeting Location */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Meeting Location</label>
                        <input type="text" name="location" defaultValue={location} className="input w-full select-primary" placeholder="Meeting Place (City / Venue)" />
                    </fieldset>

                    {/* Max Members */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Max Members</label>
                        <input type="number" name="maxMembers" defaultValue={maxMembers} className="input w-full select-primary" placeholder="Max Group Members" />
                    </fieldset>

                    {/* Start Date */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Start Date</label>
                        <input type="date" name="startDate" defaultValue={startDate} className="input w-full select-primary" />
                    </fieldset>

                    {/* User Email (readonly) */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">User Email</label>
                        <input type="email" name="userEmail" defaultValue={userEmail} className="input w-full select-primary" />
                        {/* <input type="email" name="userEmail" className="input w-full select-primary" value={user?.email} readOnly /> */}
                    </fieldset>


                    {/* User Name (readonly) */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">User Name</label>
                        <input type="text" name="userName" defaultValue={userName} className="input w-full select-primary" />
                    </fieldset>

                </div>
                {/* Image URL */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Image URL</label>
                    <input type="text" name="image" defaultValue={image} className="input w-full select-primary" placeholder="Image URL (link)" />
                </fieldset>

                {/* Create Button */}
                <div className="text-center w-full mt-6">
                    <button type="submit" className="btn btn-primary w-full px-8">
                        Update Group
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateGroup;