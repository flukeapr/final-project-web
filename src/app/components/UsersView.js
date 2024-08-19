import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../context/UsersContext";

export default function UsersView({isLoading}) {
  const { users, setUsers, fetchUsers, fetchUserQuiz } = useUserContext();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  
   
  // useEffect(() => {
  //   fetchUsers().then(() => {
  //     setLoading(isLoading);
  //   });
  //   fetchUserQuiz();
  // }, []);

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

  const handleNavigate = (user) => {
    if(user.total===null||user.total===0) {
      toast.error("ไม่สามารถดูผลได้ เนื่องจากไม่มีข้อมูลการประเมิน")
      return;
    }
    router.push(`/resultuser/${user.id}`);
  };



  return (
    <div>
      <div className="flex flex-col   h-[400px]">
        <div className="flex justify-between  w-full ">
          <h1 className="text-2xl ">ผู้ใช้งาน</h1>
          <div className="flex items-center">
            <Link href={'homepage/allusers'} className="text-2xl text-[#F26522]">ดูทั้งหมด </Link>
            <span>
              <ChevronRight size={30} />
            </span>
          </div>
        </div>
        <div className="flex flex-wrap ">
          {isLoading ? (
            <div className="w-full h-40 flex items-center justify-center">
              <span className="loading loading-dots loading-lg text-[#F26522]"></span>
            </div>
          ) : (
            users.length > 0 &&
            users.slice(0,4).map((user) => (
              <div
                className={`flex flex-col shadow-2xl  rounded-2xl  w-60 h-60 m-8 p-2 relative 
                  ${user.total >0 && user.total < 50 ? "bg-green-200": user.total ==null ? "bg-white" : "bg-white"}`}
                key={user.id}
              >
                

                <img src={user.image} className=" absolute -top-8 left-20 rounded-full w-16 h-16 border-2 " />
                
                {user.total >0 && user.total < 50 && <div className="absolute top-4 right-2  badge  border border-neutral-300">ผู้มีความเสี่ยงน้อย</div>}
                {user.total === null || user.total===0 && <div className="absolute top-4 right-2  badge  border border-neutral-300">ยังไม่ได้ประเมิน</div>}
                
                <div className="flex flex-col items-center w-full mt-12">
                  <h1 >{user.name}</h1>
                  <h1>{user.email}</h1>
                </div>
                <div className="flex flex-col items-center w-full space-y-2 mt-2 p-2">
                  <button
                    onClick={() => handleNavigate(user)}
                    className="btn border-2 border-neutral-300 w-full"
                  >
                    ผลลัพธ์แบบทดสอบ
                  </button>
                  <button
                    className={`btn w-full ${
                      user.status === "follow"
                        ? "btn-success text-white"
                        : "btn text-black"
                    }`}
                    onClick={() => handleUpdateStatus(user.id)}
                    disabled={user.total===null||user.total===0}
                  >
                    {user.status === "follow" ? "ติดตามแล้ว" : "ติดตาม"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div></div>
    </div>
  );
}
