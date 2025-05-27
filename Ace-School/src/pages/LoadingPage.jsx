import React from "react";
import { useSelector } from "react-redux";

const LoadingPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  return (
    <div
      class={`flex  w-full space-x-2 justify-center items-center ${
        isAuthenticated && "bg-white"
      }  h-screen `}
    >
      <span class="sr-only">Loading...</span>
      <div class="h-8 w-8 bg-zinc-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-8 w-8 bg-zinc-800 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-8 w-8 bg-zinc-800 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingPage;
