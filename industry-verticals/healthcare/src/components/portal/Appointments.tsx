'use client'

import { useState, JSX } from 'react'
import Link from 'next/link'
import { useAppointments } from '@/lib/appointments-context'
import { AppointmentCard } from '../non-sitecore/appointment-card'
import { EmptyState } from '../non-sitecore/empty-state'
import { Button } from '@/shadcn/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn/components/ui/alert-dialog'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { DateTimeSelector } from '../non-sitecore/date-time-selector'
import type { Appointment } from '@/lib/types'
import { getLocationById } from '@/lib/mock-data'
import { Plus, Calendar, History } from 'lucide-react'

export const Appointments = (): JSX.Element => {
  const {
    upcomingAppointments,
    pastAppointments,
    rescheduleAppointment,
    cancelAppointment
  } = useAppointments()

  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setRescheduleDialogOpen(true)
  }

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setCancelDialogOpen(true)
  }

  const confirmReschedule = async () => {
    if (!selectedAppointment || !selectedDate || !selectedTime) return

    setIsSubmitting(true)
    const dateStr = selectedDate.toISOString().split('T')[0]
    await rescheduleAppointment(selectedAppointment.id, dateStr, selectedTime)
    setIsSubmitting(false)
    setRescheduleDialogOpen(false)
    setSelectedAppointment(null)
  }

  const confirmCancel = async () => {
    if (!selectedAppointment) return

    setIsSubmitting(true)
    await cancelAppointment(selectedAppointment.id)
    setIsSubmitting(false)
    setCancelDialogOpen(false)
    setSelectedAppointment(null)
  }

  const selectedLocation = selectedAppointment
    ? getLocationById(selectedAppointment.location.id)
    : null

  return (
    <div className="grid gap-6 w-full px-5">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your donation appointments.
          </p>
        </div>
        <Button asChild>
          <Link href="/portal/appointments/new">
            <Plus className="mr-2 h-4 w-4" />
            Book Appointment
          </Link>
        </Button>
      </div>

      {/* Tabs for upcoming/past */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming" className="gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            <History className="h-4 w-4" />
            Past ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingAppointments.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No Upcoming Appointments"
              description="You don't have any scheduled appointments. Book one to continue your donation journey."
              action={{
                label: 'Book Appointment',
                href: '/portal/appointments/new',
              }}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  showActions
                  onReschedule={handleReschedule}
                  onCancel={handleCancelClick}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastAppointments.length === 0 ? (
            <EmptyState
              icon={History}
              title="No Past Appointments"
              description="Your donation history will appear here once you complete your first appointment."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time for your appointment at {selectedAppointment?.location.name}.
            </DialogDescription>
          </DialogHeader>

          {selectedLocation && (
            <DateTimeSelector
              location={selectedLocation}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={setSelectedDate}
              onSelectTime={setSelectedTime}
            />
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmReschedule}
              disabled={!selectedDate || !selectedTime || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Rescheduling...
                </>
              ) : (
                'Confirm Reschedule'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your appointment on{' '}
              {selectedAppointment && new Date(selectedAppointment.date).toLocaleDateString('en-CA', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}{' '}
              at {selectedAppointment?.time}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Cancelling...
                </>
              ) : (
                'Cancel Appointment'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export const Default = Appointments;