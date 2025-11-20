import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/Atoms/carousel";
import { Card, CardContent } from "../components/Atoms/card";
import Message from "../components/Molecules/Message";
import {
  SlideDownWrapper,
  SlideLeftWrapper,
  SlideRightWrapper,
} from "@/components/Templates/SlideInWrapper";
function HomePage() {
  const schoolImageArray = [
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb47dd0016548b2e1d/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb4860001c527c12b8/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb47000023591c1394/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb49650006e8f0c87e/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fcb22500190e15cf40/view?project=67f8cd5000374c4a813c&mode=admin",
  ];
  const alumniArray = [
    {
      name: "Dipesh Aryal",
      batch: "SEE 2079 Graduate (3.8 GPA)",
      image: "/alumini/dipesh.jpeg",
      mesage:
        "The dedicated faculty and rigorous academic environment at Shree Birendra Secondary School were the cornerstone of my achievement. My 3.8 GPA in SEE 2079 reflects the school's commitment to quality education and helping students in Nuwakot strive for academic excellence. This is where my future began.",
    },
    {
      name: "Karishma Dawadi",
      batch: "SEE 2081 Graduate",
      image: "/alumini/krishu.jpeg",
      mesage:
        "Graduating from SBSS was a milestone. The supportive, community-focused environment in Chainpur Charghare gave me the confidence and essential life skills I needed. The teachers weren't just instructors; they were mentors who genuinely cared about our holistic development beyond the textbooks.",
    },
    {
      name: "Sushant Aryal",
      batch: "SEE 2078 Graduate",
      image: "/alumini/sushant.jpeg",
      mesage:
        "Shree Birendra Secondary School shaped my character and instilled values that I carry to this day. The bonds formed here with my classmates and teachers are irreplaceable. I'm proud to be an alumnus and believe SBSS provides the strongest foundation for the youth of Nuwakot.",
    },
  ];
  const principalMessage =
    "As Principal, I am committed to nurturing a vibrant and stimulating learning environment where every student's potential is recognized and amplified. We prioritize academic rigor coupled with character development, ensuring our students are prepared not just for future challenges, but to thrive as responsible, ethical leaders in the Nuwakot community and beyond.";

  const chairmanMessage =
    "As Chairman of the School Management Committee, I oversee the strategic vision and infrastructure of SBSS. We are dedicated to strengthening our community bonds and securing the resources necessary to maintain high standards of governance, ensuring Shree Birendra Secondary School remains the pioneering institution of quality education in Chainpur Charghare.";

  return (
    <main className="flex  m-0 flex-col  justify-center items-center w-full mb-20   ">
      <div className="w-full flex flex-col items-center  justify-center relative">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{
            loop: true,
          }}
          className="w-full p-0 m-0 relative "
        >
          <CarouselContent className="p-0 m-0  outline-0 border-0 ring-0 statEntry">
            {schoolImageArray.map((image) => (
              <CarouselItem className="p-0 m-0" key={image}>
                <div className="p-0 ">
                  <Card className="p-0 border-0">
                    <CardContent className="flex max-h-[91vh]   items-center justify-center p-0 m-0 border-0">
                      <img
                        style={{ filter: "blur(0.2px)" }}
                        src={image}
                        alt="school image "
                        className="w-full  aspect-4/6 sm:aspect-video  p-0 m-0  object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute hidden z-10 sm:flex left-20 bg-blue-100 hover:bg-blue-200 text-blue-600"
            variant="secoondary"
            size="icon"
          />
          <CarouselNext
            className="hidden sm:flex z-10 absolute right-20 bg-blue-100 hover:bg-blue-200 text-blue-600 "
            variant="icon"
            size=""
          />
        </Carousel>
        <div
          className="h-full flex justify-center items-center   absolute bg-blue-500/20   
          w-full "
        >
          <h1 className=" text-4xl sm:text-5xl text-shadow-lg  py-4 text-zinc-100 font-bold text-center">
            {" "}
            Creating Curious Minds<span className="text-yellow-400">.</span>
          </h1>
        </div>{" "}
      </div>

      <SlideDownWrapper>
        <div
          id="intro"
          className="flex w-full justify-center p-4  rounded-md text-purple-700 my-3 sm:my-16"
        >
          <div className="flex flex-col mx-2 sm:w-full lg:w-[50vw] md:w-[70vw] slideIn">
            <h2 className="text-3xl text-red-500 font-semibold ">
              Birendra Secondary School{" "}
              <span className="text-yellow-400">|</span>
            </h2>
            <p className="text-justify">
              {" "}
              Located in Bidur-6, Nuwakot, Nepal, is a prominent educational
              institution offering quality education from Early Childhood
              Development (ECD) to Grade 10. Established in 1981 AD (2038 BS),
              the school is affiliated with the National Examination Board
              (NEB), ensuring its curriculum aligns with national educational
              standards. Renowned as one of the leading schools within Bidur
              Municipality, Birendra Secondary School is committed to fostering
              academic excellence and holistic development among its students.
            </p>
          </div>
        </div>
      </SlideDownWrapper>

      <h2 className="text-3xl text-blue-500 font-semibold text-center mt-16 mb-5">
        Meet Our Alumimi <span className="text-yellow-500 text-5xl">"</span>
      </h2>
      <div className="w-full  flex flex-col items-center  ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="max-w-[90vw] b"
        >
          <CarouselContent className="">
            {alumniArray.map((alumini) => (
              <CarouselItem key={alumini.mesage} className="">
                <div className=" flex justify-center ">
                  <Card className="my-4 bg-blue-100 border-0 shadow-lg">
                    <CardContent className="text-blue-600 flex flex-col lg:w-[40vw] sm:w-[80vw] my-2  min-w-[40vw]    items-center justify-center px-8 py-4 m-0 ">
                      <img
                        src={alumini.image}
                        alt="alumimi-image"
                        className="h-[150px] m-5 aspect-square rounded-full  object-cover"
                      />
                      <h3 className="font-semibold text-center text-xl">
                        {alumini.name}
                      </h3>
                      <h3 className="text-blue-800 font-md mb-1.5 text-center text-xs ">
                        {alumini.batch}
                      </h3>
                      <q className="text-justify">{alumini.mesage}</q>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <section
        id="message-from-principal"
        className="flex  px-2  flex-col justify-center w-full max-w-3xl mt-24 "
      >
        <h2 className="font-bold text-blue-500 monteserrat text-3xl mb-10 text-center">
          Executives Messages <span className="text-yellow-400">|</span>
        </h2>

        <SlideRightWrapper>
          {" "}
          <Message
            order="order-0"
            className="bg-red-100 text-red-600 p-3 rounded-lg shadow-lg"
            imageURL="/principal.jpeg"
            message={principalMessage}
            role={"Principal"}
          />
        </SlideRightWrapper>
        <SlideLeftWrapper>
          {" "}
          <Message
            className="sm:flex-row-reverse text-orange-600 bg-orange-100 p-3 px-5 rounded-lg shadow-lg "
            order="order-1"
            imageURL="/chairman.jpeg"
            role="Chairman"
            message={chairmanMessage}
          />
        </SlideLeftWrapper>
      </section>
    </main>
  );
}
export default HomePage;
