'use client'
import { JSX } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useAppointments } from '@/lib/appointments-context'
import { DonationStats } from '../non-sitecore/donation-stats'
import { AppointmentCard } from '../non-sitecore/appointment-card'
import { EmptyState } from '../non-sitecore/empty-state'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/shadcn/components/ui/card'
import { Button } from '@/shadcn/components/ui/button'
import { Badge } from '@/shadcn/components/ui/badge'
import { Calendar, Plus, ArrowRight, User, Droplets } from 'lucide-react'

export const Dashboard = (): JSX.Element => {
  const { user } = useAuth()
  const { nextAppointment, upcomingAppointments } = useAppointments()

  return (
    <div className="grid gap-6 w-full px-5">
      {/* Welcome section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-muted-foreground">
            Thank you for being a blood donor. Your contributions save lives.
          </p>
        </div>
        <Button asChild>
          <Link href="/portal/appointments/new">
            <Plus className="mr-2 h-4 w-4" />
            Book Appointment
          </Link>
        </Button>
      </div>

      {/* Quick info card */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="font-medium">
                    <Droplets className="mr-1 h-3 w-3" />
                    {user?.bloodType}
                  </Badge>
                  <span>{user?.address.city}, {user?.address.province}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next appointment */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {nextAppointment ? (
            <AppointmentCard
              appointment={nextAppointment}
              variant="featured"
              showActions
            />
          ) : (
            <Card>
              <CardContent className="p-6">
                <EmptyState
                  icon={Calendar}
                  title="No Upcoming Appointments"
                  description="You don't have any appointments scheduled. Book one to continue your donation journey."
                  action={{
                    label: 'Book Appointment',
                    href: '/portal/appointments/new',
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming appointments summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Appointments</CardTitle>
            <CardDescription>
              {upcomingAppointments.length} appointment{upcomingAppointments.length !== 1 ? 's' : ''} scheduled
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/portal/appointments">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No upcoming appointments
              </p>
            ) : (
              <div className="divide-y">
                {upcomingAppointments.slice(0, 3).map((apt) => (
                  <AppointmentCard
                    key={apt.id}
                    appointment={apt}
                    variant="compact"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Donation stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Donation Impact</h2>
        <DonationStats />
      </div>
    </div>
  )
}

export const Default = Dashboard;