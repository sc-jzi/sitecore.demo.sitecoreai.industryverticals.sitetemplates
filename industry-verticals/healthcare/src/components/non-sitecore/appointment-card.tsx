'use client'

import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/shadcn/components/ui/card'
import { Button } from '@/shadcn/components/ui/button'
import { Badge } from '@/shadcn/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Appointment } from '@/lib/types'
import { Calendar, Clock, MapPin, Droplets } from 'lucide-react'

interface AppointmentCardProps {
  appointment: Appointment
  variant?: 'default' | 'compact' | 'featured'
  showActions?: boolean
  onReschedule?: (appointment: Appointment) => void
  onCancel?: (appointment: Appointment) => void
  className?: string
}

export function AppointmentCard({
  appointment,
  variant = 'default',
  showActions = false,
  onReschedule,
  onCancel,
  className
}: AppointmentCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default">Scheduled</Badge>
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      case 'rescheduled':
        return <Badge variant="outline">Rescheduled</Badge>
      default:
        return null
    }
  }

  const getDonationTypeBadge = (type: Appointment['type']) => {
    return (
      <Badge
        variant="outline"
        className={cn(
          type === 'blood'
            ? 'border-red-200 bg-red-50 text-red-700'
            : 'border-amber-200 bg-amber-50 text-amber-700'
        )}
      >
        <Droplets className="mr-1 h-3 w-3" />
        {type === 'blood' ? 'Blood Donation' : 'Plasma Donation'}
      </Badge>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center justify-between py-3 border-b last:border-b-0', className)}>
        <div className="flex items-center gap-3">
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            appointment.type === 'blood' ? 'bg-red-100' : 'bg-amber-100'
          )}>
            <Droplets className={cn(
              'h-5 w-5',
              appointment.type === 'blood' ? 'text-red-600' : 'text-amber-600'
            )} />
          </div>
          <div>
            <p className="font-medium text-sm">
              {appointment.type === 'blood' ? 'Blood' : 'Plasma'} Donation
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(appointment.date)} at {appointment.time}
            </p>
          </div>
        </div>
        {getStatusBadge(appointment.status)}
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <Card className={cn('border-2 border-primary/20 bg-primary/5', className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Your Next Appointment</CardTitle>
            {getDonationTypeBadge(appointment.type)}
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{appointment.location.name}</p>
                <p className="text-sm text-muted-foreground">
                  {appointment.location.address}, {appointment.location.city}, {appointment.location.province}
                </p>
              </div>
            </div>
          </div>

          {showActions && appointment.status === 'scheduled' && (
            <div className="flex gap-2 pt-2">
              {onReschedule && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReschedule(appointment)}
                >
                  Reschedule
                </Button>
              )}
              {onCancel && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onCancel(appointment)}
                >
                  Cancel
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {getDonationTypeBadge(appointment.type)}
            {getStatusBadge(appointment.status)}
          </div>
        </div>
        <CardAction>
          {showActions && appointment.status === 'scheduled' && (
            <div className="flex gap-2">
              {onReschedule && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReschedule(appointment)}
                >
                  Reschedule
                </Button>
              )}
              {onCancel && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onCancel(appointment)}
                >
                  Cancel
                </Button>
              )}
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{formatDate(appointment.date)}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">{appointment.location.name}</p>
            <p className="text-xs text-muted-foreground">
              {appointment.location.address}, {appointment.location.city}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
