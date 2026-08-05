import React from "react";
import { useState } from "react";
import CourseCard from "./CourseCard";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0]?.courses || []);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0]?.heading || " "
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    if (result) {
      setCourses(result[0].courses);
      setCurrentCard(result[0].courses[0].heading);
    }
  };

  return (
    <div className="mb-[3rem]"
    >
      <div>
        <div className="text-4xl font-semibold text-center mt-10 lg:mb-10">
          Unlock the
          <div className="block lg:hidden h-[1px]"></div>
          <HighlightText text={"Power of Code"} />
          <div className="hidden sm:block h-[3px]"></div>
          <p className="text-center text-richblack-300 text-base mt-3">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      <div
        className="hidden lg:flex lg:gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 
      rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]"
      >
        {tabsName.map((element, index) => (
          <div
            className={`text-base flex flex-row  items-center gap-2
          ${
            currentTab === element
              ? "bg-richblack-900 text-richblack-5 font-medium"
              : "text-richblack-200 "
          }
          rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
          `}
            key={index}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        ))}
      </div>

      <div className="block h-[3rem] lg:h-[12rem]"></div>

      <div
        className="lg:absolute gap-10 justify-center lg:gap-0 
      flex lg:justify-between flex-wrap w-full lg:bottom-[-16rem] lg:left-[50%]
       lg:translate-x-[-50%] lg:translate-y-[-50%] text-black lg:mb-0 mb-20 lg:px-0 px-3"
      >
        {/* Course card ka group*/}
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default ExploreMore;