"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianAxis,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

export const description = "A mixed bar chart";

export function FeeCatagoryBarChart({ chartData = [], chartConfig = {} }) {
  return (
    <Card className="border-0 w-full h-full  shadow-none p-1">
      <CardHeader>
        <CardTitle>Your Fee Catagories</CardTitle>
      </CardHeader>
      <CardContent className="px-0 w-full">
        <ChartContainer config={chartConfig}>
          <BarChart
            height={1200}
            className="w-full"
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 25,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              className=""
              dataKey="feeCategory"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
              hide
            />
            <XAxis dataKey="amount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="bg-white" indicator="line" />
              }
            />
            <Bar
              dataKey="amount"
              fill="#4ade80"
              className=""
              layout="vertical"
              radius={5}
            >
              <LabelList
                dataKey="feeCategory"
                position="insideLeft"
                offset={10}
                className="fill-(--color-label) "
                fontSize={13}
              />
              <LabelList
                dataKey="amount"
                position="right"
                offset={2}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
