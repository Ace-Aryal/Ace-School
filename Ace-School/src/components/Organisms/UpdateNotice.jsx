import RTE from "@/components/Templates/RTE";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const UpdateNoticePage = () => {
  const role = useSelector((state) => state.auth.user.role);
  if (role !== "admin") {
    return <Navigate to="*" />;
  }
  return (
    <main className="flex my-2 sm:my-4 flex-col w-full justify-center items-center">
      <h2 className="text-4xl text-indigo-500 font-bold text-center">
        Update Notice
      </h2>

      <RTE className="w-full  px-1 mx-1 sm:w-[80%]" />
    </main>
  );
};

export default UpdateNoticePage;
