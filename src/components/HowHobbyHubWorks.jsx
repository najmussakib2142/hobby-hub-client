import { FaUsers, FaLightbulb, FaMapMarkedAlt } from "react-icons/fa";

const HowHobbyHubWorks = () => {
  const steps = [
    {
      icon: <FaUsers className="text-primary" />,
      title: "Find Your Community",
      desc: "Search for groups based on your interests. Whether you are a beginner or an expert, there is a space for you.",
      label: "Step 1"
    },
    {
      icon: <FaLightbulb className="text-primary" />,
      title: "Ask & Share",
      desc: "Don't get stuck alone. Post your questions, share your projects, and get helpful tips from people who love what you do.",
      label: "Step 2"
    },
    {
      icon: <FaMapMarkedAlt className="text-primary" />,
      title: "Join the Conversation",
      desc: "Talk with others through easy video links or meet up in person to work on your hobbies together.",
      label: "Step 3"
    },
  ];

  return (
    <section>
      {/* Container background and border updates */}
      <div className="bg-[#fcfcfd] dark:bg-slate-950 py-8 md:py-16 border-y border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-16 gap-6">
            <div className="max-w-xl">
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">
                Infrastructure for Enthusiasts
              </p>
              <h2 className="text-4xl md:text-5xl font-tight tracking-tight text-slate-900 dark:text-slate-50 font-bold">
                Built for serious hobbyists, <br className="hidden md:block" />
                powered by community.
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-sm">
              We provide the framework for knowledge transfer and peer-to-peer technical support.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200 dark:border-slate-800">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`pt-12 pb-8 md:pr-12 group transition-all duration-500 
                ${index !== 2 ? 'md:border-r border-gray-200 dark:border-slate-800' : ''} 
                ${index !== 0 ? 'md:pl-12' : ''}`}
              >
                {/* Step Tag */}
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 block group-hover:text-primary transition-colors">
                  {step.label}
                </span>

                {/* Icon Container */}
                <div className="w-12 h-12 mb-8 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 rounded-lg text-2xl group-hover:shadow-md group-hover:border-indigo-100 dark:group-hover:border-primary/30 transition-all">
                  {step.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base antialiased">
                  {step.desc}
                </p>

                {/* Subtle Progress Bar */}
                <div className="mt-8 h-[2px] w-8 bg-gray-200 dark:bg-slate-800 group-hover:w-full group-hover:bg-primary transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowHobbyHubWorks;