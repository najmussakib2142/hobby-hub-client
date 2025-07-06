import React from 'react';
import { Typewriter } from 'react-simple-typewriter'

const PopularCategories = () => {
    return (
        <section className="my-12 px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="p-6 bg-base-200 dark:bg-gray-700 rounded-xl text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100 dark:hover:bg-gray-600 hover:shadow-lg">
                    🎨 Drawing & Painting
                </div>

                {/* Card 2 */}
                <div className="p-6 bg-base-200 dark:bg-gray-700 rounded-xl text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100 dark:hover:bg-gray-600 hover:shadow-lg">
                    📷 Photography
                </div>

                {/* Card 3 */}
                <div className="p-6 bg-base-200 dark:bg-gray-700 rounded-xl text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100 dark:hover:bg-gray-600 hover:shadow-lg">
                    🎮 Video Gaming
                </div>

                {/* Card 4 */}
                <div className="p-6 bg-base-200 dark:bg-gray-700 rounded-xl text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100 dark:hover:bg-gray-600 hover:shadow-lg">
                    📖 Reading
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
