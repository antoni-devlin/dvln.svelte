import dayjs from "dayjs";

export function getCurrentDateTime() {
  const currentDate = dayjs();
  
  // Format date and time
  const formattedDateTime = currentDate.format('YYYY-MM-DD HH:mm:ss.SSSSSSZ');
  
  return formattedDateTime;
}