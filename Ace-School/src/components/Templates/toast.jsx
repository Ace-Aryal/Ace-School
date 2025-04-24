import { toast } from "sonner";

export const showErrorToast = (message) => {
  toast.custom(
    (t) => (
      <div className="flex items-center w-80 px-4 py-3 border-l-4 border-red-500 bg-white dark:bg-zinc-900 rounded shadow-md text-sm text-gray-800 dark:text-white">
        {message}
      </div>
    ),
    { duration: 3000 }
  ); // auto dismiss in 4 sec
};
export const showSuccessToast = (message) => {
  toast.custom(
    (t) => (
      <div className="flex items-center w-80 px-4 py-3 border-l-4 border-green-500 bg-white dark:bg-zinc-900 rounded shadow-md text-sm text-gray-800 dark:text-white">
        {message}
      </div>
    ),
    { duration: 3000 }
  ); // auto dismiss in 4 sec
};
