import React from "react";

export default function About() {
    return (
        <div className="w-full bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                    About <span className="text-blue-600">Hunger Pangs</span>
                </h1>
                <p className="text-gray-600 text-lg md:text-xl">
                    Bridging the gap between food surplus and food scarcity by ensuring
                    that no meal goes to waste.
                </p>
            </div>

            {/* Vision & Mission Section */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mb-20">
                {/* Vision */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Vision
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        To create a world where no one sleeps hungry, and every surplus meal
                        reaches someone who needs it. We aim to build a sustainable ecosystem
                        that connects communities, event organizers, and volunteers towards
                        reducing food wastage.
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Our mission is to leverage technology to streamline the collection,
                        verification, and distribution of leftover food from gatherings,
                        events, restaurants, and households — ensuring safe and timely delivery
                        to those in need.
                    </p>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
                    Our Core Values
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Compassion",
                            desc: "Every action we take is driven by empathy and care for the community.",
                        },
                        {
                            title: "Sustainability",
                            desc: "We focus on reducing environmental impact by preventing food waste.",
                        },
                        {
                            title: "Community",
                            desc: "We empower people to participate actively in helping those in need.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all"
                        >
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
