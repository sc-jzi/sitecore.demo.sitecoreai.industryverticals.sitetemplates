'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shadcn/components/ui/card'
import { Progress } from '@/shadcn/components/ui/progress'
import { useDonationStats } from '@/lib/appointments-context'
import { Droplets, Heart, Activity, Trophy } from 'lucide-react'

export function DonationStats() {
  const stats = useDonationStats()

  const totalDonations = stats.totalBloodDonations + stats.totalPlasmaDonations
  const totalVolume = stats.totalBloodVolume + stats.totalPlasmaVolume

  // Milestone tracking (lives saved estimate: ~3 per whole blood, ~18 per plasma)
  const livesSaved = (stats.totalBloodDonations * 3) + (stats.totalPlasmaDonations * 18)

  // Next milestone
  const milestones = [10, 25, 50, 100, 150, 200]
  const nextMilestone = milestones.find(m => m > totalDonations) || totalDonations + 50
  const progressToMilestone = (totalDonations / nextMilestone) * 100

  const formatVolume = (ml: number) => {
    if (ml >= 1000) {
      return `${(ml / 1000).toFixed(1)}L`
    }
    return `${ml}mL`
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="grid gap-4">
      {/* Main stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Blood Donations
            </CardTitle>
            <Droplets className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBloodDonations}</div>
            <p className="text-xs text-muted-foreground">
              {formatVolume(stats.totalBloodVolume)} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Plasma Donations
            </CardTitle>
            <Activity className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlasmaDonations}</div>
            <p className="text-xs text-muted-foreground">
              {formatVolume(stats.totalPlasmaVolume)} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lives Impacted
            </CardTitle>
            <Heart className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~{livesSaved}</div>
            <p className="text-xs text-muted-foreground">
              Thank you for your generosity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Donations
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonations}</div>
            <p className="text-xs text-muted-foreground">
              {formatVolume(totalVolume)} donated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Milestone progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Donation Milestone</CardTitle>
          <CardDescription>
            {totalDonations} of {nextMilestone} donations to your next milestone
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Progress value={progressToMilestone} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Last donation: {formatDate(stats.lastDonationDate)}
            </span>
            <span className="text-muted-foreground">
              Eligible again: {formatDate(stats.nextEligibleDate)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
