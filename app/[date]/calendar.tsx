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
import { saveTodo } from "@/actions/main";
import { usePathname } from "next/navigation";

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

const Calendar = ({ calendarEvents }: { calendarEvents: Event[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

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

  const onEventResize: withDragAndDropProps["onEventResize"] = async (data) => {
    const { start, end, event } = data;

    calendarEvents.map((calendarEvent) => {
      if (calendarEvent.resource === event.resource) {
        calendarEvent.start = new Date(start);
        calendarEvent.end = new Date(end);
      }
    });

    await saveTodo({
      id: event.resource,
      values: {
        start: new Date(start),
        end: new Date(end),
      },
      pathname,
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = async (data) => {
    const { start, end, event } = data;

    calendarEvents.map((calendarEvent) => {
      if (calendarEvent.resource === event.resource) {
        calendarEvent.start = new Date(start);
        calendarEvent.end = new Date(end);
      }
    });

    await saveTodo({
      id: event.resource,
      values: {
        start: new Date(start),
        end: new Date(end),
      },
      pathname,
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-full border-r">
      <DnDCalendar
        defaultView="day"
        events={calendarEvents}
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
