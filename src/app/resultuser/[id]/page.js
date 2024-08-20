"use client"

import { useSearchParams } from 'next/navigation'
import { useState,useEffect } from 'react'
import Navbar from '@/app/components/Navbar'
import ThumbnailQuiz from '@/app/components/ThumbnailQuiz'
import AnswerQuiz from '@/app/components/AnswerQuiz'
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '@/app/context/UsersContext'
import { useSession } from "next-auth/react";

export default function ResultUser({params}) {
  const {id} = params
  const { data: session } = useSession();
  if (!session) redirect("/");
  const [selectedQuiz, setSelectedQuiz] = useState([])
  const {users ,setUsers ,allQuiz,fetchUserQuiz } = useUserContext();
  const user = users.find(user => user.id === Number(id))
  const usersQuiz = allQuiz.filter(quiz => quiz.userId === Number(id) )
  const preQuiz = usersQuiz.filter((quiz) => quiz.quizType === "PRE")

  





  // const fetchUsersQuizAndUserScoreView = async () => {
  //     const response = await fetch(`/api/userquizView/${id}`)
  //     const data = await response.json()
  //     setUsersQuiz(data)
  //     const response2 = await fetch(`/api/userscoreView/${id}`)
  //     const data2 = await response2.json()
  //     console.log(data2)
  //     setUser(data2)
      
  // }

  const handleQuizSelected = (quiz) => {
    const selectQuiz =quiz;
    setSelectedQuiz(selectQuiz)
  }

  


  const handleUpdateStatus = async (id)=>{
    try {
     const response = await fetch(`/api/updateuser/status/${id}`,{
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
   });
   
   const data = await response.json();
   if(data.message==="following"){
     setUsers(users.map(user => user.id === id ? {...user, status: user.status==="follow"?"unfollow":"follow"} : user))
     toast.success('ติดตามมีความผู้เสี่ยงแล้ว')
   }else if(data.message==="unfollow"){
     setUsers(users.map(user => user.id === id ? {...user, status: user.status==="unfollow"?"follow":"unfollow"} : user))
     toast.error('ยกเลิกติดตามแล้ว')
     
   }else if(data.message === "fail"){
    toast.error("ไม่สามารถเปลี่ยนสถานะได้ เนื่องจากไม่มีข้อมูลการประเมิน")
  }
   if(!response.ok){
     throw Error(data.error)
   }
    } catch (error) {
     toast.error("ไม่สามารถเปลี่ยนสถานะได้")
     console.log(error)
    }
    


 }



  return (
    <>
    <Navbar/>
    <div  className="max-w-7xl mx-auto  px-6 flex flex-row max-sm:flex-col flex-wrap">
    <div className='w-2/5 max-sm:w-full h-screen bg-white'>
      <div className='flex flex-col items-center' >
        <div className='flex flex-col items-center h-80 pt-8'>
        
            <div  className='flex flex-col items-center'>
               <img src={user?.image} className='w-20 h-20 rounded-full'/>
                  <h1 className='text-md mt-2'>{user?.name}</h1>
                  <h1 className='text-md mt-2'>{user?.email}</h1>
                  <div className='space-y-2'>

                  <button  className='btn border-2 border-neutral-300 w-full'>เปรียบเทียบแบบทดสอบ</button>
                  <button className={`btn w-full ${user?.status === "follow" ? "btn-success text-white" : "btn-outline text-black"}`} onClick={() => handleUpdateStatus(user?.id)}>{user?.status === "follow" ? "ติดตามแล้ว" : "ติดตาม"}</button>
                  </div>
            </div>
              
        
        </div>
       
        <ThumbnailQuiz quiz={usersQuiz} onQuizSelected={handleQuizSelected}/>

        

        
      </div>
    </div>
    <div className={`w-3/5 max-sm:w-full shadow-lg ${selectedQuiz.length === 0 ? " bg-white" : "bg-white" } `}>
      {selectedQuiz.length === 0 ? (
        <div className='flex justify-center w-full h-full items-center'>
          <h1 className="text-3xl font-bold text-center">กรุณาเลือกแบบทดสอบ</h1>
        </div>
      ) :(
        <AnswerQuiz quiz={selectedQuiz} />

      )}
    </div>
    </div>
   
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
  )
}
