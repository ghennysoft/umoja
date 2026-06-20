'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { UserPlus, Mail, Lock, User, Shield, UserCog, Users } from 'lucide-react'
import SideNavbar from '@/components/common/SideNavbar'
import TopAppBar from '@/components/common/TopAppBar'
import Footer from '@/components/common/Footer'

export default function NewUserPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!formData.password) newErrors.password = 'Le mot de passe est requis'
    if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/auth/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      if (response.data.success) {
        router.push('/users')
      }
    } catch (error: any) {
      console.error('Error creating user:', error)
      const message = error.response?.data?.message || 'Erreur lors de la création'
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}/
      <div className="mb-8">
        <h1 className="text-headline-lg font-bold text-on-surface flex items-center gap-2">
          <UserPlus className="w-6 h-6" />
          Ajouter un utilisateur
        </h1>
        <p className="text-body-md text-on-surface-variant">Créez un nouvel utilisateur avec des permissions spécifiques</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Nom complet <span className="text-error">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.name ? 'border-error' : 'border-outline-variant'}`}
              placeholder="Jean Dupont"
            />
          </div>
          {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Email <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.email ? 'border-error' : 'border-outline-variant'}`}
              placeholder="exemple@email.com"
            />
          </div>
          {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Mot de passe <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.password ? 'border-error' : 'border-outline-variant'}`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="text-xs text-error mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Confirmer le mot de passe <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.confirmPassword ? 'border-error' : 'border-outline-variant'}`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && <p className="text-xs text-error mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Rôle <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="MEMBER">Membre</option>
              <option value="AGENT">Agent</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>
          <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-4">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> Membre: Accès limité</span>
            <span className="flex items-center gap-1"><UserCog className="w-3 h-3" /> Agent: Accès aux membres et cotisations</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Admin: Accès total</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            {isSubmitting ? 'Création...' : 'Créer l\'utilisateur'}
          </button>
        </div>
      </form>
    </div>
  )
}