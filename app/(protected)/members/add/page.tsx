"use client"

import { GoBackBtn } from "@/components/goback";
import { useSession } from "next-auth/react";
import { Plus, User } from "lucide-react";
import { useState } from "react";
import { createMember } from "@/app/lib/actions/members";
import { useRouter } from 'next/navigation';

export default function Page() {
  const {data: session} = useSession();
  const [loading, setLoading] = useState(false);
  const [memberId] = useState(() =>
    Math.random().toString().slice(2, 7)
  );

  const initialData = {
    memberId   : memberId,

    firstname   : "",
    lastname    : "",
    nickname    : "",
    email    : "",
    phoneNumber : "",
    gender      : "",

    placeOfBirth : "",
    dateOfBirth  : "",

    address     : "",
    nationality : "",
    state       : "",
    country     : "",
    quarter     : "",
    township    : "",
    city        : "",
    // createdBy   : session?.user?.id,
  }

  const router = useRouter();
  const [form, setForm] = useState(initialData)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createMember(form);
        // toast.success('Produit créé');
      setForm(initialData);
      // setEditing(null);
      router.push('/members')
    } catch (error) {
      console.log(error);
      // toast.error('Erreur');   
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <main className="p-2 mb-10">
        <div className="flex justify-between items-center p-2">
          <div className="flex justify-between items-center">
            <GoBackBtn />
            <h1 className="text-lg"><b>AJOUTER UN MEMBRE</b></h1>
          </div>
        </div>
        <div className="m-4">
            <form onSubmit={handleSubmit}>
              {/* {message && <div className="flex w-full justify-center rounded-md">
                <small className='alert alert-danger p-2'>{message}</small>
              </div>} */}
              
              <div className="grid md:grid-cols-2 space-y-2 gap-3">
                <h3 className="col-span-2 font-semibold">Infos personnelles</h3>
                <div>
                  <label htmlFor="lastname" className="block text-sm/6 font-medium text-gray-900">
                    Nom
                  </label>
                  <div className="mt-2">
                    <input 
                      id="lastname" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "lastname": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="nickname" className="block text-sm/6 font-medium text-gray-900">
                    Post-nom
                  </label>
                  <div className="mt-2">
                    <input 
                      id="nickname" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "nickname": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>

                <div>
                  <label htmlFor="firstname" className="block text-sm/6 font-medium text-gray-900">
                    Prénom
                  </label>
                  <div className="mt-2">
                    <input 
                      id="firstname" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "firstname": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input 
                      id="email" 
                      type="email" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "email": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">
                    Numéro de téléphone
                  </label>
                  <div className="mt-2">
                    <input 
                      id="phoneNumber" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "phoneNumber": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="gender">Gender</label>
                    <select 
                      name="gender" 
                      id="gender" 
                      className="block w-full p-2 my-3 border border-gray-300 py-3 px-4 rounded-xl"
                      value={form.gender} 
                      onChange={(e)=>setForm({...form, gender: e.target.value})}
                      required
                    >
                      <option value="">--- Choisissez le genre ---</option>
                      <option value="Homme">M</option>
                      <option value="Femme">F</option>
                    </select>
                </div>                
                
                <div>
                  <label htmlFor="placeOfBirth" className="block text-sm/6 font-medium text-gray-900">
                    Lieu de naissance
                  </label>
                  <div className="mt-2">
                    <input 
                      id="placeOfBirth" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "placeOfBirth": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm/6 font-medium text-gray-900">
                    Date de naissance
                  </label>
                  <div className="mt-2">
                    <input 
                      id="dateOfBirth" 
                      type="date" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "dateOfBirth": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 space-y-2 gap-3">
                <h3 className="col-span-2 font-semibold mt-5">Localisation</h3>

                <div>
                  <label htmlFor="nationality" className="block text-sm/6 font-medium text-gray-900">
                    Nationalité
                  </label>
                  <div className="mt-2">
                    <input 
                      id="nationality" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "nationality": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                    Pays
                  </label>
                  <div className="mt-2">
                    <input 
                      id="country" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "country": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                    Province/Etat
                  </label>
                  <div className="mt-2">
                    <input 
                      id="state" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "state": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                    Ville
                  </label>
                  <div className="mt-2">
                    <input 
                      id="city" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "city": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="township" className="block text-sm/6 font-medium text-gray-900">
                    Commune
                  </label>
                  <div className="mt-2">
                    <input 
                      id="township" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "township": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="quarter" className="block text-sm/6 font-medium text-gray-900">
                    Quartier
                  </label>
                  <div className="mt-2">
                    <input 
                      id="quarter" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "quarter": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                    Adresse complète
                  </label>
                  <div className="mt-2">
                    <input 
                      id="address" 
                      type="text" 
                      className="block border w-full rounded-sm mb-4 bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                      onChange={(e) => setForm({...form, "address": e.target.value})}
                      autoFocus
                    />
                    {/* {errors.phone && (
                      <small className="text-red-500 text-xs mt-1">{errors.phone.message}</small>
                    )} */}
                  </div>
                </div>
              </div>

                <div>
                  {
                    loading
                    ? <button disabled className="block w-full bg-gray-500 p-3" style={{border: '1px solid #ddd'}}>
                        Enregistrement en cours...
                      </button>
                    : <button type="submit" className="block w-full bg-blue-800 hover:bg-blue-950 cursor-pointer text-white p-3 text-sm/6 font-semibold shadow-xs">
                        Enregistrer
                      </button>
                  }
              </div>
            </form>
        </div>
      </main>
    </div>
  )
}