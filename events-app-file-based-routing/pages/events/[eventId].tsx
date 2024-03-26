import EventLogistics from "@/components/event-detail/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-detail/event-summary";
import { getAllEvents, getEventById, getFeaturedEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import { Event } from "@/dummy-data";
import EventContent from "@/components/event-detail/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
const EventDetailPage = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!event) {
    return (
      <div className="center">
        <p> Loading</p>
      </div>
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

export const getStaticPaths = (async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((e) => ({
    params: {
      eventId: e.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { params } = context;
  const eventId = params!.eventId! as string;
  const event = (await getEventById(eventId)) || null;

  return { props: { event }, revalidate: 30 };
}) satisfies GetStaticProps<{
  event: Event | null;
}>;
