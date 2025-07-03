import React from 'react';

const PopularCategories = () => {

    return (
        <section className="my-12 px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 bg-base-200 rounded-xl text-center">
                    🎨 Drawing & Painting
                </div>
                <div className="p-6 bg-base-200 rounded-xl text-center">
                    📷 Photography
                </div>
                <div className="p-6 bg-base-200 rounded-xl text-center">
                    🎮 Video Gaming
                </div>
                <div className="p-6 bg-base-200 rounded-xl text-center">
                    📖 Reading
                </div>
            </div>
        </section>


    );
};

export default PopularCategories;