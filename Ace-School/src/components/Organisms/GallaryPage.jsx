import React from "react";

const GallaryPage = () => {
  return (
    <main id="container" className="mt-14">
      <h1 className="text-3xl text-center font-bold pt-4 text-indigo-500">
        Image Gallary
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"></section>
    </main>
  );
};

export default GallaryPage;
