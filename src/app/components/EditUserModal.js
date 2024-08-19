
"use client";

import React, { useEffect, useState } from "react";
import { UserRoundPen, UserX,Crown } from "lucide-react";
import Swal from "sweetalert2";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useSession } from "next-auth/react";


export default function EditUserModal({ initialUser }) {
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(0);
  const [preview, setPreview] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const { data: session } = useSession();
  


  const clearSelectedUser = () => {
    setUserId(0);
    setImage(null);
    setEmail("");
    setName("");
    setRole(0);
    setPreview(null);
    setImage(null);
  };
  const handleSelectedUser = (user) => {
    setUserId(user.id);
    setImage(user.image);
    setEmail(user.email);
    setName(user.name);
    setRole(user.role_id);
  };
  const refreshUsers = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_serverURL + "/api/users", {
        method: "GET",
      })
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async () => {
    if (!userId) return;
    try {
      document.getElementById("loadingModal").showModal();
      const res = await fetch(`/api/updateuser/profile/data/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
        }),
      });
      if (res.ok) {
        if(imgUpload){
          try {
            const formData = new FormData();
            formData.append("image", imgUpload);
            const res = await fetch(`/api/updateuser/profile/image/${userId}`, {
              method: "PUT",
              body: formData,
            })
            if(!res.ok){
                toast.error("อัพโหลดรูปภาพไม่สําเร็จ")
            }
          } catch (error) {
            console.log(error);
          }
        }
        document.getElementById("loadingModal").close();
        document.getElementById("edit_modal").close();
        refreshUsers();
        toast.success("อัพเดตข้อมูลสําเร็จ");
        clearSelectedUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const filteredUsers = users.length > 0 && users.filter((user) => {
  //   if (isAdmin && isUser) return true;
  //   if (isAdmin) return user.role_id === 1;
  //   if (isUser) return user.role_id === 2;
  // });

  const handleDeleteUser = async (user) => {
    Swal.fire({
      position: "center",
      title: "คุณต้องการลบผู้ใช้หรือไม่ ?",
      text: `ต้องการลบผู้ใช้ ${user.name} ใช่ไหม`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/updateuser/delete-user/${user.id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            toast.success("ลบผู้ใช้สําเร็จ");
            refreshUsers();
          }
        } catch (error) {
          toast.error("ลบผู้ใช้ไม่สําเร็จ");
        }
      }
    });
  };

  return (
   <>
    <div className="flex flex-row w-full h-auto">
        <div className="w-1/4 h-[500px] bg-gradient-to-br from-blue-500  to-sky-400 rounded-md shadow-md p-6">
          <h1 className="text-lg text-white my-2">ค้นหาผู้ใช้</h1>
          <input
            type="text"
            className="w-full border-2 border-white rounded-lg p-4 "
            placeholder="ค้นหาผู้ใช้"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="mt-4 space-y-4">
            <h1 className="text-lg text-white">ค้นหาตามกลุ่มผู้ใช้</h1>
            <div className="form-control rounded-md bg-white p-2">
              <label className="label cursor-pointer ">
                <span className="label-text text-blue-500 text-md">Admin</span>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={() => setIsAdmin(!isAdmin)}
                  className="checkbox bg-white"
                />
              </label>
            </div>
            <div className="form-control rounded-md bg-white p-2">
              <label className="label cursor-pointer">
                <span className="label-text text-blue-500 text-md">User</span>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={() => setIsUser(!isUser)}
                  className="checkbox bg-white"
                />
              </label>
            </div>
          </div>
          <div className="flex items-end justify-end">
          <div className=" dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost btn-xs text-info"
            >
              <svg
                color="white"
                tabIndex={0}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div
              tabIndex={0}
              className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow"
            >
              <div tabIndex={0} className="card-body">
                <h2 className="card-title">คำอธิบาย</h2>
                <p>Admin คือ ผู้ใช้ที่มีสิทธิ์สูงสุดในการใช้งานระบบ สามารถเข้าสู่ระบบบนเว็บไซต์ได้<br />User คือ ผู้ใช้งานบนแอพลิเคชั่นมือถือไม่มีสิทธิ์เข้าถึงข้อมลต่างๆบนเว็บไซต์ได้</p>
              </div>
            </div>
          </div>
          </div>
         
        </div>
        <div className="w-3/4 ml-6">
          {
            users.length > 0 &&
            users
              .filter((user) => {
                if (search === "") {
                  return user;
                } else if (
                  user.name.includes(search) ||
                  user.email.includes(search)
                ) {
                  return user;
                }
              }).filter((user) => {
                if (isAdmin && isUser) {
                  return true;
                } else if (isAdmin) {
                  return user.role_id === 1;
                } else if (isUser) {
                  return user.role_id === 2;
                }
              })
              .map((user) => (
                <div
                  key={user.id}
                  className="flex flex-row w-full justify-around items-center bg-white shadow-xl rounded-2xl mb-4 h-28 max-sm:flex-col max-sm:h-1/2 max-sm:items-start"
                >
                  <div className="flex w-1/2 p-12 max-sm:p-8 ">
                    <img src={user.image} className="w-14 h-14" />
                    <div className="flex flex-col ml-4">
                      <h1 className="text-xl">{user.name}</h1>
                      <h1>{user.email}</h1>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 w-1/2 p-10 max-sm:w-full max-sm:-mt-6">
                    {user.role_id === 1 && (
                      
                      <div className="flex items-center justify-center tooltip" data-tip="Admin">
                        <Crown />
                      </div>
                    )}

                    <div className="tooltip" data-tip="แก้ไข">
                      <button
                        className="btn bg-gradient-to-r from-blue-500 to-sky-400"
                        onClick={() => {
                          //document.getElementById("loadingModal").showModal();
                          document.getElementById("edit_modal").showModal();
                          handleSelectedUser(user);
                        }}
                      >
                        <UserRoundPen color="white" />
                      </button>
                    </div>

                    <div className="tooltip" data-tip="ลบ">
                      <button
                        className="btn"
                        onClick={() => handleDeleteUser(user)}
                        disabled={user.email == session?.user?.email}
                      >
                        <UserX />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    {/* modal profile edit */}
    <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setPreview(null);
                clearSelectedUser();
              }}
            >
              ✕
            </button>
          </form>
          {/* bg top */}
          <div className="bg-sky-200 w-full h-[15%] absolute top-0 left-0 -z-10"></div>
          {/* detail profile */}
          <div className="flex flex-col p-4 mt-4 ">
            <div className="flex flex-col space-y-1 mb-4">
              <img src={image} alt={name} className="w-16 h-16 rounded-full" />
              <h1 className="text-xl">{name}</h1>
              <h1>{email}</h1>
            </div>

            {/* form group detail */}
            <div className="flex flex-col space-y-2">
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>ชื่อ</h1>
                <input
                  className=" input input-bordered w-1/2  "
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>อีเมลล์</h1>
                <input className=" input input-bordered w-1/2 " value={email} />
              </div>
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>กำหนดสิทธิ์</h1>
                <select
                  className="select select-bordered w-1/2 max-w-xs"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option disabled selected>
                    {role === 1 ? "Admin" : "User"}
                  </option>
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                </select>
              </div>

              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>รูปโปร์ไฟล์</h1>
                <div className="flex justify-end space-x-4">
                  {preview ? (
                    <img src={preview} className="w-12 h-12 rounded-full" />
                  ) : (
                    <img src={image} className="w-12 h-12 rounded-full" />
                  )}

                  <input
                    type="file"
                    id="imageProfile"
                    onChange={(e) => {
                      const src = URL.createObjectURL(e.target.files[0]);
                      setPreview(src);
                      setImgUpload(e.target.files[0]);
                    }}
                    className="file-input input-xs  input-bordered w-32 "
                  />
                </div>
              </div>
              <hr />
            </div>
          </div>
          {/* submit and cancel button */}
          <div className="flex justify-end space-x-2">
            <button
              className="btn btn-sm btn-outline text-lg"
              onClick={() => {
                document.getElementById("edit_modal").close();
                setPreview(null);
                clearSelectedUser();
              }}
            >
              ยกเลิก
            </button>
            <button
              className="btn btn-sm btn-outline tracking-wider bg-blue-500 text-white text-lg"
              onClick={handleUpdate}
            >
              บันทึก
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="loadingModal" className="modal">
        <div className="modal-box w-auto flex items-center justify-center">
          <span className="loading loading-dots loading-lg bg-blue-500"></span>
        </div>
      </dialog>
     
   </>
  );
}

