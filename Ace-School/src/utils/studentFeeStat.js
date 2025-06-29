import NepaliDate from "nepali-datetime";
import { monthValue } from "./month";

export const getMonthlyAndTotalFeeData = (FeeDocumet) => {
  const statObject = {
    dueTotal: 0,
    paidTotal: 0,
    paidFees: 0,
    dueFees: 0,
    dueFeesWholeYear: 0,
    payableFeesWholeYear: 0,
  };

  const monthlyRecords = JSON.parse(FeeDocumet.monthlyRecords);
  statObject.dueFees = 0;
  statObject.dueTotal = 0;
  statObject.paidFees = 0;
  statObject.paidTotal = 0;
  for (let index = 0; index < monthlyRecords.length; index++) {
    const month = monthlyRecords[index];

    statObject.dueTotal += month.due;
    if (month.month.toLowerCase() === monthValue.toLowerCase()) {
      statObject.dueFees += month.due;
      statObject.paidFees += month.paid;
      break;
    }
  }
  for (let index = 0; index < monthlyRecords.length; index++) {
    const month = monthlyRecords[index];
    if (month.paid === 0) {
      break;
    }
    statObject.paidTotal += month.paid;
  }
  monthlyRecords.forEach((month) => {
    statObject.dueFeesWholeYear += month.due;
    statObject.payableFeesWholeYear += month.totalPayable;
  });
  const formatter = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 2,
  });
  const formattedStatObject = {
    dueTotal: formatter.format(statObject.dueTotal),
    paidTotal: formatter.format(statObject.paidTotal),
    paidFees: formatter.format(statObject.paidFees),
    dueFees: formatter.format(statObject.dueFees),
    dueFeesWholeYear: formatter.format(statObject.dueFeesWholeYear),
    payableFeesWholeYear: formatter.format(statObject.payableFeesWholeYear),
    dueForYear: formatter.format(
      statObject.payableFeesWholeYear - statObject.paidTotal
    ),
  };

  return formattedStatObject;
};
