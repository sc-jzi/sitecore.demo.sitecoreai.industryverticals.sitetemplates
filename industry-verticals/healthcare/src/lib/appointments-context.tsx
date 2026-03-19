'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Appointment } from './types'
import { mockAppointments, mockDonationStats } from './mock-data'
import { useAuth } from './auth-context'

interface AppointmentsContextType {
  appointments: Appointment[]
  upcomingAppointments: Appointment[]
  pastAppointments: Appointment[]
  nextAppointment: Appointment | undefined
  createAppointment: (data: CreateAppointmentData) => Promise<{ success: boolean; appointment?: Appointment; error?: string }>
  rescheduleAppointment: (appointmentId: string, newDate: string, newTime: string) => Promise<{ success: boolean; error?: string }>
  cancelAppointment: (appointmentId: string) => Promise<{ success: boolean; error?: string }>
  refreshAppointments: () => void
}

interface CreateAppointmentData {
  type: 'blood' | 'plasma'
  date: string
  time: string
  locationId: string
  locationName: string
  locationAddress: string
  locationCity: string
  locationProvince: string
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined)

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)

  const getUserAppointments = useCallback(() => {
    if (!user) return []
    return appointments.filter(a => a.userId === user.id)
  }, [appointments, user])

  const upcomingAppointments = useCallback(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return getUserAppointments()
      .filter(a => new Date(a.date) >= now && a.status === 'scheduled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [getUserAppointments])

  const pastAppointments = useCallback(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return getUserAppointments()
      .filter(a => new Date(a.date) < now || a.status !== 'scheduled')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [getUserAppointments])

  const createAppointment = useCallback(async (data: CreateAppointmentData): Promise<{ success: boolean; appointment?: Appointment; error?: string }> => {
    if (!user) {
      return { success: false, error: 'You must be logged in to create an appointment' }
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      userId: user.id,
      type: data.type,
      date: data.date,
      time: data.time,
      location: {
        id: data.locationId,
        name: data.locationName,
        address: data.locationAddress,
        city: data.locationCity,
        province: data.locationProvince,
      },
      status: 'scheduled',
      createdAt: new Date().toISOString().split('T')[0],
    }

    setAppointments(prev => [...prev, newAppointment])
    mockAppointments.push(newAppointment)

    return { success: true, appointment: newAppointment }
  }, [user])

  const rescheduleAppointment = useCallback(async (appointmentId: string, newDate: string, newTime: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'You must be logged in to reschedule an appointment' }
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, date: newDate, time: newTime, status: 'scheduled' as const }
          : apt
      )
    )

    // Update mock data as well
    const index = mockAppointments.findIndex(a => a.id === appointmentId)
    if (index !== -1) {
      mockAppointments[index] = {
        ...mockAppointments[index],
        date: newDate,
        time: newTime,
        status: 'scheduled',
      }
    }

    return { success: true }
  }, [user])

  const cancelAppointment = useCallback(async (appointmentId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'You must be logged in to cancel an appointment' }
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    )

    // Update mock data as well
    const index = mockAppointments.findIndex(a => a.id === appointmentId)
    if (index !== -1) {
      mockAppointments[index] = {
        ...mockAppointments[index],
        status: 'cancelled',
      }
    }

    return { success: true }
  }, [user])

  const refreshAppointments = useCallback(() => {
    setAppointments([...mockAppointments])
  }, [])

  return (
    <AppointmentsContext.Provider
      value={{
        appointments: getUserAppointments(),
        upcomingAppointments: upcomingAppointments(),
        pastAppointments: pastAppointments(),
        nextAppointment: upcomingAppointments()[0],
        createAppointment,
        rescheduleAppointment,
        cancelAppointment,
        refreshAppointments,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider')
  }
  return context
}

// Helper hook to get donation stats
export function useDonationStats() {
  const { user } = useAuth()

  if (!user) {
    return {
      totalBloodDonations: 0,
      totalPlasmaDonations: 0,
      totalBloodVolume: 0,
      totalPlasmaVolume: 0,
      lastDonationDate: null,
      nextEligibleDate: null,
    }
  }

  return mockDonationStats[user.id] || {
    totalBloodDonations: 0,
    totalPlasmaDonations: 0,
    totalBloodVolume: 0,
    totalPlasmaVolume: 0,
    lastDonationDate: null,
    nextEligibleDate: null,
  }
}
