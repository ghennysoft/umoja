'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {email, password, role, name});
      console.log(res.data);
      router.push('/users');
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3'>
      <div>
        <h4 className="text-center text-2xl">Créer un utilisateur</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="role">Rôle</label>
          <select 
            name="role" 
            id="role" 
            className="block w-full p-2 my-3 border border-gray-300 py-3 px-4 rounded-xl"
            value={role} 
            onChange={(e)=>setRole(e.target.value)}
            required
          >
            <option value="">--- Choisissez le role ---</option>
            <option value="Client">Client</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>

          <label htmlFor="name">Nom</label>
          <input 
            type="text"
            className="block w-full p-2 my-3 border border-gray-300 py-3 px-4 rounded-xl"
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
                Création en cour... 
              </button>
            : <button 
                type="submit"
                className="block p-2 my-4 rounded-xl w-full bg-red-400 text-white cursor-pointer"
              >
                Créer un utilisateur
              </button>
          }
        </form>
      </div>
    </div>
  );
}