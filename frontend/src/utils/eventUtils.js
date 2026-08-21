export function getEventStatus(event) {
  // -----------------------------------------
  // DRAFT EVENT
  // -----------------------------------------
  if (event.status === "Draft") {
    return "Draft";
  }

  // -----------------------------------------
  // GET EVENT DATE
  // -----------------------------------------
  const dateValue =
    event.date ||
    event.eventDate ||
    event.startDate ||
    "";

  // If date is missing
  if (!dateValue) {
    return "Upcoming";
  }

  // -----------------------------------------
  // GET EVENT DATE + TIME
  // -----------------------------------------
  let eventDateTime;

  if (event.time) {
    eventDateTime = new Date(
      `${dateValue}T${event.time}`
    );
  } else {
    eventDateTime = new Date(dateValue);
  }

  // -----------------------------------------
  // INVALID DATE
  // -----------------------------------------
  if (isNaN(eventDateTime.getTime())) {
    return "Upcoming";
  }

  // -----------------------------------------
  // CURRENT DATE + TIME
  // -----------------------------------------
  const now = new Date();

  // -----------------------------------------
  // COMPLETED
  // -----------------------------------------
  if (eventDateTime < now) {
    return "Completed";
  }

  // -----------------------------------------
  // UPCOMING
  // -----------------------------------------
  return "Upcoming";
}


// =========================================
// CHECK UPCOMING
// =========================================

export function isUpcoming(event) {
  return (
    getEventStatus(event) ===
    "Upcoming"
  );
}


// =========================================
// CHECK COMPLETED
// =========================================

export function isCompleted(event) {
  return (
    getEventStatus(event) ===
    "Completed"
  );
}


// =========================================
// CHECK DRAFT
// =========================================

export function isDraft(event) {
  return (
    getEventStatus(event) ===
    "Draft"
  );
}


// =========================================
// STATUS CSS CLASS
// =========================================

export function getStatusClass(status) {
  return status.toLowerCase();
}