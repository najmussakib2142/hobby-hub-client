import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";

const Banner = () => {
    return (
        <section className="max-w-7xl mx-auto">
            {/* Image Carousel */}
            <div className="overflow-hidden">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showArrows={false}
                    interval={4000}
                    transitionTime={1000}
                    emulateTouch
                    stopOnHover={false}
                    swipeable={false}
                >
                    <div>
                        <img
                            src="https://i.ibb.co/MkLJ0jjV/9632519-4190402.jpg"
                            alt="Slide 1"
                            className="w-full h-[450px] md:h-[550px] object-cover"
                        />
                    </div>
                    <div>
                        <img
                            src="https://i.ibb.co/xtBw6w1q/2148419502.jpg"
                            alt="Slide 2"
                            className="w-full h-[450px] md:h-[550px] object-cover"
                        />
                    </div>
                    <div>
                        <img
                            src="https://i.ibb.co/F44bhR2r/13741376-2011-i203-016-hobby-cartoon.jpg"
                            alt="Slide 3"
                            className="w-full h-[450px] md:h-[550px] object-cover"
                        />
                    </div>
                </Carousel>
            </div>
            {/* <div className="border-t border-gray-200"></div> */}
            {/* Hero Text Section */}
            {/* <div className="border-t border-gray-600"></div> */}
            <div className="text-center py-14 px-6">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                    Discover Your Hobby Tribe
                </h1>
                <p className="text-gray-600 text-lg md:text-2xl mt-4 max-w-3xl mx-auto">
                    Join vibrant hobby groups, meet like-minded people, and fuel your passion.
                </p>
                <Link to={'/allGroups'}>
                    <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                        Browse Hobby Groups
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Banner;
