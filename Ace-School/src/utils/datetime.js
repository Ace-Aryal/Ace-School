import NepaliDate from "nepali-datetime";

export const todayDate = new NepaliDate().toString().trim().slice(0, 10);
