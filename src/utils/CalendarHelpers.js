export function convertToISOStringFormat(inputDate) {
  // Split the input string into date and time parts
  const [datePart, timePart] = inputDate.split(" ");

  // Split the date part into year, month, and day
  const [year, month, day] = datePart.split("/");

  // Combine the date and time parts into ISO format
  const isoDate = `${year}-${month}-${day}T${timePart}:00.000Z`;

  return isoDate;
}
export const formatDateTosendToBack = (date) => {
  const originalDate = new Date(date);

  const year = originalDate.getUTCFullYear();
  const month = String(originalDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getUTCDate()).padStart(2, "0");
  const hours = String(originalDate.getUTCHours()).padStart(2, "0");
  const minutes = String(originalDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(originalDate.getUTCSeconds()).padStart(2, "0");

  const reversedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return reversedDate;
};
export function formatDateToCustomString(inputDate, boolean) {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = boolean
    ? String(date.getHours() + 1).padStart(2, "0")
    : String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const customDateString = `${year}/${month}/${day} ${hours}:${minutes}`;

  return customDateString;
}
export const fields = [
  {
    name: "title",
    type: "select",
    options: [
      // {
      //   id: "Available",
      //   text: "Available",
      //   value: "Available",
      // },
      {
        id: "Pending",
        text: "Pending",
        value: "Pending",
      },
      {
        id: "Reserved",
        text: "Reserved",
        value: "Reserved",
      },
    ],
    config: {
      label: "title",
      required: true,
    },
  },
  {
    name: "end",
    type: null,
  },
  {
    name: "start",
    type: "date",
    config: {
      required: true,
    },
  },
];
