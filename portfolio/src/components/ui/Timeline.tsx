import React from "react";

const timelineData = [
  {
    year: "2023 - Present",
    title: "Senior Software Engineer",
    company: "Tech Giant Inc.",
    details:
      "Leading the development of a scalable cloud-native application, mentoring junior engineers, and driving architectural decisions.",
  },
  {
    year: "2021 - 2023",
    title: "Mid-Level Developer",
    company: "Creative Agency",
    details:
      "Built and maintained full-stack web applications for various clients, focusing on performance and user experience.",
  },
  {
    year: "2020 - 2021",
    title: "Junior Developer",
    company: "E-commerce Startup",
    details:
      "Contributed to the development of a fast-growing e-commerce platform, working on both frontend and backend features.",
  },
];

const TimelineItem = ({
  data,
  isLast,
}: {
  data: (typeof timelineData)[0];
  isLast: boolean;
}) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-6">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500"></div>
      {!isLast && (
        <div className="w-px h-full bg-gray-300 dark:bg-gray-600 my-2"></div>
      )}
    </div>
    <div className="pb-8">
      <p className="text-sm text-blue-500 dark:text-blue-400 mb-1">
        {data.year}
      </p>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {data.title}
      </h3>
      <p className="text-md text-gray-600 dark:text-gray-300 mb-2">
        {data.company}
      </p>
      <p className="text-gray-700 dark:text-gray-200">{data.details}</p>
    </div>
  </div>
);

const Timeline = () => {
  return (
    <div>
      {timelineData.map((item, i) => (
        <TimelineItem
          data={item}
          key={i}
          isLast={i === timelineData.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
