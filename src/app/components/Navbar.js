"use client";

import { FaRegBell } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { data: session ,update :updateSession } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview , setPreview] = useState(null)
  const pathname = usePathname()
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
      setEmail(session.user.email);
     
    }
  }, [session]);

  const handleChangeProfile = async () => {
    try {

      const res = await fetch(process.env.NEXT_PUBLIC_serverURL + `/api/updateuser/profile/data/${session?.user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      })
      
      if(image){
        try {
          const formData = new FormData();
          formData.append("image", image);
         
          const res = await fetch(process.env.NEXT_PUBLIC_serverURL +`/api/updateuser/profile/image/${session?.user?.id}`, {
            method: "PUT",
            body: formData,
          });
  
          if (!res.ok) {
            toast.error("อัพโหลดรูปภาพไม่สําเร็จ");
          }
        } catch (error) {
          toast.error("อัพโหลดรูปภาพไม่สําเร็จ");
        }
       
      }
      if(res.ok){
        await updateSession();
        document.getElementById("profile_modal").close();
        toast.success("อัพเดทข้อมูลสําเร็จ");
        
      }
     
     
      
     
      
      
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-300/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0 cursor-pointer">
            <img src="/images/logo/smile-logo-blue-rm.png" />
            <Link href={session ? "/homepage" : "/"}>
              <span className="text-xl tracking-tight">Happy Mind</span>
            </Link>
            
            <ul className="hidden lg:flex ml-14 space-x-10">
            <li className={`hover:decoration-blue-500 hover:underline hover:decoration-solid hover:decoration-2 hover:underline-offset-4 ${pathname === "/homepage/" ? "text-blue-500" : ""}`}>
                <Link href={session ? "/homepage" : "/login"}>หน้าหลัก</Link>
            </li>
            <li className={`hover:decoration-blue-500 hover:underline hover:decoration-solid hover:decoration-2 hover:underline-offset-4 ${pathname === "/result" ? "text-blue-500" : ""}`}>
                <Link href={session ? "/result" : "/login"}>ผลลัพธ์</Link>
            </li>
            <li className={`hover:decoration-blue-500 hover:underline hover:decoration-solid hover:decoration-2 hover:underline-offset-4 ${pathname === "/edituser" ? "text-blue-500" : ""}`}>
                <Link href={session ? "/edituser" : "/login"}>จัดการผู้ใช้</Link>
            </li>
            <li className={`hover:decoration-blue-500 hover:underline hover:decoration-solid hover:decoration-2 hover:underline-offset-4 ${pathname === "/media" ? "text-blue-500" : ""}`}>
                <Link href={session ? "/media" : "/login"}>สื่อความรู้</Link>
            </li>
            <li className={`hover:decoration-blue-500 hover:underline hover:decoration-solid hover:decoration-2 hover:underline-offset-4 ${pathname === "/community" ? "text-blue-500" : ""}`}>
                <Link href={session ? "/community" : "/login"}>โพสต์ชุมชน</Link>
            </li>
            <li className={`hover:decoration-blue-500 hover:underline hover:decoration-solid hover:decoration-2 hover:underline-offset-4 ${pathname === "/support" ? "text-blue-500" : ""}`}>
                <Link href={session ? "/support" : "/login"}>ศูนย์การช่วยเหลือ</Link>
            </li>
          </ul>
           
            
          </div>

          {session?.user ? (
            <div className="hidden lg:flex w-1/5 md:w-1/4 items-center justify-end space-x-4 ">
              {/* Notification bell */}
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs bg-blue-500 indicator-item"></span>
                </div>
              </button>
              {/* dropdown menu profile */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar online"
                >
                  
                  <div className="w-10 rounded-full">
                    {/* image profile */}
                    
                      <img src={session?.user?.image} className="w-12 h-12" />                  
                  </div>
                  
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
                >
                  <li>
                    <a
                      className="justify-between"
                      onClick={() =>
                        document.getElementById("profile_modal").showModal()
                      }
                    >
                      แก้ไขโปรไฟล์
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={() => signOut()}
                      className="bg-gradient-to-r from-blue-500 to-sky-400 text-white  "
                    >
                      <span className="mr-2  ">
                        <LogOut size={20} />
                      </span>
                      ออกจากระบบ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              <Link href="/login" className="border bg-gradient-to-r from-blue-500 to-sky-400  py-2 px-3 rounded-lg text-[18px] text-white">
                Sign In
              </Link>
            
            </div>
          )}

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleMobileDrawer}>
              {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-400 w-full p-12 flex flex-col justify-center items-center mt-3  lg:hidden">
            <ul className="flex flex-col space-y-4 my-3">
              <li>
                <Link
                  href={session ? "/homepage" : "/login"}
                  className="text-white"
                >
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link
                  href={session ? "/result" : "/login"}
                  className="text-white"
                >
                  ผลลัพธ์
                </Link>
              </li>
              <li>
                <Link
                  href={session ? "/edituser" : "/login"}
                  className="text-white"
                >
                  จัดการผู้ใช้
                </Link>
              </li>
              <li >
                <Link  className="text-white" href={session ? "/media" : "/login"}>สื่อความรู้</Link>
            </li>
            <li >
                <Link  className="text-white" href={session ? "/community" : "/login"}>โพสต์ชุมชน</Link>
            </li>
              <li>
                <Link
                  href={session ? "/support" : "/login"}
                  className="text-white"
                >
                  ศูนย์การช่วยเหลือ
                </Link>
              </li>
            </ul>
            {session?.user ? (
              <div className="flex w-1/5 max-sm:w-full sm:w-full items-center justify-around">
                <img
                  src={session?.user?.image}
                  className="w-12 h-12 rounded-full"
                />

                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-blue-500 to-sky-400 text-white  py-2 px-3 rounded flex"
                >
                  <span className="mr-2">
                    <LogOut size={20} />
                  </span>
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <div className="flex space-x-6">
               <Link href="/login" className="border bg-gradient-to-r from-blue-500 to-sky-400  py-2 px-3 rounded  text-white">
                Sign In
              </Link>
            
                
              </div>
            )}
          </div>
        )}
      </div>
      {/* modal profile edit */}
      <dialog id="profile_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* bg top */}
          <div className="bg-neutral-200 w-full h-1/6 absolute top-0 left-0 -z-10"></div>
          {/* detail profile */}
          <div className="flex flex-col p-4 ">
            <div className="flex flex-col space-y-1 mb-4">
              <img
                src={session?.user?.image}
                alt={session?.user?.name}
                className="w-16 h-16 rounded-full"
              />
              <h1 className="text-xl">{session?.user?.name}</h1>
              <h1>{session?.user?.email}</h1>
            </div>

            {/* form group detail */}
            <div className="flex flex-col space-y-2">
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>Name</h1>
                <input
                  className=" input input-bordered w-1/2  "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>Email</h1>
                <input
                  className=" input input-bordered w-1/2 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>Profile</h1>
                <div className="flex justify-end space-x-4">
                  {preview ? <img src={preview} className="w-12 h-12 rounded-full" /> : <img
                    src={session?.user?.image}
                    className="w-12 h-12 rounded-full"
                  />}
                 
                  <input
                    type="file"
                    id="imageProfile"
                    onChange={(e) => {setImage(e.target.files[0])
                      const src = URL.createObjectURL(e.target.files[0])
                      setPreview(src)
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
              className="btn btn-sm btn-outline text-lg"
              onClick={() => {document.getElementById("profile_modal").close()
                setPreview(null)
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-outline bg-blue-500 text-white text-lg"
              onClick={() => handleChangeProfile()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </dialog>
    </nav>
  );
}
