import attendeesData from "../data/attendees.json";
import sponsorsData from "../data/sponsors.json";
import exhibitorsData from "../data/exhibitors.json";

const BASE_URL = 'http://172.20.48.69:8080';

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
  try {
    const response = await fetch(`${BASE_URL}/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scannedId, rawContent: scannedId }),
    });
    const result = await response.json();
    // Map backend result to expected frontend format
    if (result.valid && result.status === 'FOUND') {
      return {
        success: true,
        data: {
          id: result.scannedId,
          name: result.name,
          role: result.role,
          company: result.company,
          email: result.email,
          phone: result.phone,
          status: 'eligible',
          sponsorshipLevel: result.sponsorshipLevel,
          boothNumber: result.boothNumber,
          registrationDate: result.registrationDate,
        },
      };
    } else {
      return {
        success: false,
        data: {
          id: result.scannedId,
          name: result.name || 'Not Found',
          role: result.role,
          company: result.company || 'Not Registered',
          email: result.email,
          phone: result.phone,
          status: result.status === 'FOUND' ? 'not_eligible' : 'not_registered',
          sponsorshipLevel: result.sponsorshipLevel,
          boothNumber: result.boothNumber,
          registrationDate: result.registrationDate,
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      data: {
        id: scannedId,
        name: 'Not Found',
        role: 'Unknown',
        company: 'Not Registered',
        status: 'not_registered',
      },
    };
  }
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
