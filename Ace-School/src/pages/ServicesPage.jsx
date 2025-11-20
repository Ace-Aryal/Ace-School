import React from "react";
import { PiTargetBold } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { Button } from "../components/Atoms/button";
import { IoFastFoodOutline } from "react-icons/io5";
import { SlChemistry } from "react-icons/sl";
import SlideInWrapper from "@/components/Templates/SlideInWrapper";

function ServicesPage() {
  return (
    <main className=" sm:pt-12 pt-6  mb-20 w-full">
      <h1 className="text-5xl  text-center text-indigo-600 font-bold">
        Our Services.
      </h1>
      <section className="flex w-full justify-center">
        <div className="w-full sm:w-[80%] md:w-[60%] gap-2 sm:gap-y-14 flex flex-col mt-4 sm:mt-16 mx-2  ">
          <SlideInWrapper>
            <div className="flex flex-col gap-2 sm:flex-row w-full justify-between items-center ">
              {" "}
              <div className="sm:w-1/2">
                <div className=" flex items-center flex-wrap">
                  <h2 className="text-3xl font-bold text-blue-500 ">
                    Primary <span className="text-yellow-400 text-4xl"> &</span>{" "}
                    Secondary Education
                  </h2>
                </div>
                <p>
                  We provide well-structured primary and secondary education
                  designed to build strong academic foundations and essential
                  life skills. Our experienced teachers ensure that every
                  student receives individual attention, proper guidance, and a
                  supportive learning environment.
                </p>
                <Button
                  variant="filled"
                  className="bg-orange-200 hover:bg-red-200 text-orange-600 cursor-pointer"
                >
                  Enroll Now
                </Button>
              </div>
              <img
                className="rounded-full sm:w-1/2 "
                src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
                alt="Stock Image For About Us"
              />
            </div>
          </SlideInWrapper>
          <SlideInWrapper>
            <div className="flex flex-col gap-2 sm:flex-row-reverse w-full justify-between items-center ">
              <div className="sm:w-1/2">
                <h2 className="text-3xl font-bold text-red-500 mt-8 sm:mt-2">
                  {" "}
                  <span className="text-yellow-400 text-4xl">|</span>{" "}
                  Transportation{" "}
                </h2>
                <p>
                  Our school offers safe and reliable transportation services
                  across major routes. Each vehicle is supervised by trained
                  staff, ensuring that students travel comfortably and securely
                  to and from school every day.
                </p>
              </div>
              <img
                className="rounded-3xl sm:w-1/2"
                src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
                alt="Stock Image For About Us"
              />
            </div>
          </SlideInWrapper>
          <SlideInWrapper>
            <div className="flex flex-col gap-2 sm:flex-row-reverse w-full justify-between items-center ">
              <div className="sm:w-1/2 mt-8 sm:mt-2">
                <div className="flex text-3xl items-center">
                  <h2 className="text-3xl font-bold text-blue-500">Fooding </h2>
                  <span className="text-yellow-400">
                    <IoFastFoodOutline />
                  </span>
                </div>
                <p>
                  We provide clean and nutritious meals prepared with care to
                  support students' overall health and energy throughout the
                  school day. Our fooding services follow hygiene standards and
                  offer balanced meal options suitable for growing children and
                  is completely funded for free upto grade 6.
                </p>
              </div>{" "}
              <img
                className="rounded-full sm:w-1/2"
                src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
                alt="Stock Image For About Us"
              />
            </div>
          </SlideInWrapper>
          <SlideInWrapper>
            {" "}
            <div className="flex flex-col gap-2 sm:flex-row w-full justify-between items-center ">
              <div className=" mt-8 sm:mt-2 sm:w-1/2">
                <div className="flex text-3xl items-center">
                  <h2 className="text-3xl font-bold text-blue-500"> Labs </h2>
                  <span className="text-yellow-400">
                    <SlChemistry />
                  </span>
                </div>
                <p>
                  Our well-equipped science and computer labs give students
                  hands-on learning experiences. Through practical experiments
                  and guided exploration, students develop curiosity,
                  problem-solving abilities, and confidence in applying what
                  they learn in class.
                </p>
              </div>

              <img
                className="rounded-xl sm:w-1/2"
                src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
                alt="Stock Image For About Us"
              />
            </div>
          </SlideInWrapper>
          <SlideInWrapper>
            <div className="flex flex-col gap-2 sm:flex-row w-full justify-between items-center ">
              {" "}
              <div className="sm:w-1/2">
                <h2 className="text-3xl font-bold text-red-500 mt-8 sm:mt-2">
                  {" "}
                  <span className="text-yellow-400 text-4xl">
                    |
                  </span> Library{" "}
                </h2>
                <p>
                  Our library offers a wide collection of books, reference
                  materials, and learning resources that support both academic
                  learning and personal growth. Students are encouraged to read,
                  research, and develop strong study habits in a peaceful
                  environment.
                </p>
              </div>
              <img
                className="rounded-3xl sm:w-1/2 "
                src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
                alt="Stock Image For About Us"
              />
            </div>
          </SlideInWrapper>
          <SlideInWrapper>
            {" "}
            <div className="flex flex-col gap-2 sm:flex-row w-full justify-between items-center ">
              <div className="sm:w-1/2">
                <h2 className="text-3xl font-bold text-red-500 mt-8 sm:mt-2">
                  {" "}
                  <span className="text-yellow-400 text-4xl">|</span> ECA's{" "}
                </h2>
                <p>
                  We provide a variety of extracurricular activities that help
                  students discover their talents beyond the classroom. Sports,
                  arts, music, drama, and skill-based clubs encourage
                  creativity, teamwork, leadership, and overall personality
                  development.
                </p>
              </div>
              <img
                className="rounded-full sm:w-1/2"
                src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
                alt="Stock Image For About Us"
              />
            </div>
          </SlideInWrapper>
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
