import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { NavLink } from "react-router";

export default function GeneralErrorPage({ message = "Something went wrong" }) {
  return (
    <div className=" w-full mx-auto grid place-items-center  p-6 bg-white rounded-2xl shadow-xl border border-zinc-200 text-center">
      <div>
        {" "}
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-500 w-10 h-10" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-800 mb-2">Oops!</h2>
        <p className="text-zinc-600 mb-6">{message}</p>
        <NavLink to={-1}>
          {" "}
          <Button className="hover:bg-blue-200" variant="outline">
            Go Back
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
