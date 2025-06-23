import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function ViewIndividualAttendancePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const attendanceRecord = location.state?.attendanceRecord || null;
  const personInfo = location.state?.personInfo || null;
  console.log(location.state, "att rec");
  if (!attendanceRecord) {
    return (
      <div className="w-full grid place-items-center">
        <p>Please navigate via buttons </p>
      </div>
    );
  }
  console.log(personInfo);

  const entries = Object.entries(attendanceRecord);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="pt-8 px-4 w-full">
        <Button
          variant=""
          className="bg-blue-100 hover:bg-blue-200 text-blue-600"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="max-w-3xl mx-auto p-6  w-full">
        {/* Info Card */}
        {personInfo && (
          <Card className="mb-3 mt-3 shadow-sm py-3 border-zinc-200">
            <CardContent className="p-4">
              <p className="text-zinc-700 font-medium">
                {personInfo.grade && <span>Grade: {personInfo.grade} | </span>}
                Name: {personInfo.name}{" "}
                {personInfo.roll && <span>| Roll: {personInfo.roll}</span>}
                {personInfo.id && <span>| ID: {personInfo.id}</span>}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-800">
            Attendance Record
          </h1>
        </div>

        <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
          <table className="min-w-full text-sm text-left text-zinc-700">
            <thead className="bg-zinc-100 border-b text-zinc-500">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map(([date, status], i) => (
                  <tr key={i} className="border-b hover:bg-zinc-50">
                    <td className="px-4 py-2">{date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          status === "present"
                            ? "bg-green-100 text-green-700"
                            : status === "absent"
                            ? "bg-red-100 text-red-700"
                            : status === "onleave"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-zinc-400 py-6">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
