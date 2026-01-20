import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Faq = () => {
  const faqData = [
    {
      question: "What is HobbyHub?",
      answer: "HobbyHub is a social platform where people can discover, join, and create hobby-based groups, events, and communities.",
      defaultOpen: true,
    },
    {
      question: "How do I join a hobby group?",
      answer: "Browse the available hobby groups from the groups page, click on a group you're interested in, and hit the 'Join Group' button.",
    },
    {
      question: "Can I host events for my group?",
      answer: "Yes — once you're a group admin, you can create events, workshops, or meetups for your group members right from your group dashboard.",
    },
    {
      question: "Is it free to use HobbyHub?",
      answer: "Absolutely. Creating an account, joining groups, and attending public events are all free on HobbyHub.",
    },
  ];

  return (
    <section className=" dark:bg-slate-950 py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Professional Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">
            Common Questions
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Everything you need <br /> to know.
          </p>
        </div>

        {/* Professional Accordion Grid */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="group collapse collapse-plus bg-[#fcfcfd] dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl transition-all duration-300 hover:border-primary/50"
            >
              <input type="radio" name="faq-accordion" defaultChecked={item.defaultOpen} className="peer" /> 
              
              {/* Question: High Contrast & Interaction */}
              <div className="collapse-title text-lg font-bold text-slate-800 dark:text-slate-200 peer-checked:text-primary transition-colors pr-12">
                {item.question}
              </div>

              {/* Answer: Subtle & High Readability */}
              <div className="collapse-content px-6">
                <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base antialiased pb-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;