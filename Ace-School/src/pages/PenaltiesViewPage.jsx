import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PenaltyTableModal({
  open,
  onOpenChange,
  penalties = [],
  studentDoc,
}) {
  console.log("stu doc", studentDoc);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-screen  sm:max-w-lg md:max-w-3xl lg:max-w-4xl">
        <DialogHeader>
          {" "}
          <DialogTitle>Penalty Records</DialogTitle>
        </DialogHeader>

        <div className=" mx-auto max-w-[calc(100vw-4rem)] sm:max-w-lg md:max-w-3xl lg:max-w-4xl w py-6 space-y-6">
          {/* Student Info */}
          <Card className="">
            <CardContent className="p-4 space-y-1">
              <div>
                <strong>Name:</strong> {studentDoc.name || "N/A"}
              </div>
              <div>
                <strong>Roll:</strong> {studentDoc.rollNo || "N/A"}
              </div>
              <div>
                <strong>Class:</strong> {studentDoc.grade || "N/A"}
              </div>
            </CardContent>
          </Card>

          {/* Penalty Table */}
          <Card className="overflow-scroll  md:max-w-3xl lg:max-w-4xl">
            <CardContent className=" ">
              <Table className="overflow-x-scroll ">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Account</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {penalties.map((penalty, index) => (
                    <TableRow key={index}>
                      <TableCell>{penalty.date}</TableCell>
                      <TableCell>{penalty.reason}</TableCell>
                      <TableCell>Rs. {penalty.amt}</TableCell>
                      <TableCell>{penalty.acc}</TableCell>
                    </TableRow>
                  ))}
                  {penalties.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No penalty records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
