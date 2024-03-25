import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const FilteredEventsPage: React.FC = () => {
  const router = useRouter();
  // On first render we dont have the data, but useRouters triggers a
  // a second render inmediatly
  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }
  const [year, month] = filterData as string[];
  const numYear = +year;
  const numMonth = +month;
  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Adjust your values</p>
        </ErrorAlert>
        <div style={{display:"flex", justifyContent:"center"}}>
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }
  const events = getFilteredEvents({ year: numYear, month: numMonth });

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div style={{display:"flex", justifyContent:"center"}}>
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList items={events} />
    </>
  );
};

export default FilteredEventsPage;
