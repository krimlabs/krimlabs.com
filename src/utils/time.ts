import { format, getDaysInMonth } from 'date-fns';

function getMonthName(monthNumber: string | number): string {
  const dummyDate = new Date(2023, parseInt(monthNumber) - 1, 1); // Month numbers are zero-based in JavaScript Date
  return format(dummyDate, 'MMMM');
}

function getNumberOfDaysInMonth(year: number, month: number): number {
  return getDaysInMonth(new Date(year, month - 1));
}

function convertDateString(dateString: string): string {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export { convertDateString, getMonthName, getNumberOfDaysInMonth };
