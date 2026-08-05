import React from 'react'
import HighlighText from "./HighlightText.jsx"
import knowYourProgress from "../../../assets/images/Know_your_progress.png"
import compareWithOthers from "../../../assets/images/Compare_with_others.png"
import planYourLesson from "../../../assets/images/Plan_your_lessons.png"
import CTAButton from "../../core/HomePage/Button.jsx"


function LearningLanguageSection() {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>
          <div className='text-4xl font-semibold text-center'>
            Your Swiss Knife for
            <HighlighText text={"learning any language"} />
          </div>
          <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
            progress tracking, custom schedule and more.
          </div>
          <div className='flex flex-row items-center justify-center mt-5'>
            <img src={knowYourProgress} alt="knowYourProgress" 
            className='object-contain -mr-32'
            />

            <img src={compareWithOthers} alt="compareWithOthers" 
            className='object-contain'
            />

            <img src={planYourLesson} alt="planYourLesson" 
            className='object-contain -ml-36'
            />

          </div>
          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              <div>
                learn more
              </div>
            </CTAButton>
          </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection