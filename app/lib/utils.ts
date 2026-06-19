import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAgentId(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const count = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `UY/AG/${year}${month}/${count}`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function generateMemberId(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const count = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `UY/ME/${year}${month}/${count}`
}

export function getDiplomaLabel(level: string): string {
  const labels: Record<string, string> = {
    STATE_DIPLOMA: 'Diplôme d\'État',
    GRADUATE: 'Graduât',
    LICENSE: 'Licence',
    MASTER: 'Master',
    DOCTORATE: 'Doctorat'
  }
  return labels[level] || level
}

export function getGenderLabel(gender: string): string {
  const labels: Record<string, string> = {
    MALE: 'Masculin',
    FEMALE: 'Féminin'
  }
  return labels[gender] || gender
}

export function getMaritalStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    MARRIED: 'Marié(e)',
    SINGLE: 'Célibataire',
    WIDOWED: 'Veuf/Veuve',
    DIVORCED: 'Divorcé(e)'
  }
  return labels[status] || status
}