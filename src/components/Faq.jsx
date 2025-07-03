import React from 'react';

const Faq = () => {
    return (
        <div className="my-12 px-6 md:px-12 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Join Hobby Hub?</h2>

            <div className="space-y-4">
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div className="collapse-title font-semibold">
                        What is Hobby Hub?
                    </div>
                    <div className="collapse-content text-sm">
                        Hobby Hub is a social platform where people can discover, join, and create hobby-based groups, events, and communities.
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold">
                        How do I join a hobby group?
                    </div>
                    <div className="collapse-content text-sm">
                        Browse the available hobby groups from the groups page, click on a group you're interested in, and hit the "Join Group" button.
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold">
                        Can I host events for my group?
                    </div>
                    <div className="collapse-content text-sm">
                        Yes — once you're a group admin, you can create events, workshops, or meetups for your group members right from your group dashboard.
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold">
                        Is it free to use Hobby Hub?
                    </div>
                    <div className="collapse-content text-sm">
                        Absolutely. Creating an account, joining groups, and attending public events are all free on Hobby Hub.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;