'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react'
import { useSession } from 'next-auth/react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartsProps {
  charts: {
    monthlyData: Array<{ month: string; total: number; count: number }>
    contributionTypes: Array<{ type: string; total: number; count: number }>
    genderDistribution: Array<{ gender: string; count: number }>
  }
}

const typeLabels: Record<string, string> = {
  MONTHLY: 'Mensuelle',
  ANNUAL: 'Annuelle',
  SPECIAL: 'Spéciale',
  OTHER: 'Autre',
}

const typeColors: Record<string, string> = {
  MONTHLY: '#18a058',
  ANNUAL: '#2563eb',
  SPECIAL: '#f97316',
  OTHER: '#8b5cf6',
}

export default function DashboardCharts({ charts }: ChartsProps) {
  const { data: session } = useSession();

  // Line Chart - Évolution des cotisations
  const lineData = {
    labels: charts.monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Cotisations (Fc)',
        data: charts.monthlyData.map(d => d.total),
        borderColor: '#18a058',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, 'rgba(24, 160, 88, 0.2)')
          gradient.addColorStop(1, 'rgba(24, 160, 88, 0)')
          return gradient
        },
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#18a058',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#171c20',
        bodyColor: '#171c20',
        borderColor: '#e3edf6',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return context.parsed.y + ' $'
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return value + ' Fc'
          },
        },
        border: { display: false },
        grid: {
          color: '#e3edf6',
          drawTicks: false,
        },
      },
      x: {
        border: { display: false },
        grid: { display: false },
      },
    },
  }

  // Doughnut Chart - Répartition par type
  const doughnutData = {
    labels: charts.contributionTypes.map(d => typeLabels[d.type] || d.type),
    datasets: [
      {
        data: charts.contributionTypes.map(d => d.total),
        backgroundColor: charts.contributionTypes.map(d => typeColors[d.type] || '#6f797d'),
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  }

  // Bar Chart - Répartition par genre
  const barData = {
    labels: charts.genderDistribution.map(d => d.gender),
    datasets: [
      {
        data: charts.genderDistribution.map(d => d.count),
        backgroundColor: ['#18a058', '#2563eb'],
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        border: { display: false },
        grid: {
          color: '#e3edf6',
          drawTicks: false,
        },
      },
      x: {
        border: { display: false },
        grid: { display: false },
      },
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      {/* Line Chart */}
      <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <h3 className="text-headline-md text-on-surface">Évolution des cotisations</h3>
          </div>
          <select className="bg-surface-container border border-outline-variant/60 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>6 derniers mois</option>
            <option>12 derniers mois</option>
          </select>
        </div>
        <div className="h-56 md:h-64 w-full relative">
          <Line data={lineData} options={lineOptions as any} />
        </div>
      </div>

      {
        session?.user?.role!=="MEMBER" &&
        <>
          {/* Doughnut Chart */}
          <div className="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/20">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <PieChart className="w-5 h-5 text-secondary" />
              <h3 className="text-headline-md text-on-surface">Répartition par type</h3>
            </div>
            <div className="h-48 md:h-56 w-full relative">
              <Doughnut data={doughnutData} options={doughnutOptions as any} />
            </div>
          </div>

          {/* Bar Chart - Genre */}
          <div className="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/20 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <BarChart3 className="w-5 h-5 text-secondary" />
              <h3 className="text-headline-md text-on-surface">Répartition par genre</h3>
            </div>
            <div className="h-48 md:h-56 w-full relative">
              <Bar data={barData} options={barOptions as any} />
            </div>
          </div>
        </>
      }
    </div>
  )
}