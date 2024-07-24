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
import { useEffect, useState } from "react";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(RBCalendar);

const Calendar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

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
    const { start, end, event } = data;

    setEvents((currentEvents) => {
      return currentEvents.map((evt) => {
        if (evt.resource === event.resource) {
          return {
            ...evt,
            start: new Date(start),
            end: new Date(end),
          };
        }
        return evt;
      });
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { start, end, event } = data;

    setEvents((currentEvents) => {
      return currentEvents.map((evt) => {
        if (evt.resource === event.resource) {
          return {
            ...evt,
            start: new Date(start),
            end: new Date(end),
          };
        }
        return evt;
      });
    });
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
        className="px-2"
        toolbar={false}
        timeslots={2}
      />
    </div>
  );
};

export default Calendar;
