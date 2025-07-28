import { create } from "zustand";

const useScanStore = create((set, get) => ({
  // Scanned people data
  scannedPeople: [],

  // Add a new scanned person
  addScannedPerson: (person) => {
    const timestamp = new Date().toISOString();
    const newPerson = {
      ...person,
      scannedAt: timestamp,
      id: `${person.id}_${Date.now()}`,
    };

    set((state) => ({
      scannedPeople: [newPerson, ...state.scannedPeople],
    }));
  },

  // Get statistics
  getStats: () => {
    const { scannedPeople } = get();
    const total = scannedPeople.length;
    const valid = scannedPeople.filter((p) => p.status === "eligible").length;
    const attendees = scannedPeople.filter((p) => p.role === "Attendee").length;
    const sponsors = scannedPeople.filter((p) => p.role === "Sponsor").length;
    const exhibitors = scannedPeople.filter(
      (p) => p.role === "Exhibitor"
    ).length;

    return {
      total,
      valid,
      invalid: total - valid,
      attendees,
      sponsors,
      exhibitors,
      eligibilityPercentage: total > 0 ? Math.round((valid / total) * 100) : 0,
    };
  },

  // Clear all data (for testing)
  clearData: () => {
    set({ scannedPeople: [] });
  },
}));

export default useScanStore;
