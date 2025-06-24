import React from "react";
import { useParams } from "react-router";
import storageService from "@/appwrite/storage/storage";
import { useQuery } from "@tanstack/react-query";
const GallaryItem = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["image"],
    queryFn: () => {
      return storageService.getImage(id);
    },
  });

  if (isLoading) {
    return <p className="mt-14">Loading..</p>;
  }
  if (error)
    return <p className="mt-14">Error loading images: {error.message}</p>;

  return (
    <main className=" w-full  p-3  flex justify-center  items-center">
      <img
        src={data}
        alt="gallary-image"
        className="rounded-xl w-[90vw] max-h-[91dvh] object-contain "
      />
    </main>
  );
};

export default GallaryItem;
