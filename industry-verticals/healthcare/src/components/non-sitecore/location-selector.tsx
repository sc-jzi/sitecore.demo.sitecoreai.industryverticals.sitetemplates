'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/shadcn/components/ui/card'
import { Input } from '@/shadcn/components/ui/input'
import { Badge } from '@/shadcn/components/ui/badge'
import { cn } from '@/lib/utils'
import { getAllLocations } from '@/lib/mock-data'
import type { DonationLocation } from '@/lib/types'
import { MapPin, Phone, Search, Check } from 'lucide-react'

interface LocationSelectorProps {
  selectedLocation: DonationLocation | null
  onSelectLocation: (location: DonationLocation) => void
  className?: string
}

export function LocationSelector({
  selectedLocation,
  onSelectLocation,
  className
}: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const locations = getAllLocations()

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations

    const query = searchQuery.toLowerCase()
    return locations.filter(
      loc =>
        loc.name.toLowerCase().includes(query) ||
        loc.city.toLowerCase().includes(query) ||
        loc.province.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query)
    )
  }, [locations, searchQuery])

  // Group locations by province
  const locationsByProvince = useMemo(() => {
    const grouped = filteredLocations.reduce((acc, loc) => {
      if (!acc[loc.province]) {
        acc[loc.province] = []
      }
      acc[loc.province].push(loc)
      return acc
    }, {} as Record<string, DonationLocation[]>)

    // Sort provinces alphabetically
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
  }, [filteredLocations])

  return (
    <div className={cn('grid gap-4', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by city, province, or location name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2">
        {locationsByProvince.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No locations found matching your search.
          </div>
        ) : (
          locationsByProvince.map(([province, locs]) => (
            <div key={province} className="grid gap-2">
              <h3 className="font-semibold text-sm text-muted-foreground sticky top-0 bg-background py-1">
                {province}
              </h3>
              <div className="grid gap-2">
                {locs.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    isSelected={selectedLocation?.id === location.id}
                    onSelect={() => onSelectLocation(location)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

interface LocationCardProps {
  location: DonationLocation
  isSelected: boolean
  onSelect: () => void
}

function LocationCard({ location, isSelected, onSelect }: LocationCardProps) {
  const availableSlotsCount = location.availableSlots.reduce(
    (sum, slot) => sum + slot.times.length,
    0
  )

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md',
        isSelected && 'border-primary ring-2 ring-primary/20'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">{location.name}</h4>
              {isSelected && (
                <Badge variant="default" className="h-5">
                  <Check className="h-3 w-3 mr-1" />
                  Selected
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{location.address}, {location.city}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>{location.phone}</span>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {availableSlotsCount} slots
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
