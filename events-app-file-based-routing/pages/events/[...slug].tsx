import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helpers/api-utils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useRouter } from "next/router";

const FilteredEventsPage = ({
  hasError,
  filteredEvents,
  year,
  month,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const router = useRouter();
  // // On first render we dont have the data, but useRouters triggers a
  // // a second render inmediatly
  // const filterData = router.query.slug;
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }
  // const [year, month] = filterData as string[];
  // const numYear = +year;
  // const numMonth = +month;
  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Adjust your values</p>
        </ErrorAlert>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }
  // const events = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList items={filteredEvents} />
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const { params } = context;
  const filterData = params!.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }
  const [year, month] = filterData as string[];
  const numYear = +year;
  const numMonth = +month;
  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect:{
      //   destination:"/error"
      // }
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      filteredEvents,
      year,
      month,
    },
  };
}) satisfies GetServerSideProps<{
  hasError?: boolean;
  filteredEvens?: Event[];
  year?: string;
  month?: string;
}>;

export default FilteredEventsPage;
