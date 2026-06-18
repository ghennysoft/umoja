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
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export default function CotisationsChart() {
  const chartRef = useRef<ChartJS>(null)

  const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Cotisations perçues ($)',
        data: [1200, 1900, 1500, 2200, 2800, 2400, 3100, 2900, 3500, 4100, 3800, 4500],
        borderColor: '#006d38',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(0, 168, 89, 0.2)')
          gradient.addColorStop(1, 'rgba(0, 168, 89, 0)')
          return gradient
        },
        borderWidth: 2,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#006d38',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#293138',
        padding: 12,
        titleFont: { family: 'Plus Jakarta Sans', size: 14 },
        bodyFont: { family: 'Plus Jakarta Sans', size: 14 },
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e9f2',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 12 },
          color: '#707973',
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 12 },
          color: '#707973',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  return (
    <div className="lg:col-span-2 card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h3 className="text-headline-md text-on-surface">Tendance des cotisations</h3>
        <select className="bg-surface-container border-none text-body-md rounded-lg py-1 px-3 focus:ring-0 cursor-pointer w-full sm:w-auto">
          <option>Cette année</option>
          <option>Les 6 derniers mois</option>
          <option>Ce mois</option>
        </select>
      </div>
      <div className="h-60 md:h-72 w-full relative">
        <Line ref={chartRef} data={data} options={options as any} />
      </div>
    </div>
  )
}