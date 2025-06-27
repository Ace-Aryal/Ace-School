"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
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
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";

import GeneralErrorPage from "@/pages/GeneralErrorPage";
import LoadingPage from "@/pages/LoadingPage";

export const description = "A line chart with a label";

export function FeeStatLineGraph() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["feeStatGraph"],
    queryFn: async () => {
      try {
        const response = await databaseService.listLastThirtyDaysFeesStat();

        return response;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  });
  if (isError) {
    return <GeneralErrorPage />;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  //   const chartData = [
  //     { month: "January", desktop: 186 },
  //     { month: "February", desktop: 305 },
  //     { month: "March", desktop: 237 },
  //     { month: "April", desktop: 73 },
  //     { month: "May", desktop: 209 },
  //     { month: "June", desktop: 214 },
  //   ];
  const chartConfig = {
    amount: {
      label: "Amount Collected",
      color: "var(--chart-1)",
    },
  };

  const statChartData = data.documents.map((document) => {
    return {
      date: document.date,
      amount: document.total,
    };
  });
  console.log(statChartData);

  return (
    <Card className=" border-0">
      <CardHeader>
        <CardTitle>Line Chart </CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={statChartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload, label }) => {
                if (!payload?.length) return null;
                const amt = payload[0].value;
                return (
                  <div className="bg-white/70 rounded-md border bg-popover p-2 text-sm shadow-md text-foreground min-w-[100px]">
                    <div className="font-medium text-muted-foreground">
                      {label}
                    </div>
                    <div className="font-semibold text-primary border-l-4 px-2  border-blue-600">
                      Rs. {amt.toLocaleString("en-NP")}
                    </div>
                  </div>
                );
              }}
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{
                fill: "#3B82F6",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total fee paid for last 30 days
        </div>
      </CardFooter>
    </Card>
  );
}
