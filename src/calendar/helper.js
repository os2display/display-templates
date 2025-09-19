import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";

const renderTimeOfDayFromUnixTimestamp = (unixTimestamp) =>
  dayjs(unixTimestamp * 1000)
    .locale(localeDa)
    .format("HH:mm");

export { renderTimeOfDayFromUnixTimestamp };
