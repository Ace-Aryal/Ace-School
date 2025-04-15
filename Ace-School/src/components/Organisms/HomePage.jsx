import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../Atoms/carousel";
import { Card, CardContent } from "../Atoms/card";
import Message from "../Molecules/message";
function HomePage() {
  const schoolImageArray = [
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb47dd0016548b2e1d/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb4860001c527c12b8/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb47000023591c1394/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fb49650006e8f0c87e/view?project=67f8cd5000374c4a813c&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/67f916fc0027eb47b7f6/files/67fcb22500190e15cf40/view?project=67f8cd5000374c4a813c&mode=admin",
  ];
  const aluminiIArray = [
    {
      name: "Dipesh Aryal",
      batch: "SEE 2079 Graduate (3.8 GPA)",
      image: "https://aryaldipesh.com.np/assets/aboutPhoto.png",
      mesage:
        "​As proud alumni of SBSS, we celebrate the achievements of our alma mater and the enduring bonds we've formed. Our experiences here have shaped us into lifelong learners and community leaders. We remain committed to supporting and uplifting the next generation of students, ensuring that the legacy of excellence continues",
    },
    {
      name: "Dipesh Aryal",
      batch: "SEE 2079 Graduate",

      image: "https://aryaldipesh.com.np/assets/aboutPhoto.png",
      mesage:
        "​As proud alumni of [School Name], we celebrate the achievements of our alma mater and the enduring bonds we've formed. Our experiences here have shaped us into lifelong learners and community leaders. We remain committed to supporting and uplifting the next generation of students, ensuring that the legacy of excellence continues",
    },
    {
      name: "Dipesh Aryal",
      batch: "SEE 2079 Graduate",

      image: "https://aryaldipesh.com.np/assets/aboutPhoto.png",
      mesage:
        "​As proud alumni of BSS, we celebrate the achievements of our alma mater and the enduring bonds we've formed. Our experiences here have shaped us into lifelong learners and community leaders. We remain committed to supporting and uplifting the next generation of students, ensuring that the legacy of excellence continues",
    },
  ];
  return (
    <main className="flex  m-0 flex-col  justify-center items-center max-w-[100vw] mb-20   ">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-[99vw] p-0 m-0 relative"
      >
        <CarouselContent className="p-0 m-0">
          {schoolImageArray.map((image) => (
            <CarouselItem className="p-0 m-0" key={image}>
              <div className="p-0 ">
                <Card className="p-0">
                  <CardContent className="flex max-h-[90vh]  items-center justify-center p-0 m-0 border-0">
                    <img
                      src={image}
                      alt="school image "
                      className="w-screen aspect-video  p-0 m-0  object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute hidden sm:flex left-20 text-white"
          variant="secoondary"
          size="icon"
        />
        <CarouselNext
          className="hidden sm:flex  absolute right-20 text-white  "
          variant="icon"
          size=""
        />
      </Carousel>

      <h1 className=" text-5xl py-4 text-indigo-500 font-bold text-center">
        Creating Curious Minds <span className="text-yellow-400">.</span>
      </h1>
      <div id="intro" className="flex w-full justify-center my-16">
        <div className="flex flex-col mx-2 sm:w-full lg:w-[50vw] md:w-[70vw]">
          <h2 className="text-3xl text-red-500 font-semibold ">
            Birendra Secondary School <span className="text-yellow-400">|</span>
          </h2>
          <p className="text-justify">
            {" "}
            located in Bidur-6, Nuwakot, Nepal, is a prominent educational
            institution offering quality education from Early Childhood
            Development (ECD) to Grade 10. Established in 1981 AD (2038 BS), the
            school is affiliated with the National Examination Board (NEB),
            ensuring its curriculum aligns with national educational standards.
            Renowned as one of the leading schools within Bidur Municipality,
            Birendra Secondary School is committed to fostering academic
            excellence and holistic development among its students.
          </p>
        </div>
      </div>
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
          className="max-w-[90vw] "
        >
          <CarouselContent className="">
            {aluminiIArray.map((alumini) => (
              <CarouselItem key={alumini.mesage} className="outline-0">
                <div className=" flex justify-center ">
                  <Card className="p-0 bg-blue-100">
                    <CardContent className="flex flex-col lg:w-[40vw] sm:w-[80vw]  min-w-[40vw]    items-center justify-center px-8 py-4 m-0 ">
                      <img
                        src={alumini.image}
                        alt="alumimi-image"
                        className="h-[150px] m-5 rounded-full  object-cover"
                      />
                      <h3 className="font-semibold text-center text-xl">
                        {alumini.name}
                      </h3>
                      <h3 className="text-gray-700 font-semibold mb-1.5 text-center text-md">
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
        className="flex  flex-col justify-center w-full sm:w-[90vw] mt-24 "
      >
        <h2 className="font-bold text-blue-500 monteserrat text-3xl mb-10 text-center">
          Executives Messages <span className="text-yellow-400">|</span>
        </h2>
        <Message
          imageURL="https://aryaldipesh.com.np/assets/aboutPhoto.png"
          role="Principal"
          message="Welcome to our school’s digital platform. We are committed to fostering academic excellence, personal growth, and innovation. Together, let’s build a brighter future, empowering every student to thrive, lead, and contribute meaningfully to their community and beyond."
        />
        <Message
          imageURL="https://aryaldipesh.com.np/assets/aboutPhoto.png"
          role="Chairman"
          message="Welcome to our school’s digital platform. We are committed to fostering academic excellence, personal growth, and innovation. Together, let’s build a brighter future, empowering every student to thrive, lead, and contribute meaningfully to their community and beyond."
        />
      </section>
    </main>
  );
}
export default HomePage;
