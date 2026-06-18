'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  DoughnutController,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  DoughnutController
)

export default function ChartsSection() {
  const chartRef = useRef<ChartJS>(null)

  // Line Chart Data
  const lineData = {
    labels: ['01 Mai', '07 Mai', '14 Mai', '21 Mai', '28 Mai', '31 Mai'],
    datasets: [
      {
        label: 'Cotisations',
        data: [500, 1500, 1500, 4000, 7000, 8450],
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
        max: 10000,
        ticks: {
          callback: function (value: any) {
            if (value === 0) return '0'
            return value / 1000 + 'K'
          },
          stepSize: 2000,
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

  // Doughnut Chart Data
  const doughnutData = {
    labels: ['Hommes', 'Femmes', 'Jeunes'],
    datasets: [
      {
        data: [50, 38, 12],
        backgroundColor: ['#18a058', '#2563eb', '#f97316'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return ' ' + context.label + ': ' + context.parsed + '%'
          },
        },
      },
    },
  }

  // Plugin pour afficher le texte au centre du doughnut
  const textCenter = {
    id: 'textCenter',
    beforeDraw: function (chart: any) {
      const { width, height, ctx } = chart
      ctx.save()
      const fontSize = (height / 114).toFixed(2)
      ctx.font = 'bold ' + fontSize + 'em sans-serif'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#171c20'
      const text = '256'
      const textX = Math.round((width - ctx.measureText(text).width) / 2)
      const textY = height / 2 - 10
      ctx.fillText(text, textX, textY)

      ctx.font = 'normal ' + fontSize * 0.4 + 'em sans-serif'
      ctx.fillStyle = '#6f797d'
      const text2 = 'Total'
      const text2X = Math.round((width - ctx.measureText(text2).width) / 2)
      const text2Y = height / 2 + 15
      ctx.fillText(text2, text2X, text2Y)
      ctx.restore()
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      {/* Line Chart */}
      <div className="lg:col-span-2 card p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
          <h3 className="text-base md:text-lg font-bold text-on-surface">Vue d'ensemble des cotisations</h3>
          <select className="bg-surface border border-outline-variant/60 text-sm rounded-lg px-3 py-1.5 focus:ring-primary focus:border-primary outline-none w-full sm:w-auto">
            <option>Ce mois</option>
            <option>Le mois dernier</option>
            <option>Cette année</option>
          </select>
        </div>
        <div className="h-48 md:h-64 relative w-full">
          <Line data={lineData} options={lineOptions as any} />
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="card p-4 md:p-6 flex flex-col">
        <h3 className="text-base md:text-lg font-bold text-on-surface mb-4 md:mb-6">Répartition des membres</h3>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="h-40 md:h-48 w-full relative">
            <Doughnut data={doughnutData} options={doughnutOptions as any} plugins={[textCenter]} />
          </div>
          {/* Custom Legend */}
          <div className="mt-4 md:mt-6 w-full flex flex-col gap-2 px-2 md:px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="text-xs md:text-sm font-medium">Hommes</span>
              </div>
              <span className="text-xs md:text-sm text-on-surface-variant">128 (50%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue"></span>
                <span className="text-xs md:text-sm font-medium">Femmes</span>
              </div>
              <span className="text-xs md:text-sm text-on-surface-variant">98 (38%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange"></span>
                <span className="text-xs md:text-sm font-medium">Jeunes</span>
              </div>
              <span className="text-xs md:text-sm text-on-surface-variant">30 (12%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}