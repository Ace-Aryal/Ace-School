import React from "react";
import { Card } from "../Atoms/card";

function StudentSelfStatements({ transactionsArray }) {
  console.log(transactionsArray);
  return (
    <div>
      <section id="botoom">
        <Card className="p-4">
          <div className="overflow-auto max-h-[400px] max-w-full border rounded-md">
            <table className="min-w-[800px] text-sm w-full text-left border-collapse">
              <thead className="bg-muted sticky top-0 z-10">
                <tr>
                  <th className="p-2 border-b">Date</th>

                  <th className="p-2 border-b">Amount</th>
                  <th className="p-2 border-b">Method</th>
                  <th className="p-2 border-b">Payer</th>
                  <th className="p-2 border-b">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {transactionsArray.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-muted/50">
                    <td className="p-2 border-b">{entry.date}</td>

                    <td className="p-2 border-b">
                      Rs. {entry.amount.toLocaleString("en-NP")}
                    </td>
                    <td className="p-2 border-b">{entry.methodOfPayment}</td>
                    <td className="p-2 border-b">{entry.payer}</td>
                    <td className="p-2 border-b">{entry.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default StudentSelfStatements;
