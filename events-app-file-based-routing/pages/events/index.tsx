import EventItem from "@/components/events/event-item";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const AllEventsPage: React.FC = () => {
  const events = getAllEvents();
  const router = useRouter();
  const findEventsHandler = (year: string, month: string) => {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  };
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
