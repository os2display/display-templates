import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";

const renderTimeOfDayFromUnixTimestamp = (unixTimestamp) =>
  dayjs(unixTimestamp * 1000)
    .locale(localeDa)
    .format("HH:mm");

const timeCountdownString = (seconds) => {
  if (seconds <= 0) return "";

  const daysUntil = Math.floor(seconds / (60 * 60 * 24));
  const hoursUntil = Math.floor(
    (seconds - daysUntil * 60 * 60 * 24) / (60 * 60)
  );
  const minutesUntil = Math.floor((seconds - hoursUntil * 60 * 60) / 60);
  const secondsUntil = seconds % 60;

  // TODO: Translate strings.
  const textEnd = " til næste begivenhed";

  if (daysUntil > 0) {
    return `${daysUntil} dag${daysUntil > 1 ? "e" : ""} ${textEnd}`;
  }
  if (hoursUntil > 0) {
    return `${hoursUntil} time${hoursUntil > 1 ? "r" : ""} ${textEnd}`;
  }
  if (minutesUntil > 0) {
    return `${minutesUntil} minut${minutesUntil > 1 ? "ter" : ""} ${textEnd}`;
  }
  if (secondsUntil > 0) {
    return `Mindre end et minut ${textEnd}`;
  }
  return "";
};

export { renderTimeOfDayFromUnixTimestamp, timeCountdownString };
