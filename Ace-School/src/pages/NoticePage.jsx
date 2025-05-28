import RTE from "@/components/Templates/RTE";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const CreateNoticePage = () => {
  const roles = useSelector((state) => state.auth.user.roles);
  if (!roles.includes("admin")) {
    return <Navigate to="*" />;
  }
  return (
    <main className="flex w-full my-2 sm:my-4 flex-col  justify-center items-center">
      <h2 className="text-3xl text-zinc-800 font-semibold w-full sm:max-w-[80%]">
        Create Notice
      </h2>

      <RTE className="w-full  px-1 mx-1 sm:max-w-[80%]" />
    </main>
  );
};

export default CreateNoticePage;
