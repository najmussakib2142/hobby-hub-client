import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
    return (
        <div className="my-4 max-w-[1440px] mx-auto">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                interval={3000}
                transitionTime={800}
            >
                <div>
                    <img
                        src="https://i.ibb.co/MwG52Pk/13186263-5136847.jpg"
                        alt="Banner 1"
                        className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                    />
                    <p className="legend">Find your perfect hobby group!</p>
                </div>
                <div>
                    <img
                        src="https://i.ibb.co/xtBw6w1q/2148419502.jpg"
                        alt="Banner 2"
                        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                    />
                    <p className="legend">Meet like-minded people locally</p>
                </div>
                <div>
                    <img
                        src="https://i.ibb.co/F44bhR2r/13741376-2011-i203-016-hobby-cartoon.jpg"
                        alt="Banner 3"
                        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                    />
                    <p className="legend">Create and manage your own group</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
