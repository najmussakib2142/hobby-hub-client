import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";

const Banner = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* LEFT SIDE: Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#101828] dark:text-gray-100 leading-tight">
                    Discover Your <span className="text-primary">Hobby Tribe</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mt-6 max-w-xl mx-auto lg:mx-0">
                    Join vibrant hobby groups, meet like-minded people, and fuel your passion. The community you've been looking for is just a click away.
                </p>
                <div className="mt-10">
                    <Link to={'/allGroups'}>
                        <button className="bg-primary hover:bg-transparent border-2 border-primary text-white hover:text-primary font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-none">
                            Browse Hobby Groups
                        </button>
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDE: The Image Carousel */}
            <div className="order-1 lg:order-2">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        showArrows={false}
                        interval={4000}
                        transitionTime={1000}
                        stopOnHover={true}
                    >
                        {[
                            "https://i.ibb.co/MkLJ0jjV/9632519-4190402.jpg",
                            "https://i.ibb.co/xtBw6w1q/2148419502.jpg",
                            "https://i.ibb.co/F44bhR2r/13741376-2011-i203-016-hobby-cartoon.jpg"
                        ].map((src, idx) => (
                            <div key={idx}>
                                <img
                                    src={src}
                                    alt={`Slide ${idx}`}
                                    // Use aspect-square or a specific ratio for a professional look
                                    className="w-full aspect-[4/3] object-cover"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>

        </section>
    );
};

export default Banner;