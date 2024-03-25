import EventLogistics from "@/components/event-detail/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-detail/event-summary";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";
import { Event } from "@/dummy-data";
import EventContent from "@/components/event-detail/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
const EventDetailPage: React.FC = () => {
  const route = useRouter();
  const id = route.query.eventId;
  const event = getEventById(id as string);
  if (!event) {
    return (
      <ErrorAlert>
        <p> No event found!</p>
      </ErrorAlert>
    );
  }
  const { title, date, description, location, image } = event;
  return (
    <>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
