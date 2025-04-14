import React from "react";
import { PiTargetBold } from "react-icons/pi";
function AboutPage() {
  return (
    <section className="flex w-full justify-center mb-20">
      <main className="w-full sm:w-[80%] md:w-[60%] gap-2 sm:gap-y-14 grid grid-cols-1 sm:grid-cols-2 mt-14 pt-20 mx-2  ">
        <div className="">
          <h2 className="text-3xl font-bold text-blue-500">
            Who Are We <span className="text-yellow-400">?</span>
          </h2>
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
            <span className="text-yellow-400 text-4xl">"</span> Our Story{" "}
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A magni,
            modi ullam, laborum quaerat fugiat consectetur ad labore molestias,
            ea totam veritatis natus sequi tempora corporis repellendus nostrum
            amet accusamus!
          </p>
        </div>
        <div className=" mt-8 sm:mt-2">
          <div className="flex text-3xl items-center">
            <h2 className="text-3xl font-bold text-blue-500">Our Mission </h2>
            <span className="text-yellow-400">
              <PiTargetBold />
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
      </main>
    </section>
  );
}

export default AboutPage;
