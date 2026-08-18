export const initialEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    description:
      "Annual technical festival featuring coding competitions, workshops and technical activities.",
    date: "2026-08-20",
    time: "10:00",
    location: "College Auditorium",
    category: "Technical",
    capacity: 100,
    image: "",
    status: "Published",
    createdAt: "2026-08-01",
  },

  {
    id: 2,
    title: "Hackathon 2026",
    description:
      "24-hour coding and innovation challenge for students.",
    date: "2026-08-25",
    time: "09:00",
    location: "Computer Lab",
    category: "Coding",
    capacity: 80,
    image: "",
    status: "Published",
    createdAt: "2026-08-02",
  },

  {
    id: 3,
    title: "Web Development Workshop",
    description:
      "Hands-on workshop covering modern web development technologies.",
    date: "2026-07-20",
    time: "11:00",
    location: "Seminar Hall",
    category: "Workshop",
    capacity: 60,
    image: "",
    status: "Published",
    createdAt: "2026-07-01",
  },

  {
    id: 4,
    title: "AI & Machine Learning Seminar",
    description:
      "Introduction to artificial intelligence and machine learning.",
    date: "2026-09-05",
    time: "10:30",
    location: "Main Hall",
    category: "Seminar",
    capacity: 150,
    image: "",
    status: "Draft",
    createdAt: "2026-08-04",
  },

  {
    id: 5,
    title: "Cultural Fest",
    description:
      "A celebration of culture, music, dance and student talent.",
    date: "2026-07-10",
    time: "17:00",
    location: "Open Ground",
    category: "Cultural",
    capacity: 300,
    image: "",
    status: "Published",
    createdAt: "2026-07-01",
  },
];

export const initialRegistrations = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "9876543210",
    eventId: 1,
    eventName: "Tech Fest 2026",
    status: "Confirmed",
    registeredAt: "2026-08-10",
  },

  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876501234",
    eventId: 1,
    eventName: "Tech Fest 2026",
    status: "Confirmed",
    registeredAt: "2026-08-11",
  },

  {
    id: 3,
    name: "Arjun Reddy",
    email: "arjun@example.com",
    phone: "9123456780",
    eventId: 2,
    eventName: "Hackathon 2026",
    status: "Pending",
    registeredAt: "2026-08-12",
  },

  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@example.com",
    phone: "9988776655",
    eventId: 3,
    eventName: "Web Development Workshop",
    status: "Confirmed",
    registeredAt: "2026-08-13",
  },

  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "9000012345",
    eventId: 2,
    eventName: "Hackathon 2026",
    status: "Cancelled",
    registeredAt: "2026-08-09",
  },
];