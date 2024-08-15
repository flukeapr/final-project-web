"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserRoundPen, UserX } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function EditUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [image , setImage] = useState(null)
  const [preview , setPreview] = useState(null)
  const [email , setEmail] = useState("")
  const [name , setName] = useState("")
  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [gender , setGender] = useState("")
  const [dob , setDob] = useState(new Date())

  

  const { data: session } = useSession();

  const fetchUsers = async () => {
    try {
      const result = await fetch("/api/users");
      const data = await result.json();
      setUsers(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers().then(() => setLoading(false));
  }, []);


  const handleSelectedUser = (user) => {
    setImage(user.image)
    setEmail(user.email)
    setName(user.name)
    setFirstName(user.first_name)
    setLastName(user.last_name)
    setGender(user.gender)
    
    setDob(user.dob)
  };

  const clearSelectedUser = () => {
    
    setImage(null)
    setEmail("")
    setName("")
    setFirstName("")
    setLastName("")
    setGender("")
    setDob(new Date())
  };



  const handleDeleteUser = async (user) =>{
    Swal.fire({
      position:'center',
      title: 'คุณต้องการลบผู้ใช้หรือไม่ ?',
      text:`ต้องการลบผู้ใช้ ${user.name} ใช่ไหม`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F26522',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'

    }).then((result)=>{

    })
  }

  

  return (
    <>
      <h1 className="text-2xl text-center text-orange-500">จัดการผู้ใช้</h1>
      <div className="flex flex-row justify-end w-4/5">
        <input
          type="text"
          className="w-1/3 border-2 border-neutral-500 rounded-2xl px-4 py-1"
          placeholder="ค้นหาผู้ใช้"
          onChange={(e) => setSearch(e.target.value)}
        />
       
      </div>

      {loading ? (
        <div className="w-full h-40 flex items-center justify-center">
          <span className="loading loading-dots loading-lg text-[#F26522]"></span>
        </div>
      ) : (
        users.length > 0 &&
        users
          .filter((user) => {
            if (search === "") {
              return user;
            } else if (user.name.includes(search)||user.email.includes(search)) {
              return user;
            }
          })
          .map((user) => (
            <div
              key={user.id}
              className="flex flex-row w-4/5 justify-around items-center bg-white shadow-xl rounded-2xl mb-4 h-28 max-sm:flex-col max-sm:h-1/2 max-sm:items-start"
            >
              <div className="flex w-1/2 p-12 max-sm:p-8 ">
                <img src={user.image} className="w-14 h-14" />
                <div className="flex flex-col ml-4">
                  <h1 className="text-xl">{user.name}</h1>
                  <h1>{user.email}</h1>
                </div>
              </div>
              <div className="flex justify-end space-x-4 w-1/2 p-10 max-sm:w-full max-sm:-mt-6">
                <div className="tooltip" data-tip="แก้ไข">
                  <button className="btn bg-[#F26523]" onClick={()=>{document.getElementById('edit_modal').showModal() 
                     handleSelectedUser(user)}}>
                    <UserRoundPen color="white" />
                  </button>
                </div>

                <div className="tooltip" data-tip="ลบ">
                  <button className="btn" onClick={()=>handleDeleteUser(user)} disabled={user.email==session?.user?.email}>
                    <UserX />
                  </button>
                </div>
              </div>
            </div>
          ))
      )}

{/* modal profile edit */}
<dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
              setPreview(null)
              clearSelectedUser()
            }}>
              ✕
            </button>
          </form>
          {/* bg top */}
          <div className="bg-neutral-200 w-full h-[20%] absolute top-0 left-0 -z-10"></div>
          {/* detail profile */}
          <div className="flex flex-col p-4 mt-4 ">
            <div className="flex flex-col space-y-1 mb-4">
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full"
              />
              <h1 className="text-xl">{name}</h1>
              <h1>{email}</h1>
            </div>

            {/* form group detail */}
            <div className="flex flex-col space-y-2">
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>Name</h1>
                <input
                  className=" input input-bordered w-1/2  "
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
             
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>Email</h1>
                <input
                  className=" input input-bordered w-1/2 "
                  value={email}
                  
                />
              </div>
             
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>Profile</h1>
                <div className="flex justify-end space-x-4">
                  {preview ? (
                    <img
                      src={preview}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <img
                    src={image}
                    className="w-12 h-12 rounded-full"
                  />
                  )}
                  
                  <input
                    type="file"
                    id="imageProfile"
                    onChange={(e)=>{
                      const src = URL.createObjectURL(e.target.files[0])
                      setPreview(src)
                      setImage(e.target.files[0])
                    }}
                    className="file-input input-xs  input-bordered w-36 "
                  />
                </div>
              </div>
              <hr />
            </div>
          </div>
          {/* submit and cancel button */}
          <div className="flex justify-end space-x-2">
            <button
              className="btn btn-sm btn-outline text-md"
              onClick={() => {document.getElementById("edit_modal").close()
                setPreview(null)
                clearSelectedUser()
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-outline bg-[#f97316] text-white text-md"
              
            >
              Save Changes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
