'use client'

import { useState, JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppointments } from '@/lib/appointments-context'
import { LocationSelector } from '../non-sitecore/location-selector'
import { DateTimeSelector } from '../non-sitecore/date-time-selector'
import { Button } from '@/shadcn/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/shadcn/components/ui/radio-group'
import { Label } from '@/shadcn/components/ui/label'
import { Badge } from '@/shadcn/components/ui/badge'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { Alert, AlertDescription } from '@/shadcn/components/ui/alert'
import type { DonationLocation } from '@/lib/types'
import { ArrowLeft, ArrowRight, Check, Droplets, Calendar, MapPin, Clock, AlertCircle } from 'lucide-react'

type DonationType = 'blood' | 'plasma'
type Step = 'type' | 'location' | 'datetime' | 'confirm'

export const NewAppointment = (): JSX.Element => {
  const router = useRouter()
  const { createAppointment } = useAppointments()

  const [step, setStep] = useState<Step>('type')
  const [donationType, setDonationType] = useState<DonationType | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<DonationLocation | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const steps: { id: Step; label: string }[] = [
    { id: 'type', label: 'Donation Type' },
    { id: 'location', label: 'Location' },
    { id: 'datetime', label: 'Date & Time' },
    { id: 'confirm', label: 'Confirm' },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === step)

  const canProceed = () => {
    switch (step) {
      case 'type':
        return donationType !== null
      case 'location':
        return selectedLocation !== null
      case 'datetime':
        return selectedDate !== undefined && selectedTime !== undefined
      case 'confirm':
        return true
      default:
        return false
    }
  }

  const goNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].id)
    }
  }

  const goBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].id)
    }
  }

  const handleSubmit = async () => {
    if (!donationType || !selectedLocation || !selectedDate || !selectedTime) {
      return
    }

    setIsSubmitting(true)
    setError('')

    const result = await createAppointment({
      type: donationType,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      locationAddress: selectedLocation.address,
      locationCity: selectedLocation.city,
      locationProvince: selectedLocation.province,
    })

    setIsSubmitting(false)

    if (result.success) {
      router.push('/portal/appointments')
    } else {
      setError(result.error || 'Failed to create appointment')
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/portal/appointments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Appointments
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Book New Appointment</h1>
        <p className="text-muted-foreground">
          Schedule your next blood or plasma donation.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium ${index < currentStepIndex
                    ? 'border-primary bg-primary text-primary-foreground'
                    : index === currentStepIndex
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground'
                    }`}
                >
                  {index < currentStepIndex ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="mt-1 text-xs text-muted-foreground hidden sm:block">
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 sm:w-16 lg:w-24 ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        {/* Step 1: Donation Type */}
        {step === 'type' && (
          <>
            <CardHeader>
              <CardTitle>Select Donation Type</CardTitle>
              <CardDescription>
                Choose the type of donation you would like to make.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={donationType || ''}
                onValueChange={(v) => setDonationType(v as DonationType)}
                className="grid gap-4 sm:grid-cols-2"
              >
                <Label
                  htmlFor="blood"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="blood" id="blood" className="sr-only" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-3">
                    <Droplets className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Whole Blood</p>
                    <p className="text-sm text-muted-foreground">
                      Takes about 10-15 minutes
                    </p>
                  </div>
                </Label>

                <Label
                  htmlFor="plasma"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="plasma" id="plasma" className="sr-only" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-3">
                    <Droplets className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Plasma</p>
                    <p className="text-sm text-muted-foreground">
                      Takes about 45-60 minutes
                    </p>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </>
        )}

        {/* Step 2: Location */}
        {step === 'location' && (
          <>
            <CardHeader>
              <CardTitle>Select Location</CardTitle>
              <CardDescription>
                Choose a donation centre near you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LocationSelector
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
              />
            </CardContent>
          </>
        )}

        {/* Step 3: Date & Time */}
        {step === 'datetime' && selectedLocation && (
          <>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>
                Choose when you would like to visit {selectedLocation.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DateTimeSelector
                location={selectedLocation}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectDate={setSelectedDate}
                onSelectTime={setSelectedTime}
              />
            </CardContent>
          </>
        )}

        {/* Step 4: Confirm */}
        {step === 'confirm' && donationType && selectedLocation && selectedDate && selectedTime && (
          <>
            <CardHeader>
              <CardTitle>Confirm Your Appointment</CardTitle>
              <CardDescription>
                Please review your appointment details before confirming.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="rounded-lg border p-4 grid gap-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${donationType === 'blood' ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                    <Droplets className={`h-5 w-5 ${donationType === 'blood' ? 'text-red-600' : 'text-amber-600'
                      }`} />
                  </div>
                  <div>
                    <p className="font-medium">
                      {donationType === 'blood' ? 'Whole Blood' : 'Plasma'} Donation
                    </p>
                    <Badge variant="outline">
                      {donationType === 'blood' ? '10-15 min' : '45-60 min'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{formatDate(selectedDate)}</p>
                    <p className="text-sm text-muted-foreground">Date</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedTime}</p>
                    <p className="text-sm text-muted-foreground">Time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedLocation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.province}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                By confirming this appointment, you agree to arrive on time and follow all donation guidelines.
                You can reschedule or cancel this appointment up to 24 hours before the scheduled time.
              </p>
            </CardContent>
          </>
        )}

        {/* Navigation */}
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {step === 'confirm' ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Booking...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm Appointment
                </>
              )}
            </Button>
          ) : (
            <Button onClick={goNext} disabled={!canProceed()}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export const Default = NewAppointment;