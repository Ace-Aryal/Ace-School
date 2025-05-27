import { toast } from "sonner";
import { X } from "lucide-react";

export const showErrorToast = (message) => {
  toast.custom(
    (t) => (
      <div className="flex items-center w-80 px-4 py-3 border-l-4 border-red-500 bg-zinc-900 rounded shadow-md text-sm text-white">
        <span>{message}</span>
        <button onClick={() => toast.dismiss(t)} className=" text-white ">
          <X size={16} />
          {/* or just use: ✕ */}
        </button>
      </div>
    ),
    { duration: 3000 }
  ); // auto dismiss in 4 sec
};
export const showSuccessToast = (message) => {
  toast.custom(
    (t) => (
      <div className="transition-transform duration-300 scale-100 flex items-center justify-between w-80 px-4 py-3 border-l-4 border-green-500 bg-zinc-900 rounded shadow-md text-sm text-white">
        <span>{message}</span>
        <button onClick={() => toast.dismiss(t)} className=" text-white ">
          <X size={16} />
          {/* or just use: ✕ */}
        </button>
      </div>
    ),
    { duration: 3000 }
  ); // auto dismiss in 4 sec
};
