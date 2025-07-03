import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthContext';
import { Helmet } from 'react-helmet-async';

const CreateGroup = () => {

    const { user } = useContext(AuthContext)
    console.log(user);

    const handleCreateGroup = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newGroup = Object.fromEntries(formData.entries());


        console.log(newGroup);

        // send Data to db
        fetch('http://localhost:3000/groups', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newGroup)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "Successfully create a new group",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    form.reset()
                }
            })

    }

    return (
        <div className='mb-10 px-10'>
            <Helmet>
                <title>HobbyHub || Create Group</title>
            </Helmet>
            <div className='text-center py-4 '>
                <p>*private route*</p>
                <h2 className='text-4xl font-semibold mb-3'>Create Group</h2>
                <p className='text-2xl font-semibold mb-5 text-gray-600'>create a new hobby group</p>
            </div>

            <form onSubmit={handleCreateGroup} >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* 1 */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Group Name</label>
                        <input type="text" required name='name' className="input select-primary w-full" placeholder="Group Name" />
                    </fieldset>
                    {/* 2 */}
                    {/* <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Hobby Category</label>
                        <select name="category" className="select select-primary w-full">
                            <option disabled selected>Select a hobby category</option>
                            <option>Drawing & Painting</option>
                            <option>Photography</option>
                            <option>Video Gaming</option>
                            <option>Fishing</option>
                            <option>Running</option>
                            <option>Cooking</option>
                            <option>Reading</option>
                            <option>Writing</option>
                        </select>
                    </fieldset> */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Hobby Category</label>
                        <select name="category" defaultValue="" className="select select-primary w-full">
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
                        <input type="text" required name="description" className="input w-full select-primary" placeholder="Group Description" />
                    </fieldset>

                    {/* Meeting Location */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Meeting Location</label>
                        <input type="text" required name="location" className="input w-full select-primary" placeholder="Meeting Place (City / Venue)" />
                    </fieldset>

                    {/* Max Members */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Max Members</label>
                        <input type="number" required name="maxMembers" className="input w-full select-primary" placeholder="Max Group Members" />
                    </fieldset>

                    {/* Start Date */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Start Date</label>
                        <input type="date" required name="startDate" className="input w-full select-primary" />
                    </fieldset>

                    {/* User Email (readonly) */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">User Email</label>
                        <input type="email" name="userEmail" value={user.email} className="input w-full select-primary" readOnly />
                        {/* <input type="email" name="userEmail" className="input w-full select-primary" value={user?.email} readOnly /> */}
                    </fieldset>


                    {/* User Name (readonly) */}
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">User Name</label>
                        <input type="text" required name="userName" value={user.displayName} readOnly className="input w-full select-primary" />
                    </fieldset>

                </div>
                {/* Image URL */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Image URL</label>
                    <input type="text" required name="image" className="input w-full select-primary" placeholder="Image URL (link)" />
                </fieldset>

                {/* Create Button */}
                <div className="text-center w-full mt-6">
                    <button type="submit" className="btn btn-primary w-full px-8">
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;