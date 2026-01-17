import { FaUsers, FaLightbulb, FaMapMarkedAlt } from "react-icons/fa";

const HowHobbyHubWorks = () => {
  return (
    <section className="bg-base-100/10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            How HobbyHub Works
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            HobbyHub helps people solve real hobby-related problems by learning,
            sharing, and connecting with the right community.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 rounded-xl border border-primary/30   text-center hover:shadow-md transition">
            <FaUsers className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Create or Join a Hobby Space
            </h3>
            <p className="text-gray-500 text-sm">
              Start a focused hobby group or join existing spaces built around
              specific interests and experience levels.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl border border-primary/30  text-center hover:shadow-md transition">
            <FaLightbulb className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Share Problems & Learn Together
            </h3>
            <p className="text-gray-500 text-sm">
              Ask questions, share discoveries, and get practical solutions from
              people who actually practice the hobby.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl border border-primary/30  text-center hover:shadow-md transition">
            <FaMapMarkedAlt className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Meet Online or In Person
            </h3>
            <p className="text-gray-500 text-sm">
              Join online discussions or attend local meetups based on your
              preference and availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowHobbyHubWorks;
