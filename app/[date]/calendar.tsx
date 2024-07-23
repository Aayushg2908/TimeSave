"use client";

import {
  Calendar as RBCalendar,
  dateFnsLocalizer,
  Event,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";
import { useEffect, useState } from "react";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};
// @ts-ignore
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
// @ts-ignore
const end = addHours(start, 1);
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
//@ts-ignore
const DnDCalendar = withDragAndDrop(RBCalendar);

const Calendar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Learn cool stuff",
      start,
      end,
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.querySelector(".rbc-current-time-indicator");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    console.log(data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-full border-r">
      <DnDCalendar
        defaultView="day"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        style={{ height: "100vh" }}
        className="px-2 py-4"
        toolbar={false}
        timeslots={2}
      />
    </div>
  );
};

export default Calendar;
