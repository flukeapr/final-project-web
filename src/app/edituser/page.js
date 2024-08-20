"use server";


import Link from "next/link";
import { UserRoundPen, UserX } from "lucide-react";
import Swal from "sweetalert2";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import EditUserModal from "../components/EditUserModal";

async function fetchUsers() {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_serverURL+"/api/users");
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function EditUser() {
  

  const session = await getServerSession();
  if (!session) redirect("/");

  const users = await fetchUsers();
 

  

  
  

  

 

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-2">
        จัดการผู้ใช้
      </h1>
    <EditUserModal initialUser={users}/>
     

    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
   
    </>
  );
}
