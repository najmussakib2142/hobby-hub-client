import React from "react";

const Faq = () => {
    return (
        <div className="my-12 px-6 md:px-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Join HobbyHub?</h2>

            <div className="space-y-4">
                <div className="collapse hover:scale-105 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    >
                        What is HobbyHub?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        HobbyHub is a social platform where people can discover, join, and create hobby-based groups, events, and communities.
                    </div>
                </div>

                <div className="collapse hover:scale-105 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    >
                        How do I join a hobby group?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        Browse the available hobby groups from the groups page, click on a group you're interested in, and hit the "Join Group" button.
                    </div>
                </div>

                <div className="collapse hover:scale-105 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    >
                        Can I host events for my group?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        Yes — once you're a group admin, you can create events, workshops, or meetups for your group members right from your group dashboard.
                    </div>
                </div>

                <div className="collapse hover:scale-105 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    >
                        Is it free to use HobbyHub?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        Absolutely. Creating an account, joining groups, and attending public events are all free on HobbyHub.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
