import type { User, DonationStats, Appointment, DonationLocation } from './types'

// Helper to generate dates
const today = new Date()
const formatDate = (date: Date) => date.toISOString().split('T')[0]

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '(416) 555-0123',
    bloodType: 'O+',
    dateOfBirth: '1985-03-15',
    address: {
      street: '123 Maple Street',
      city: 'Toronto',
      province: 'Ontario',
      postalCode: 'M5V 2H1',
    },
  },
]

// Mock Donation Stats
export const mockDonationStats: Record<string, DonationStats> = {
  'user-1': {
    totalBloodDonations: 12,
    totalPlasmaDonations: 8,
    totalBloodVolume: 5400, // 12 * 450mL
    totalPlasmaVolume: 6400, // 8 * 800mL
    lastDonationDate: formatDate(new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000)),
    nextEligibleDate: formatDate(new Date(today.getTime() + 11 * 24 * 60 * 60 * 1000)),
  },
}

// Mock Appointments
export const mockAppointments: Appointment[] = [
  // Upcoming appointments
  {
    id: 'apt-1',
    userId: 'user-1',
    type: 'blood',
    date: formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)),
    time: '10:30 AM',
    location: {
      id: 'loc-1',
      name: 'Toronto Downtown Donor Centre',
      address: '67 College Street',
      city: 'Toronto',
      province: 'Ontario',
    },
    status: 'scheduled',
    createdAt: formatDate(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)),
  },
  {
    id: 'apt-2',
    userId: 'user-1',
    type: 'plasma',
    date: formatDate(new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000)),
    time: '2:00 PM',
    location: {
      id: 'loc-2',
      name: 'Mississauga Donor Centre',
      address: '2550 Hurontario Street',
      city: 'Mississauga',
      province: 'Ontario',
    },
    status: 'scheduled',
    createdAt: formatDate(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)),
  },
  // Past appointments
  {
    id: 'apt-3',
    userId: 'user-1',
    type: 'blood',
    date: formatDate(new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000)),
    time: '9:00 AM',
    location: {
      id: 'loc-1',
      name: 'Toronto Downtown Donor Centre',
      address: '67 College Street',
      city: 'Toronto',
      province: 'Ontario',
    },
    status: 'completed',
    createdAt: formatDate(new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000)),
  },
  {
    id: 'apt-4',
    userId: 'user-1',
    type: 'plasma',
    date: formatDate(new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)),
    time: '11:00 AM',
    location: {
      id: 'loc-3',
      name: 'Ottawa Donor Centre',
      address: '1575 Carling Avenue',
      city: 'Ottawa',
      province: 'Ontario',
    },
    status: 'completed',
    createdAt: formatDate(new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000)),
  },
  {
    id: 'apt-5',
    userId: 'user-1',
    type: 'blood',
    date: formatDate(new Date(today.getTime() - 120 * 24 * 60 * 60 * 1000)),
    time: '3:30 PM',
    location: {
      id: 'loc-1',
      name: 'Toronto Downtown Donor Centre',
      address: '67 College Street',
      city: 'Toronto',
      province: 'Ontario',
    },
    status: 'completed',
    createdAt: formatDate(new Date(today.getTime() - 130 * 24 * 60 * 60 * 1000)),
  },
  {
    id: 'apt-6',
    userId: 'user-1',
    type: 'blood',
    date: formatDate(new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000)),
    time: '1:00 PM',
    location: {
      id: 'loc-4',
      name: 'Vancouver Blood Donor Centre',
      address: '4750 Oak Street',
      city: 'Vancouver',
      province: 'British Columbia',
    },
    status: 'cancelled',
    createdAt: formatDate(new Date(today.getTime() - 75 * 24 * 60 * 60 * 1000)),
  },
]

// Mock Donation Locations across Canada
export const mockLocations: DonationLocation[] = [
  {
    id: 'loc-1',
    name: 'Toronto Downtown Donor Centre',
    address: '67 College Street',
    city: 'Toronto',
    province: 'Ontario',
    postalCode: 'M5G 1L7',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-2',
    name: 'Mississauga Donor Centre',
    address: '2550 Hurontario Street',
    city: 'Mississauga',
    province: 'Ontario',
    postalCode: 'L5B 1N5',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-3',
    name: 'Ottawa Donor Centre',
    address: '1575 Carling Avenue',
    city: 'Ottawa',
    province: 'Ontario',
    postalCode: 'K1Z 7M3',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-4',
    name: 'Vancouver Blood Donor Centre',
    address: '4750 Oak Street',
    city: 'Vancouver',
    province: 'British Columbia',
    postalCode: 'V6H 2N9',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-5',
    name: 'Calgary Blood Donor Centre',
    address: '737 13th Avenue SW',
    city: 'Calgary',
    province: 'Alberta',
    postalCode: 'T2R 1J1',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-6',
    name: 'Edmonton Blood Donor Centre',
    address: '8249 114th Street NW',
    city: 'Edmonton',
    province: 'Alberta',
    postalCode: 'T6G 2R8',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-7',
    name: 'Montreal Blood Donor Centre',
    address: '3131 Sherbrooke Street East',
    city: 'Montreal',
    province: 'Quebec',
    postalCode: 'H1W 1B2',
    phone: '1-800-847-2525',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-8',
    name: 'Winnipeg Blood Donor Centre',
    address: '777 William Avenue',
    city: 'Winnipeg',
    province: 'Manitoba',
    postalCode: 'R3E 0Z2',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-9',
    name: 'Halifax Blood Donor Centre',
    address: '7 Mellor Avenue',
    city: 'Halifax',
    province: 'Nova Scotia',
    postalCode: 'B3N 2E2',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
  {
    id: 'loc-10',
    name: 'Hamilton Blood Donor Centre',
    address: '1200 Main Street West',
    city: 'Hamilton',
    province: 'Ontario',
    postalCode: 'L8S 4J9',
    phone: '1-888-236-6283',
    availableSlots: generateAvailableSlots(),
  },
]

function generateAvailableSlots() {
  const slots = []
  const times = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  ]
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
    // Skip Sundays
    if (date.getDay() === 0) continue
    
    // Randomly select available times (simulate some being booked)
    const availableTimes = times.filter(() => Math.random() > 0.3)
    
    if (availableTimes.length > 0) {
      slots.push({
        date: formatDate(date),
        times: availableTimes,
      })
    }
  }
  
  return slots
}

// Helper functions to simulate data operations
export function getUserByEmail(email: string): User | undefined {
  return mockUsers.find(u => u.email === email)
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(u => u.id === id)
}

export function getDonationStats(userId: string): DonationStats | undefined {
  return mockDonationStats[userId]
}

export function getAppointmentsByUserId(userId: string): Appointment[] {
  return mockAppointments.filter(a => a.userId === userId)
}

export function getUpcomingAppointments(userId: string): Appointment[] {
  const now = new Date()
  return mockAppointments
    .filter(a => a.userId === userId && new Date(a.date) >= now && a.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getPastAppointments(userId: string): Appointment[] {
  const now = new Date()
  return mockAppointments
    .filter(a => a.userId === userId && (new Date(a.date) < now || a.status !== 'scheduled'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNextAppointment(userId: string): Appointment | undefined {
  return getUpcomingAppointments(userId)[0]
}

export function getLocationById(id: string): DonationLocation | undefined {
  return mockLocations.find(l => l.id === id)
}

export function getAllLocations(): DonationLocation[] {
  return mockLocations
}
