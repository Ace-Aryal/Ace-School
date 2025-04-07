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
function HomePage() {
  const schoolImageArray = [
    "https://scontent.fjkr2-1.fna.fbcdn.net/v/t39.30808-6/473677336_904788301817991_928053691669148200_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=mXGeHH4yUDcQ7kNvwErjJ9X&_nc_oc=AdksI0Y1ftXtusEwYPKieADaGnxFJKV_rAwoHKlU88CODnWlpei-5bFMusbW3tg_UoA&_nc_zt=23&_nc_ht=scontent.fjkr2-1.fna&_nc_gid=cW2ZVTvmxyAIyMwzF1CN3A&oh=00_AfFNEmrDamn8kFab0cNVSc83JBQb_64CPxKRcxphX-Tofg&oe=67F95868",
    "https://scontent.fjkr2-1.fna.fbcdn.net/v/t39.30808-6/475689866_916354930661328_7499539758261830160_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=kLP4-lk6k1kQ7kNvwE9rtBV&_nc_oc=AdlGIJEYUfWjFFZLItD6UncqyppMSwB-MhVsMuWaCt_yZmsMkc31pA5A_NuB8NBOmxc&_nc_zt=23&_nc_ht=scontent.fjkr2-1.fna&_nc_gid=zOv-QNpoSiZO5AHQeC2vcA&oh=00_AfEGZDlMUdubt0DnLIMeX1soRaRrtTnkQemXk0rbczM70Q&oe=67F984CB",
    "https://scontent.fjkr2-1.fna.fbcdn.net/v/t39.30808-6/474744474_911117601185061_5035206282103477126_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=FnrZ32gVuYIQ7kNvwH4pvWg&_nc_oc=Adkylly7avXLJeYopWuAhpeJ9gNOFs6G78iOFF8jc7IQDaJeK-5LEivF247T0_PMjr8&_nc_zt=23&_nc_ht=scontent.fjkr2-1.fna&_nc_gid=up5_zqRhHuMVk0lB0aD6cQ&oh=00_AfFlxTCb9tzURWd-EuIEifAlZdqIcjtwyxBTFFSmwYjRbA&oe=67F96C0E",
    "https://scontent.fjkr2-1.fna.fbcdn.net/v/t39.30808-6/477965893_923580743272080_2609524583935671673_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_yL81FqAIY4Q7kNvwGPAl8D&_nc_oc=Adn9bm6Am6or66HebOStsttUpDlSB50euwmKL6b6l91zQeZCkRqwEFZzCEF3uXYxAK4&_nc_zt=23&_nc_ht=scontent.fjkr2-1.fna&_nc_gid=63MiYx18b03DVtF38cW7ag&oh=00_AfGIrLyzZANlWdw4UZtNOtO0rF2SZw3eD4UF5ggfQSs5zQ&oe=67F98957",
    "https://scontent.fjkr2-1.fna.fbcdn.net/v/t39.30808-6/473252588_903029021993919_1403166689557480623_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qO-Hav7vo-MQ7kNvwGzEZpz&_nc_oc=Adlx3MNqAzDucKj4f3Hft8meaBAiLfkSkz_ORdFr4WIYA6zPIT2Zq3H5rkju0cPD8O0&_nc_zt=23&_nc_ht=scontent.fjkr2-1.fna&_nc_gid=7ZruvGfVAcRw1Stw5Ba8-A&oh=00_AfEhBayYw_Q7utghByPkzB-sm7HinQ0k7crcNqJ-jd5WYA&oe=67F97ABD",
  ];
  const aluminiIArray = [
    {
      image: "https://aryaldipesh.com.np/assets/aboutPhoto.png",
      mesage:
        "​As proud alumni of SBSS, we celebrate the achievements of our alma mater and the enduring bonds we've formed. Our experiences here have shaped us into lifelong learners and community leaders. We remain committed to supporting and uplifting the next generation of students, ensuring that the legacy of excellence continues",
    },
    {
      image: "https://aryaldipesh.com.np/assets/aboutPhoto.png",
      mesage:
        "​As proud alumni of [School Name], we celebrate the achievements of our alma mater and the enduring bonds we've formed. Our experiences here have shaped us into lifelong learners and community leaders. We remain committed to supporting and uplifting the next generation of students, ensuring that the legacy of excellence continues",
    },
    {
      image: "https://aryaldipesh.com.np/assets/aboutPhoto.png",
      mesage:
        "​As proud alumni of BSS, we celebrate the achievements of our alma mater and the enduring bonds we've formed. Our experiences here have shaped us into lifelong learners and community leaders. We remain committed to supporting and uplifting the next generation of students, ensuring that the legacy of excellence continues",
    },
  ];
  return (
    <main className="flex flex-col mx-4 sm:pt-0  md:pt-28 ">
      <div className="  flex flex-col items-center  ">
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
          className=" lg:max-w-[70vw] sm:w-screen "
        >
          <CarouselContent>
            {schoolImageArray.map((image) => (
              <CarouselItem key={image} className="outline-0">
                <div className=" flex justify-center ">
                  <Card className="p-0 ">
                    <CardContent className="flex h-[60vh]  items-center justify-center p-0 m-0 ">
                      <img
                        src={image}
                        alt=""
                        className="h-[60vh] rounded-xl aspect-video object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
      <h1 className="text-5xl py-4 text-indigo-500 font-bold text-center">
        Creating Curious Minds.
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
          <CarouselContent>
            {aluminiIArray.map((alumini) => (
              <CarouselItem key={alumini.mesage} className="outline-0">
                <div className=" flex justify-center ">
                  <Card className="p-0 ">
                    <CardContent className="flex flex-col lg:w-[40vw] sm:w-[80vw]  min-w-[40vw]    items-center justify-center px-8 py-4 m-0 ">
                      <img
                        src={alumini.image}
                        alt=""
                        className="h-[150px] m-5 rounded-full  object-cover"
                      />
                      <q className="text-justify">{alumini.mesage}</q>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </main>
  );
}

export default HomePage;
