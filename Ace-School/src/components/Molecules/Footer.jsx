import React from "react";
import { Link } from "react-router";
function Footer() {
  return (
    <footer className="bg-indigo-900 ">
      <div className="max-w-screen-xl px-4 pt-8 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-teal-300 sm:justify-start">
              <img
                src="https://lubhupathshala.edu.np/images/front-images/logo.png"
                className="h-13"
                alt="School Logo "
              />
            </div>

            <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left">
              Working to make world a better place with education
            </p>

            <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
              <li>
                <Link
                  to="/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-teal-500 transition hover:text-teal-500/75"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-teal-500 transition hover:text-teal-500/75"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Our Services</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-white transition hover:text-white/75"
                      to="/"
                    >
                      Education
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white transition hover:text-white/75"
                      to="/"
                    >
                      ECA's
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white transition hover:text-white/75"
                      to="/"
                    >
                      Fooding
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white transition hover:text-white/75"
                      to="/"
                    >
                      Transportation
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="flex items-center justify-center sm:justify-start gap-1.5 group"
                    to="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="text-white transition group-hover:text-white/75">
                      birendra@mail.edu.np
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="flex items-center justify-center sm:justify-start gap-1.5 group"
                    to="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span className="text-white transition group-hover:text-white/75">
                      0123456789
                    </span>
                  </Link>
                </li>

                <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <address className="-mt-0.5 not-italic text-white">
                    Chainpur , Bidur-6 , Nuwakot
                  </address>
                </li>
              </ul>
            </div>
            <div id="map" className="col-span-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.2202616767563!2d85.10096073220302!3d27.888766353730503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ead77ecc13f79d%3A0x27adae75fb2290b0!2z4KS24KWN4KSw4KWAIOCkrOCkv-CksOClh-CkqOCljeCkpuCljeCksCDgpK7gpL7gpKfgpY3gpK_gpK7gpL_gpJUg4KSs4KS_4KSm4KWN4KSv4KS-4KSy4KSv!5e0!3m2!1sne!2snp!4v1744451599682!5m2!1sne!2snp"
                className=" w-full aspect-video   border-4 border-gray-900"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-12 border-t border-gray-800">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-400">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; {new Date().getFullYear()} Birendra Secondary School
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
