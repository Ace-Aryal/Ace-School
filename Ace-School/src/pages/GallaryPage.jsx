import React, { useEffect } from "react";
import storageService from "@/appwrite/storage/storage";
import { Link } from "react-router";
import { Outlet } from "react-router";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
import ErrorBoundary from "@/components/Templates/ErrorBondary";
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
        const lastDataArray = allpages[allpages.length - 1];
        if (lastDataArray?.length === 0) {
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <main className="h-full min-h-[91dvh] grow  mb-10 w-full flex flex-col items-center justify-center">
        <LoadingPage />
      </main>
    );
  }
  if (error)
    return (
      <main className="h-full min-h-[91dvh] grow  mb-10 w-full flex flex-col items-center justify-center">
        <p className="mt-18">Error loading images: {error.message}</p>
      </main>
    );

  return (
    <ErrorBoundary>
      <main className="min-h-[91dvh] px-2 mb-10 w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-bold pt-4 text-indigo-500">
          Image Gallary
        </h1>

        <section className="mt-10 gap-2 gap-y-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {data?.pages?.map((imagePage) => {
            return imagePage?.map((image) => {
              const pathSegments = image.href.split("/");
              const fileID = pathSegments[8];
              return (
                <div
                  key={image.href}
                  className="m-0 p-0 inline-block transition-all px-4 sm:px-0 md:hover:scale-105 "
                >
                  <Link
                    to={`/gallary/${fileID}`}
                    key={image.href}
                    className="p-1 m-0 inline-block "
                  >
                    <img
                      key={image.href}
                      className="aspect-video object-cover rounded myshadow-md statEntry "
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
    </ErrorBoundary>
  );
};

export default GallaryPage;
