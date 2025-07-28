import attendeesData from "../data/attendees.json";
import sponsorsData from "../data/sponsors.json";
import exhibitorsData from "../data/exhibitors.json";

// Simulate API delay
const simulateApiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

// Combine all data
const allData = [...attendeesData, ...sponsorsData, ...exhibitorsData];

// Create a map for faster lookups
const dataMap = new Map();
allData.forEach((person) => {
  dataMap.set(person.id, person);
});

export const lookupPerson = async (scannedId) => {
  // Simulate API delay
  await simulateApiDelay();

  // Try to find the person by ID
  const person = dataMap.get(scannedId);

  if (person) {
    return {
      success: true,
      data: person,
    };
  }

  // If not found, return not registered
  return {
    success: false,
    data: {
      id: scannedId,
      name: "Not Found",
      role: "Unknown",
      company: "Not Registered",
      status: "not_registered",
    },
  };
};

export const getAllData = () => {
  return allData;
};

export const getDataByRole = (role) => {
  switch (role) {
    case "Attendee":
      return attendeesData;
    case "Sponsor":
      return sponsorsData;
    case "Exhibitor":
      return exhibitorsData;
    default:
      return [];
  }
};
