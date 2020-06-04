import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Formats Date
export const formatDate = (date: string): string => {
  return dayjs(date).format("MMMM D, YYYY");
};

// Formats Time
export const formatTime = (date: string): string => {
  return dayjs(date).format("h:mm A");
};

// Formats Relative Time
export const formatRelative = (date: string): string => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

// Formats Total Days on Rant
export const formatDays = (date: string) => {
  return dayjs().diff(date, "day");
};
