export function getEventStatus(event) {

  if (event.status === "Draft") {
    return "Draft";
  }

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const eventDate =
    new Date(event.date);

  eventDate.setHours(
    0,
    0,
    0,
    0
  );

  if (eventDate < today) {
    return "Completed";
  }

  return "Upcoming";
}


export function isUpcoming(event) {
  return (
    getEventStatus(event) ===
    "Upcoming"
  );
}


export function isCompleted(event) {
  return (
    getEventStatus(event) ===
    "Completed"
  );
}


export function isDraft(event) {
  return (
    getEventStatus(event) ===
    "Draft"
  );
}


export function getStatusClass(status) {
  return status.toLowerCase();
}