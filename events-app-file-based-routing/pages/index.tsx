import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/dummy-data";

const HomePage: React.FC = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <main>
      <EventList items={featuredEvents} />
    </main>
  );
};

export default HomePage;
