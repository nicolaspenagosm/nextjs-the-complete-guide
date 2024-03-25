import { Event } from "@/dummy-data";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList: React.FC<{ items: Event[] }> = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
};

export default EventList;
