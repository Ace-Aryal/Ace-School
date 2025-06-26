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
import { DialogClose } from "@radix-ui/react-dialog";

export default function PenaltyTableModal({
  open,
  onOpenChange,
  penalties = [],
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white  ">
        <DialogHeader>
          {" "}
          <DialogTitle>Penalty Records</DialogTitle>
        </DialogHeader>

        <div className="max-w-4xl mx-auto  w py-6 space-y-6">
          {/* Student Info */}
          <Card>
            <CardContent className="p-4 space-y-1">
              <div>
                <strong>Name:</strong> Dipesh Aryal
              </div>
              <div>
                <strong>Roll:</strong> 12
              </div>
              <div>
                <strong>Class:</strong> 7
              </div>
            </CardContent>
          </Card>

          {/* Penalty Table */}
          <Card>
            <CardContent className="overflow-x-auto p-0 overflow-y-scroll">
              <Table>
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
