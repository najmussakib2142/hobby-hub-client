import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion
import animationData from "../../public/faq.json";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqData = [
    {
      question: "What exactly is HobbyHub?",
      answer: "HobbyHub is the ultimate social ecosystem for enthusiasts. We bridge the gap between digital discovery and real-world connection, allowing you to find, join, and scale communities built around what you love.",
    },
    {
      question: "How do I get started with a group?",
      answer: "It’s seamless. Explore our curated categories, find a community that resonates with you, and hit 'Join.' You’ll get instant access to group discussions and exclusive events.",
    },
    {
      question: "Can I host my own workshops?",
      answer: "Absolutely. We empower creators. Once you lead a group, you unlock a professional suite of tools to host meetups, manage RSVPs, and grow your community.",
    },
    {
      question: "Is my data and privacy secure?",
      answer: "Your trust is our priority. HobbyHub uses industry-standard encryption to ensure your interactions and personal data remain private and secure.",
    },
  ];

  const recolorLottie = (animation, color) => {
    const [r, g, b] = color;
    if (!animation) return null;
    const newAnimation = JSON.parse(JSON.stringify(animation)); // Deep clone to avoid mutating source
    newAnimation.layers?.forEach(layer => {
      layer.shapes?.forEach(shape => {
        if (shape.it) {
          shape.it.forEach(item => {
            if (item.c?.k) {
              item.c.k = [r, g, b, 1];
            }
          });
        }
      });
    });
    return newAnimation;
  };

  const blueColor = [0.121, 0.102, 0.439]; // #1F1A70

  return (
    <section className="bg-white dark:bg-slate-950 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Side: Visual Element */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative z-10 flex justify-center">
                <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-200 dark:border-slate-800">
                  <Lottie animationData={recolorLottie(animationData, blueColor)} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: FAQ Text */}
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                Common Questions
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Everything you need to know about getting started on the platform.
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((item, index) => {
                const isOpen = activeIndex === index;
                
                return (
                  <div
                    key={index}
                    className="border-b border-slate-200 dark:border-slate-800"
                  >
                    <button
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                    >
                      <span className={`text-lg font-semibold transition-colors ${isOpen ? "text-primary" : "text-slate-800 dark:text-slate-200 group-hover:text-primary"}`}>
                        {item.question}
                      </span>
                      {/* Animated Chevron */}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={isOpen ? "text-primary" : "text-slate-400"}
                      >
                        <FaChevronDown />
                      </motion.div>
                    </button>

                    {/* Framer Motion Accordion */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="pb-5">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;