"use client"

import { GoBackBtn } from "@/components/goback";
import axios from "axios";
import { Plus, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstname   : "",
    lastname    : "",
    phoneNumber : "",
    gender      : "",
    address   : "",
    profession    : "",
    role        : "member",
    createdBy   : "",
  })
  
  const handleSubmit = () => {}

  return (
    <div className="">
      <main className="p-2 mb-10">
        <div className="flex justify-between items-center p-2">
          <div className="flex justify-between items-center">
            <GoBackBtn />
            <h1 className="text-lg"><b>AJOUTER UN MEMBRE</b></h1>
          </div>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              {/* {message && <div className="flex w-full justify-center rounded-md">
                <small className='alert alert-danger p-2'>{message}</small>
              </div>} */}
              
              <div className="grid md:grid-cols-2 space-y-2 gap-3">
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
                  <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                    Adresse
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
                
                <div>
                  <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                    Profession
                  </label>
                  <div className="mt-2">
                    <input 
                      id="phone" 
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
                  <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                    Genre
                  </label>
                  <div className="mt-2">
                    <input 
                      id="phone" 
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
                  {
                    loading
                    ? <button disabled className="block w-full bg-gray-500 p-1" style={{border: '1px solid #ddd'}}>
                        Enregistrement en cours...
                      </button>
                    : <button type="submit" className="block w-full bg-blue-800 hover:bg-blue-950 cursor-pointer text-white p-3 text-sm/6 font-semibold shadow-xs">
                        Enregistrer
                      </button>
                  }
              </div>

              </div>
            </form>
        </div>
      </main>
    </div>
  )
}