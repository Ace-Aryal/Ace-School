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

const chartData = [
  { status: "paid", amount: 275, fill: "var(--color-paid)" }, // green-500
  { status: "due", amount: 300, fill: "var(--color-due)" }, // red-500
];

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

export default function ChartPieDonutActive({ month }) {
  return (
    <Card className="flex flex-col border-0 ">
      <CardHeader className="items-center pb-0">
        <CardTitle></CardTitle>
        <CardDescription className="capitalize">{month}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1  pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="border-0 bg-white" hideLabel />
              }
            />
            <Pie
              data={chartData}
              dataKey="amount"
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
      <CardFooter className="p-0 flex flex-col gap-2 text-sm">
        <div className="flex justify-between items-center">
          <div className=" bg-green-200 rounded-lg p-2 text-green-600  font-medium">
            Total Paid : {}
          </div>
          <div className="bg-red-200 rounded-lg text-red-600 p-2 leading-none font-medium">
            Total Due : {}
          </div>
        </div>
        <div className="flex justify-between">
          <div className=" bg-green-200 rounded-lg p-2 text-green-600  font-medium">
            Paid Students : {}
          </div>
          <div className="bg-red-200 rounded-lg text-red-600 p-2 leading-none font-medium">
            Due Students: {}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
