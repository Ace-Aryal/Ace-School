export const monthMap = [
  { order: 0, label: "Baisakh", value: "baisakh" },
  { order: 1, label: "Jestha", value: "jestha" },
  { order: 2, label: "Ashar", value: "ashar" },
  { order: 3, label: "Shrawan", value: "shrawan" },
  { order: 4, label: "Bhadra", value: "bhadra" },
  { order: 5, label: "Ashoj", value: "ashoj" },
  { order: 6, label: "Kartik", value: "kartik" },
  { order: 7, label: "Mangsir", value: "mangsir" },
  { order: 8, label: "Poush", value: "poush" },
  { order: 9, label: "Magh", value: "magh" },
  { order: 10, label: "Falgun", value: "falgun" },
  { order: 11, label: "Chaitra", value: "chaitra" },
];

export const monthMapperByOrder = (monthOrder) => {
  return monthMap[monthOrder];
};
