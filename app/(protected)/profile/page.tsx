// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import { getSession } from '@/lib/auth'
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Camera, 
//   Save, 
//   Lock, 
//   Key,
//   Eye,
//   EyeOff
// } from 'lucide-react'
// import SideNavbar from '@/components/dashboard/SideNavbar'
// import TopAppBar from '@/components/dashboard/TopAppBar'
// import Footer from '@/components/common/Footer'

// export default function ProfilePage() {
//   const router = useRouter()
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [user, setUser] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showNewPassword, setShowNewPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   // Form state
//   const [profileData, setProfileData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     avatar: '',
//   })

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   })

//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [successMessage, setSuccessMessage] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')

//   useEffect(() => {
//     const session = getSession()
//     if (!session) {
//       router.push('/auth/login')
//       return
//     }
//     fetchProfile()
//   }, [router])

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get('/api/profile')
//       if (response.data.success) {
//         setUser(response.data.data)
//         setProfileData({
//           name: response.data.data.name || '',
//           email: response.data.data.email || '',
//           phone: response.data.data.phone || '',
//           avatar: response.data.data.avatar || '',
//         })
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setProfileData(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setPasswordData(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const validateProfile = () => {
//     const newErrors: Record<string, string> = {}
//     if (!profileData.name.trim()) newErrors.name = 'Le nom est requis'
//     if (!profileData.email.trim()) newErrors.email = 'L\'email est requis'
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
//       newErrors.email = 'Email invalide'
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const validatePassword = () => {
//     const newErrors: Record<string, string> = {}
//     if (!passwordData.currentPassword) newErrors.currentPassword = 'Le mot de passe actuel est requis'
//     if (!passwordData.newPassword) newErrors.newPassword = 'Le nouveau mot de passe est requis'
//     if (passwordData.newPassword.length < 6) {
//       newErrors.newPassword = 'Le mot de passe doit contenir au moins 6 caractères'
//     }
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleProfileSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!validateProfile()) return

//     setSaving(true)
//     setSuccessMessage('')
//     setErrorMessage('')

//     try {
//       const response = await axios.put('/api/profile', profileData)
//       if (response.data.success) {
//         setSuccessMessage('✅ Profil mis à jour avec succès')
//         setUser(response.data.data)
//         // Mettre à jour la session
//         const session = getSession()
//         if (session) {
//           session.name = response.data.data.name
//           session.email = response.data.data.email
//         }
//       }
//     } catch (error: any) {
//       setErrorMessage(error.response?.data?.message || 'Erreur lors de la mise à jour')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handlePasswordSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!validatePassword()) return

//     setSaving(true)
//     setSuccessMessage('')
//     setErrorMessage('')

//     try {
//       const response = await axios.post('/api/profile/password', {
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//       })
//       if (response.data.success) {
//         setSuccessMessage('✅ Mot de passe mis à jour avec succès')
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: '',
//         })
//       }
//     } catch (error: any) {
//       setErrorMessage(error.response?.data?.message || 'Erreur lors de la mise à jour du mot de passe')
//     } finally {
//       setSaving(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//     <h1 className="text-headline-lg font-bold text-on-surface">Mon Profil</h1>

//     {/* Messages */}
//     {successMessage && (
//         <div className="bg-secondary/10 text-secondary p-3 rounded-lg text-sm">
//         {successMessage}
//         </div>
//     )}
//     {errorMessage && (
//         <div className="bg-error/10 text-error p-3 rounded-lg text-sm">
//         {errorMessage}
//         </div>
//     )}

//     {/* Profile Information */}
//     <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
//         <h2 className="text-headline-md font-bold text-on-surface mb-6 flex items-center gap-2">
//         <User className="w-5 h-5" />
//         Informations personnelles
//         </h2>

//         <form onSubmit={handleProfileSubmit} className="space-y-4">
//         <div className="flex items-center gap-4 mb-6">
//             <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-3xl font-bold relative">
//             {profileData.avatar ? (
//                 <img src={profileData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
//             ) : (
//                 profileData.name.charAt(0).toUpperCase()
//             )}
//             <button className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary p-1.5 rounded-full hover:bg-secondary/90 transition-colors">
//                 <Camera className="w-4 h-4" />
//             </button>
//             </div>
//             <div>
//             <p className="font-medium text-on-surface">{profileData.name}</p>
//             <p className="text-sm text-on-surface-variant">{user?.role}</p>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//             <label className="block text-label-md font-medium text-on-surface mb-1">
//                 Nom complet <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
//                 <input
//                 type="text"
//                 name="name"
//                 value={profileData.name}
//                 onChange={handleProfileChange}
//                 className={`w-full pl-10 pr-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
//                     ${errors.name ? 'border-error' : 'border-outline-variant'}`}
//                 />
//             </div>
//             {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
//             </div>

//             <div>
//             <label className="block text-label-md font-medium text-on-surface mb-1">
//                 Email <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
//                 <input
//                 type="email"
//                 name="email"
//                 value={profileData.email}
//                 onChange={handleProfileChange}
//                 className={`w-full pl-10 pr-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
//                     ${errors.email ? 'border-error' : 'border-outline-variant'}`}
//                 />
//             </div>
//             {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
//             </div>

//             <div className="md:col-span-2">
//             <label className="block text-label-md font-medium text-on-surface mb-1">
//                 Téléphone
//             </label>
//             <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
//                 <input
//                 type="tel"
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleProfileChange}
//                 className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//             </div>
//             </div>
//         </div>

//         <div className="flex justify-end">
//             <button
//             type="submit"
//             disabled={saving}
//             className="flex items-center gap-2 px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
//             >
//             <Save className="w-4 h-4" />
//             {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
//             </button>
//         </div>
//         </form>
//     </div>

//     {/* Password Change */}
//     <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
//         <h2 className="text-headline-md font-bold text-on-surface mb-6 flex items-center gap-2">
//         <Lock className="w-5 h-5" />
//         Changer le mot de passe
//         </h2>

//         <form onSubmit={handlePasswordSubmit} className="space-y-4">
//         <div>
//             <label className="block text-label-md font-medium text-on-surface mb-1">
//             Mot de passe actuel <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//             <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
//             <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="currentPassword"
//                 value={passwordData.currentPassword}
//                 onChange={handlePasswordChange}
//                 className={`w-full pl-10 pr-12 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
//                 ${errors.currentPassword ? 'border-error' : 'border-outline-variant'}`}
//                 placeholder="••••••••"
//             />
//             <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
//             >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//             </div>
//             {errors.currentPassword && <p className="text-xs text-error mt-1">{errors.currentPassword}</p>}
//         </div>

//         <div>
//             <label className="block text-label-md font-medium text-on-surface mb-1">
//             Nouveau mot de passe <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
//             <input
//                 type={showNewPassword ? 'text' : 'password'}
//                 name="newPassword"
//                 value={passwordData.newPassword}
//                 onChange={handlePasswordChange}
//                 className={`w-full pl-10 pr-12 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
//                 ${errors.newPassword ? 'border-error' : 'border-outline-variant'}`}
//                 placeholder="••••••••"
//             />
//             <button
//                 type="button"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
//             >
//                 {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//             </div>
//             {errors.newPassword && <p className="text-xs text-error mt-1">{errors.newPassword}</p>}
//         </div>

//         <div>
//             <label className="block text-label-md font-medium text-on-surface mb-1">
//             Confirmer le mot de passe <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
//             <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 value={passwordData.confirmPassword}
//                 onChange={handlePasswordChange}
//                 className={`w-full pl-10 pr-12 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
//                 ${errors.confirmPassword ? 'border-error' : 'border-outline-variant'}`}
//                 placeholder="••••••••"
//             />
//             <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
//             >
//                 {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//             </div>
//             {errors.confirmPassword && <p className="text-xs text-error mt-1">{errors.confirmPassword}</p>}
//         </div>

//         <div className="flex justify-end">
//             <button
//             type="submit"
//             disabled={saving}
//             className="flex items-center gap-2 px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
//             >
//             <Key className="w-4 h-4" />
//             {saving ? 'Mise à jour...' : 'Changer le mot de passe'}
//             </button>
//         </div>
//         </form>
//     </div>
//     </div>
//   )
// }