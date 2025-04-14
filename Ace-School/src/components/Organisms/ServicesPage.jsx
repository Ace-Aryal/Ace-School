import React from "react";
import { PiTargetBold } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { Button } from "../Atoms/button";
import { IoFastFoodOutline } from "react-icons/io5";
import { SlChemistry } from "react-icons/sl";

function ServicesPage() {
  return (
    <main className="mt-14 sm:pt-12 pt-6  mb-20 w-screen">
      <h1 className="text-5xl  text-center text-indigo-600 font-bold">
        Our Services.
      </h1>
      <section className="flex w-full justify-center">
        <div className="w-full sm:w-[80%] md:w-[60%] gap-2 sm:gap-y-14 grid grid-cols-1 sm:grid-cols-2 mt-4 sm:mt-16 mx-2  ">
          <div className="">
            <div className="flex items-center flex-wrap">
              <h2 className="text-3xl font-bold text-blue-500 ">
                Primary <span className="text-yellow-400 text-4xl"> &</span>{" "}
                Secondary Education
              </h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores, quaerat! Repudiandae tempore perferendis dolor maiores
              nulla labore, doloremque eos inventore veritatis vitae temporibus
              tenetur, odit ea vero. Velit, commodi rem!
            </p>
            <Button
              variant="filled"
              className="bg-yellow-400 hover:bg-amber-500 cursor-pointer"
            >
              Enroll Now
            </Button>
          </div>
          <div>
            <img
              className="rounded-full"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
          <div className="row-start-4 sm:row-start-2">
            <img
              className="rounded-3xl"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-red-500 mt-8 sm:mt-2">
              {" "}
              <span className="text-yellow-400 text-4xl">
                |
              </span> Transportation{" "}
            </h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A magni,
              modi ullam, laborum quaerat fugiat consectetur ad labore
              molestias, ea totam veritatis natus sequi tempora corporis
              repellendus nostrum amet accusamus!
            </p>
          </div>
          <div className=" mt-8 sm:mt-2">
            <div className="flex text-3xl items-center">
              <h2 className="text-3xl font-bold text-blue-500">Fooding </h2>
              <span className="text-yellow-400">
                <IoFastFoodOutline />
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores, quaerat! Repudiandae tempore perferendis dolor maiores
              nulla labore, doloremque eos inventore veritatis vitae temporibus
              tenetur, odit ea vero. Velit, commodi rem!
            </p>
          </div>
          <div>
            <img
              className="rounded-full"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
          <div className=" mt-8 sm:mt-2">
            <div className="flex text-3xl items-center">
              <h2 className="text-3xl font-bold text-blue-500"> Labs </h2>
              <span className="text-yellow-400">
                <SlChemistry />
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores, quaerat! Repudiandae tempore perferendis dolor maiores
              nulla labore, doloremque eos inventore veritatis vitae temporibus
              tenetur, odit ea vero. Velit, commodi rem!
            </p>
          </div>
          <div>
            <img
              className="rounded-xl"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
          <div className="row-start-10 sm:row-start-5">
            <img
              className="rounded-3xl"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-red-500 mt-8 sm:mt-2">
              {" "}
              <span className="text-yellow-400 text-4xl">|</span> Library{" "}
            </h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A magni,
              modi ullam, laborum quaerat fugiat consectetur ad labore
              molestias, ea totam veritatis natus sequi tempora corporis
              repellendus nostrum amet accusamus!
            </p>
          </div>
          <div className="row-start-12 sm:row-start-6">
            <img
              className="rounded-full"
              src="https://media.istockphoto.com/id/1409844960/vector/brain-light-bulb-two-white-collar-workers-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=OKA92FVYjv3YEBg5ut7g82SJGtWlJWNEwmWKAbBgs_Y="
              alt="Stock Image For About Us"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-red-500 mt-8 sm:mt-2">
              {" "}
              <span className="text-yellow-400 text-4xl">|</span> ECA's{" "}
            </h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A magni,
              modi ullam, laborum quaerat fugiat consectetur ad labore
              molestias, ea totam veritatis natus sequi tempora corporis
              repellendus nostrum amet accusamus!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
