import moment from "moment";
import _ from "lodash";

const daysOfInterest = () => {
  const days_of_interest = [
    { date: "2017/01/20", holiday: "Trump's Inauguration" },
    { date: "2017/01/28", holiday: "#MuslimBan" },
    { date: "2017/02/05", holiday: "Superbowl LI" },
    { date: "2017/02/26", holiday: "Oscars Goofup" },
    { date: "2017/03/06", holiday: "#MuslimBan 2" },
    { date: "2017/03/08", holiday: "Women's Day" },
    { date: "2017/08/12", holiday: "Charlottesville Attack" },
    { date: "2017/03/08", holiday: "Trump's response on Charlottesville" }
  ];
  return days_of_interest;
};
const getHolidays = year => {
  return [
    { date: `${year}/01/01`, holiday: "New Years" },
    { date: `${year}/02/14`, holiday: "Valentine's" },
    { date: `${year}/07/04`, holiday: "4th of July" },
    { date: `${year}/10/31`, holiday: "Halloween" },
    { date: `${year}/12/25`, holiday: "Christmas" }
  ];
};

const isHoliday = date => {
  const holiday_list = _.concat(
    getHolidays(2016),
    getHolidays(2017),
    getHolidays(2018),
    getHolidays(2019),
    daysOfInterest()
  );

  const is_holiday = holiday_list.some(h => {
    return moment(date).isSame(h.date, "day");
  });

  return is_holiday;
};

const holidayName = date => {
  const holiday_list = _.concat(
    getHolidays(2016),
    getHolidays(2017),
    getHolidays(2018),
    getHolidays(2019),
    daysOfInterest()
  );

  const name = holiday_list
    .filter(h => {
      return moment(date).isSame(h.date, "day");
    })
    .map(h => h.holiday)
    .reduce((prev, curr) => curr);

  return name;
};

export { isHoliday, holidayName };
