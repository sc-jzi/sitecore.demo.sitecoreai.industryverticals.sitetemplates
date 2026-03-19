export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  bloodType: string
  dateOfBirth: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
  }
}

export interface DonationStats {
  totalBloodDonations: number
  totalPlasmaDonations: number
  totalBloodVolume: number // in mL
  totalPlasmaVolume: number // in mL
  lastDonationDate: string | null
  nextEligibleDate: string | null
}

export interface Appointment {
  id: string
  userId: string
  type: 'blood' | 'plasma'
  date: string
  time: string
  location: {
    id: string
    name: string
    address: string
    city: string
    province: string
  }
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  createdAt: string
}

export interface DonationLocation {
  id: string
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  availableSlots: {
    date: string
    times: string[]
  }[]
}
