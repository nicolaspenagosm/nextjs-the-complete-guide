import EventItem from "@/components/events/event-item";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/helpers/api-utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";

const AllEventsPage = ({
  allEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const findEventsHandler = (year: string, month: string) => {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  };
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents,
    },
    revalidate:60
  };
};
export default AllEventsPage;
