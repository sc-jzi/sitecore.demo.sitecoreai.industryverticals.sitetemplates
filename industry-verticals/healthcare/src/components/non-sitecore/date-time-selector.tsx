'use client'

import { useMemo } from 'react'
import { Calendar } from '@/shadcn/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { Button } from '@/shadcn/components/ui/button'
import { cn } from '@/lib/utils'
import type { DonationLocation } from '@/lib/types'
import { Clock, Check } from 'lucide-react'

interface DateTimeSelectorProps {
  location: DonationLocation
  selectedDate: Date | undefined
  selectedTime: string | undefined
  onSelectDate: (date: Date | undefined) => void
  onSelectTime: (time: string | undefined) => void
  className?: string
}

export function DateTimeSelector({
  location,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  className,
}: DateTimeSelectorProps) {

  // Get available times for selected date
  const availableTimes = useMemo(() => {
    if (!selectedDate) return []

    const dateStr = selectedDate.toISOString().split('T')[0]
    const slot = location.availableSlots.find(s => s.date === dateStr)
    return slot?.times || []
  }, [location, selectedDate])

  // Disable dates that don't have available slots
  const isDateDisabled = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return !location.availableSlots.some(slot => slot.date === dateStr)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-CA', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className={cn('grid gap-6 lg:grid-cols-2', className)}>
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onSelectDate(date)
              onSelectTime(undefined) // Reset time when date changes
            }}
            disabled={isDateDisabled}
            fromDate={new Date()}
            className="rounded-md border"
          />
          {selectedDate && (
            <p className="mt-3 text-sm text-muted-foreground">
              Selected: {formatDate(selectedDate)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Time slots */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Select Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedDate ? (
            <div className="text-center py-8 text-muted-foreground">
              Please select a date first
            </div>
          ) : availableTimes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No available times for this date
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  className={cn(
                    'justify-start',
                    selectedTime === time && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => onSelectTime(time)}
                >
                  {selectedTime === time && (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  {time}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
