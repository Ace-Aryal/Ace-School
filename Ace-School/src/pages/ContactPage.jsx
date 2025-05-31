import React, { useRef, useState } from "react";
import { RiContactsLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import databaseService from "@/appwrite/Database/database";
import { toast } from "sonner";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import Spinner from "@/components/Atoms/Spinner";
function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const sendMessage = async (data) => {
    const response = await databaseService.createMessage(data);
    if (response === true) {
      showSuccessToast("Message sent sucessfullly !");
      reset();

      return;
    }

    showErrorToast("Error sending message");
  };
  return (
    <main className=" pt-18 sm:pt-24 flex justify-center mb-20 w-full slideIn">
      <div className="container grid grid-cols-1 gap-5 sm:gap-1 w-full sm:w-[80vw] md:w-[70vw] sm:grid-cols-2">
        <div className="flex justify-center gap-2 row-span-1 text-yellow-400 text-3xl">
          <h1 className="text-2xl text-blue-500 font-bold">CONTACT US</h1>
          <RiContactsLine />
        </div>

        <form
          onSubmit={handleSubmit(sendMessage)}
          class="flex flex-col gap-5 row-span-2  items-center"
        >
          <input
            type="text"
            name="Name"
            id="name"
            {...register("fullName", {
              required: "Name is required",
            })}
            placeholder="Your Full Name "
            className="border-0 focus:outline-none bg-blue-50 fo focus:ring-2 focus:ring-blue-500   focus:border-blue-500 w-[70%] sm:w-[60%] rounded-lg py-3 pl-2 pr-10 text-left  "
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
          <input
            type="tel"
            name="phone"
            id="phone"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/, // 10 digit number validation
                message: "Invalid phone number",
              },
            })}
            placeholder="Phone"
            className="focus:outline-none bg-blue-50   focus:ring-2 focus:ring-blue-500  focus:border-blue-500  w-[70%] sm:w-[60%]  rounded-lg py-3 pl-2 pr-10 text-left focus:invalid:text-red-500 "
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          <textarea
            type="textarea"
            name="Message"
            id="message"
            minLength="5"
            {...register("message", {
              required: "Message is required",
            })}
            placeholder="Your Message..."
            class=" focus:outline-none  bg-blue-50  focus:ring-2 focus:ring-blue-500   w-[70%] sm:w-[60%] rounded-lg py-3 pl-2 pr-10 text-left"
            rows="2"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            id="message"
            className=" border-1  focus:ring-blue-500 focus:border-blue-500   rounded-3xl py-2.5 pl-2 pr-2 text-left min-w-40 bg-orange-400 text-white self-center hover:bg-indigo-800 "
          >
            {isSubmitting ? <Spinner /> : "Send Message"}
          </button>
        </form>
        <div className="flex text-[0.9rem] justify-center  mt-6 sm:mt-0">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="flex text-lg text-yellow-400 justify-between items-center">
                <h2 className="text-red-500 font-semibold">CALL US</h2>
                <IoCallOutline />
              </div>
              <p>01023456</p>
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex text-lg text-yellow-400 justify-between items-center">
                <h2 className=" text-red-500 text-lg font-semibold">
                  EMAIL US
                </h2>
                <MdOutlineEmail />
              </div>
              <p>birendra@mail.edu.np</p>
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex text-lg text-yellow-400 justify-between items-center">
                <h2 className=" text-red-500 text-lg font-semibold">LOCATON</h2>
                <IoLocationOutline />
              </div>
              <p>Chainpur, Bidur-6 Nuwakot</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
