"use client";
import Navbar from "@/app/components/Navbar";
import { useUserContext } from "../../context/UsersContext";
import {useState} from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllUsers() {
  const { users,setUsers } = useUserContext();
  const [search , setSearch] = useState('');
  const [stress , setStress] = useState(false);
  const [depression , setDepression] = useState(false);
  const [suicide , setSuicide] = useState(false);
  
  const handleUpdateStatus = async (id) => {
    try {
      const response = await fetch(`/api/updateuser/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.message === "following") {
        setUsers(
          users.map((user) =>
            user.id === id ? {...user,status: user.status === "follow" ? "unfollow" : "follow",}: user
          )
        );
        toast.success("ติดตามมีความผู้เสี่ยงแล้ว");
      } else if (data.message === "unfollow") {
        setUsers(
          users.map((user) =>
            user.id === id ? {...user,status: user.status === "unfollow" ? "follow" : "unfollow",}: user
          )
        );
        toast.error("ยกเลิกติดตามแล้ว");
      }else if(data.message === "fail"){
        toast.error("ไม่สามารถเปลี่ยนสถานะได้ เนื่องจากไม่มีข้อมูลการประเมิน")
      }





      if (!response.ok) {
        throw Error(data.error);
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      console.log(error);
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <main className="max-w-7xl mx-auto pt-20 px-6 flex flex-col items-center p-4">
        
        <h1 className=" text-orange-500 text-xl">ผู้ใช้งานทั้งหมด</h1>
        <div className='flex flex-row justify-end items-center w-4/5 m-2'>
        <input type="text" className='w-1/3 border-2 border-gray-600 rounded-2xl px-4 py-1 input-sm' placeholder='ค้นหาผู้ใช้' onChange={(e)=> setSearch(e.target.value)} />
        <div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="btn btn-sm">เรียงตาม</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a onClick={()=> setStress(!stress)}>ความเครียดสูง</a></li>
    <li><a onClick={()=>setDepression(!depression)}>เสี่ยงภาวะซึมเศร้า</a></li>
  </ul>
</div>
      </div>
     
        {users.length > 0 &&
          users.sort((a, b) => {
            if(stress){
              return b.stress_score - a.stress_score
            }else if(depression){
              return b.depression_score - a.depression_score
            }
          }).filter((user)=>{
            if(search === ""){
              return user
            }else if(user.name.includes(search)){
                return user
            }
          }).map((user) => (
            <div
              key={user.id}
              className={` flex flex-row w-4/5 justify-around items-center  ${user.total >0 && user.total < 50 ? "bg-green-200": user.total ==null ? "bg-white" : "bg-white"} shadow-xl rounded-2xl my-2 h-28 max-sm:flex-col max-sm:h-1/2 max-sm:items-start`}
            >
              <div className="flex w-1/2 p-12 max-sm:p-8 ">
                <img src={user.image} className="w-14 h-14" />
                <div className="flex flex-col ml-4">
                <h1 className="text-xl">{user.name}</h1>
                <h1>{user.email}</h1>
                </div>
               
              </div>
              <div className="flex justify-end space-x-4 w-1/2 p-10 max-sm:w-full max-sm:-mt-6">
                <Link
                  href={`/resultuser/${user.id}`}
                  className="btn border-2 border-neutral-300 w-2/6 max-sm:w-1/2"
                >
                  ผลลัพธ์แบบทดสอบ
                </Link>
                <button
                  className={`btn w-2/6 max-sm:w-1/2 ${
                    user.status === "follow"
                      ? "btn-success text-white"
                      : "btn text-black"
                  }`}
                  disabled={user.total === null || user.total === 0}
                  onClick={() => handleUpdateStatus(user.id)}>
                  {user.status === "follow" ? "ติดตามแล้ว" : "ติดตาม"}
                </button>
              </div>
            </div>
          ))}
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
      </main>
    </>
  );
}
