"use client";

import { GoBackBtn } from "@/components/goback";
import axios from "axios";
import { Plus, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page() { 
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => { 
    const getUsers = async () => {
      try {
        const res = await axios.get('/api/auth/register');
        console.log(res?.data)
        setUsers(res?.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  const [term, setTerm] = useState("");
  // let usersData = null;
  // if(user?.role && users) {
  //   if(term){
  //     if(user?.role === "Agent") {
  //       usersData = users?.filter(data => data?.role === "Client")?.filter(user =>
  //         user?.firstname?.toLowerCase()?.includes(term?.toLowerCase()) ||
  //         user?.lastname?.toLowerCase()?.includes(term?.toLowerCase())
  //       );
  //     } else {
  //       usersData = users?.filter(user =>
  //         user?.firstname?.toLowerCase()?.includes(term?.toLowerCase()) ||
  //         user?.lastname?.toLowerCase()?.includes(term?.toLowerCase())
  //       );
  //     }
  //   } else {
  //     const agentData = users?.filter(data => data?.role === "Client");
  //     if(user?.role === "Agent") {
  //       usersData = agentData;
  //     } else {
  //       usersData = users;
  //     }
  //   }
  // }

  return (
    <div className="">
      <main className="p-2 mb-10">
        <div className="flex justify-between items-center p-2">
          <div className="flex justify-between items-center">
            <GoBackBtn />
            <h1 className="text-lg"><b>UTILISATEURS</b></h1>
          </div>
          <Link href={"/users/add"} className="border border-gray-500 rounded-md px-4 py-2 text-sm flex items-center hover:bg-blue-800 hover:text-white transition-colors justify-center">
            <Plus />
            <span>Ajouter</span>
          </Link>
        </div>

        <div className="flex justify-between my-4">
            <input
              type="text"
              placeholder="Tapez le nom du membre..."
              className="border rounded-md px-4 py-2 text-md flex-1" 
              onChange={(e) => setTerm(e.target.value)}
            />                
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {
            users?.map((user) => (
              <Link href={`#`} key={user?.id} className="border border-slate-300 cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-md">
                <div className="container p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-400 flex justify-center items-center mb-4">
                      <User size={50} />
                    </div>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">{user?.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{user?.email}</div>
                  
                 {/* <span className="text-lg font-semibold text-center">{user?.firstname} {user?.lastname}</span>
                 <span className="text-sm text-center">{user?.phoneNumber}</span>
                 <span className="text-sm text-center">{user?.gender}</span> */}
                </div>
              </Link>
            ))
          }
        </div>
      </main>
    </div>
  );
}
