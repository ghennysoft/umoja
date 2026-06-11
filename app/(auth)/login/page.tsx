'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.error('Email ou mot de passe incorrect');
    } else {
      console.log(result);
      // toast.success('Connexion réussie');
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className='p-3'>
      <div className="flex justify-center mb-3">
        <img src="/logo.jpg" width={150} alt="logo delka" />
      </div>
      <div>
        <h4 className="text-center text-2xl">Connexion</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            className="block w-full p-2 my-3 border border-gray-300 py-3 px-4 rounded-xl"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input 
            type="password"
            className="block w-full p-2 my-3 border border-gray-300 py-3 px-4 rounded-xl"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {
            loading
            ? <button 
                type="button"
                disabled
                className="block p-2 my-4 rounded-xl w-full bg-gray-300 text-gray-500"
              >
                Connexion en cour... 
              </button>
            : <button 
                type="submit"
                className="block p-2 my-4 rounded-xl w-full bg-red-400 text-white cursor-pointer"
              >
                Se connecter
              </button>
          }
        </form>
      </div>
    </div>
  );
}