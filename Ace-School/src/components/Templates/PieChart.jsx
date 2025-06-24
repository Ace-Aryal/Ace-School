import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with an active sector";

const chartConfig = {
  amount: {
    label: "Amount",
  },
  paid: {
    label: "Paid",
    color: "#22c55e", // green-500
  },
  due: {
    label: "Due",
    color: "#ef4444", // red-500
  },
};

export default function ChartPieDonutActive({ data, chartData }) {
  return (
    <Card className=" flex flex-col border-0 shadow-none     ">
      <CardContent className="flex-1 px-0 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto  aspect-square max-h-[250px]"
        >
          <PieChart className="">
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="border-0 bg-white" hideLabel />
              }
            />
            <Pie
              data={chartData}
              dataKey="amount"
              className=""
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              outerRadius={75}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 2} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="p-0  flex flex-col gap-2 text-sm">
        <div className=" bg-green-100 rounded-lg p-2 w-9/10 shadow-sm  text-green-600  font-medium">
          Total Paid : {data.paidFees?.toFixed(2)}
        </div>
        {data.paidStudents === 0 || data.paidStudents ? (
          <div className=" bg-green-100 rounded-lg p-2 w-9/10 shadow-sm text-green-600  font-medium">
            Paid Students : {data.paidStudents}
          </div>
        ) : null}
        <div className="bg-red-100  rounded-lg w-9/10 shadow-sm text-red-600 p-2  font-medium">
          Total Due : {data.dueFees?.toFixed(2)}
        </div>

        {data.dueStudents === 0 || data.dueStudents ? (
          <div className="bg-red-100  rounded-lg w-9/10 shadow-sm text-red-600 p-2 font-medium">
            Due Students: {data.dueStudents}
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
