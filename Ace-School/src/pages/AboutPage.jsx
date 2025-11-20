import {
  SlideLeftWrapper,
  SlideRightWrapper,
} from "@/components/Templates/SlideInWrapper";
import React from "react";
import { PiTargetBold } from "react-icons/pi";
function AboutPage() {
  return (
    <section className="flex w-full justify-center mb-20">
      <main className="w-full sm:w-[80%] md:w-[60%] gap-2 sm:gap-y-14  flex flex-col  pt-20 mx-2  ">
        <SlideRightWrapper>
          {" "}
          <div className="flex flex-col gap-2 sm:flex-row w-full justify-between items-center ">
            <div className="sm:w-1/2">
              <h2 className="text-3xl font-bold text-blue-500">
                Who Are We <span className="text-yellow-400">?</span>
              </h2>
              <p>
                We are a dedicated secondary school committed to nurturing young
                learners from Class Nursery to Class 10. Our focus is on
                providing quality education, strong values, and a supportive
                environment where every student can discover their strengths and
                grow with confidence.
              </p>
            </div>{" "}
            <img
              className="rounded-full sm:w-1/2"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
        </SlideRightWrapper>
        <SlideLeftWrapper>
          <div className="flex flex-col gap-2 sm:flex-row-reverse w-full justify-between items-center ">
            <div className="sm:w-1/2">
              <h2 className="text-3xl font-bold text-red-500 mt-8 sm:mt-2">
                {" "}
                <span className="text-yellow-400 text-4xl">"</span> Our Story{" "}
              </h2>
              <p>
                Our school was founded with a simple vision: to create a place
                where children feel inspired to learn, explore, and dream. Over
                the years, we have grown into a close-knit community of
                students, teachers, and parents working together to shape a
                brighter future for every learner who walks through our doors.
              </p>
            </div>

            <img
              className="rounded-3xl sm:w-1/2"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>{" "}
        </SlideLeftWrapper>
        <SlideRightWrapper>
          <div className="flex flex-col sm:flex-row w-full justify-between items-center">
            {" "}
            <div className=" mt-8 sm:mt-2 sm:w-1/2">
              <div className="flex text-3xl items-center">
                <h2 className="text-3xl font-bold text-blue-500">
                  Our Mission{" "}
                </h2>
                <span className="text-yellow-400">
                  <PiTargetBold />
                </span>
              </div>
              <p>
                Our mission is to empower students with knowledge, discipline,
                and moral values that help them succeed in both academics and
                life. We aim to develop responsible individuals who think
                creatively, communicate effectively, and contribute positively
                to society.
              </p>
            </div>
            <img
              className="rounded-full sm:w-1/2"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
        </SlideRightWrapper>
      </main>
    </section>
  );
}

export default AboutPage;
