import EventList from "@/components/events/event-list";
import { Event } from "@/dummy-data";
import { getFeaturedEvents } from "@/helpers/api-utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  featuredEvents,
  rand
}) => {
  return (
    <main>
      <p>{rand}</p>
      <EventList items={featuredEvents} />
    </main>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<{
  featuredEvents: Event[];
  rand:number
}> = async () => {
 
  const events: Event[] = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: events,
      rand: Math.random(),
    },
    revalidate: 1800,
  };
};

