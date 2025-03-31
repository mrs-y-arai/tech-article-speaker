import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ja from "dayjs/locale/ja";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.locale(ja);
dayjs.tz.setDefault("Asia/Tokyo");

export const formatDate = (date: Date) => {
  return dayjs(date).tz("Asia/Tokyo").format("YYYY.MM.DD");
};
