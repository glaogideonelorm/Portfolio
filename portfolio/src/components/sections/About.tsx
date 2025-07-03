import React from "react";
import Timeline from "../ui/Timeline";

const About = () => {
  return (
    <section id="about" className="relative z-20 py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Photo and Tech Stack */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">My Tech Stack</h3>
              <div className="text-center">
                {/* Placeholder for Tech Stack Carousel */}
                <p className="text-white">Tech Stack Carousel coming soon...</p>
              </div>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Photo</h3>
              <div className="text-center">
                {/* Placeholder for Personal Photo */}
                <img
                  src="https://via.placeholder.com/300"
                  alt="Gideon Glago"
                  className="rounded-lg mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio and Timeline */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Bio</h3>
              <p>
                I&apos;m a passionate Software Developer with a knack for
                creating elegant solutions in the least amount of time. I have
                experience with a variety of technologies, including React,
                Next.js, and Node.js. I&apos;m always looking for new challenges
                and opportunities to grow my skills.
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Career Timeline</h3>
              <Timeline />
            </div>
            <div className="p-6 mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              {/* Placeholder for Skill Radar Chart */}
              <p>Skill Radar Chart coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
