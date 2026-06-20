'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import DashboardStats from '@/components/dashboard/DashboardStats'
import DashboardCharts from '@/components/dashboard/DashboardCharts'
import RecentActivities from '@/components/dashboard/RecentActivities'

export default function DashboardPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    // const session = useSession()
    // if (!session) {
    //   router.push('/login')
    //   return
    // }
    // setUser(session)
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard/stats')
      if (response.data.success) {
        setDashboardData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 bg-white border border-outline-variant/60 px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium text-on-surface hover:bg-surface-container transition-colors shadow-sm">
          <span>01 mai 2024 - 31 mai 2024</span>
          <span className="material-icons-outlined text-base text-on-surface-variant">calendar_today</span>
        </button>
      </div>

      {dashboardData && (
        <>
          <DashboardStats stats={dashboardData.stats} />
          <DashboardCharts charts={dashboardData.charts} />
          <RecentActivities 
            members={dashboardData.recent.members}
            contributions={dashboardData.recent.contributions}
            userRole={user?.role}
          />
        </>
      )}
    </>
  )
}