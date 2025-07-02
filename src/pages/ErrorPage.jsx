// import { Link } from "react-router-dom";
// import { Fade } from "react-awesome-reveal";
// import { MdErrorOutline } from "react-icons/md";

import { Fade } from "react-awesome-reveal";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 px-4 text-center">
      <Fade direction="down" triggerOnce>
        <div className="flex items-center gap-3 text-primary text-6xl   font-extrabold">
          <MdErrorOutline className="text-error  text-7xl" />
          404
        </div>
      </Fade>

      <Fade direction="up" delay={200} triggerOnce>
        <h1 className="text-3xl md:text-4xl font-bold mt-6">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-500 mt-4 max-w-xl">
          Sorry, the page you're looking for doesn't exist in
          <span className="font-semibold text-secondary"> HobbyHub</span>.
          Maybe it was removed, renamed, or you mistyped the URL.
        </p>
      </Fade>

      <Fade direction="up" delay={400} triggerOnce>
        <Link to="/" className="mt-8 btn btn-primary px-8">
          Go Back to Home
        </Link>
      </Fade>
    </div>
  );
};

export default ErrorPage;
