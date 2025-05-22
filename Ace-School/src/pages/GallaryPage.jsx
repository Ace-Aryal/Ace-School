import React, { useEffect } from "react";
import storageService from "@/appwrite/storage/storage";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Outlet } from "react-router";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
const GallaryPage = () => {
  const { getImagesPreview } = storageService;
  // only 20 lines from this is the core fn
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["gallery-images"],
      queryFn: async ({ pageParam = undefined }) => {
        return await getImagesPreview(pageParam);
      },
      getNextPageParam: (lastpage, allpages) => {
        console.log(allpages, "ap");

        const lastDataArray = allpages[allpages.length - 1];
        if (lastDataArray.length === 0) {
          return undefined;
        }
        const pathSegments =
          lastDataArray[lastDataArray.length - 1].pathname.split("/");
        return lastDataArray.length === 20 &&
          allpages[allpages?.length - 1].length > 0
          ? pathSegments[6]
          : undefined; // return undefined if there is no other page so that it tell has next page is false
      },
    });
  const { ref, inView } = useInView({
    threshold: 1,
  });
  console.log("data", data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error)
    return <p className="mt-18">Error loading images: {error.message}</p>;
  console.log(data);

  return (
    <main id="container" className=" mx-2 sm:mx-4 mb-10">
      <h1 className="text-3xl text-center font-bold pt-4 text-indigo-500">
        Image Gallary
      </h1>

      <section className="mt-10 gap-2 gap-y-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {data?.pages?.map((imagePage) => {
          return imagePage?.map((image) => {
            const pathSegments = image.href.split("/");
            const fileID = pathSegments[8];
            return (
              <div key={image.href} className="m-0 p-0 inline-block ">
                <Link
                  to={`/gallary/${fileID}`}
                  key={image.href}
                  className="p-1 m-0 inline-block "
                >
                  <img
                    key={image.href}
                    className="aspect-video object-cover rounded shadow-lg shadow-gray-400"
                    loading="lazy"
                    src={image.href}
                    alt="school photo"
                    title="click to view full image"
                  />
                </Link>
              </div>
            );
          });
        })}
      </section>
      <div ref={ref}>
        {!hasNextPage ? "End of results" : "Scroll to load more"}
      </div>
    </main>
  );
};

export default GallaryPage;
