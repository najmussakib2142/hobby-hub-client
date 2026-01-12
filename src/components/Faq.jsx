import React from "react";

const Faq = () => {
  // 1. Define your questions and answers here
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
    <div className="my-12 px-6 md:px-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Why Join HobbyHub?</h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            <input type="radio" name="faq-accordion" defaultChecked={item.defaultOpen} />
            <div className="collapse-title text-lg font-semibold focus:outline-none">
              {item.question}
            </div>
            <div className="collapse-content text-base-content/80 px-4 pb-4">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;