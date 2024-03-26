import { Event } from "@/dummy-data";

export async function getAllEvents() {
  const response = await fetch(
    "https://bestia-e824e-default-rtdb.firebaseio.com/events.json"
  );
  const events: Event[] = await response.json();
  return events;
}

export async function getFeaturedEvents() {
  return (await getAllEvents()).filter((event) => event.isFeatured);
}

export async function getEventById(id:string) {
  return (await getAllEvents()).find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: { year: number; month: number }) {
    const { year, month } = dateFilter;
  
    let filteredEvents = (await getAllEvents()).filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });
  
    return filteredEvents;
  }