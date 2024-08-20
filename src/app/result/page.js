'use client'
import React, { useEffect , useState } from 'react'
import Navbar from '../components/Navbar';
import { BarChart } from '@mui/x-charts/BarChart';
import { useUserContext } from '../context/UsersContext';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ChatAi from '../components/ChatAi';

export default function Result() {
  const {users ,setUsers ,allQuiz,fetchUserQuiz } = useUserContext();
  const [data , setData] = React.useState([]);
  const [selected , setSelected] = useState('total');

  const { data: session } = useSession();
  if(!session)  redirect('/')
  
  useEffect(()=>{
    const getData = ()=>{
      try {
        

        let stress = 0;
        
        let depression = 0;
        let suicide = 0;
        allQuiz.map((item)=>{
           stress = stress + item.stress_score
           suicide = suicide + item.suicide_score
           depression = depression + item.depression_score
        })
        
     

        setData([stress,depression,suicide])
        
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[])

  

  return (
    <>
        <Navbar/>
        <main  className="max-w-7xl mx-auto pt-20 px-6">
          {/* <div className='flex flex-rows w-full items-center justify-evenly'>
        <div className={`flex items-center justify-center p-4 rounded-lg shadow-md cursor-pointer ${selected==="total" ? "bg-orange-500 text-white" : "bg-white text-black"}`} onClick={()=>{setSelected('total')}}  >
          <h1>ผลลัพธ์ของผู้ใช้งานทั้งหมด</h1> 
        </div>
        <div className={`flex items-center justify-center  p-4 rounded-lg shadow-md cursor-pointer ${selected==="day" ? "bg-orange-500 text-white" : "bg-white text-black"}`} onClick={()=>{setSelected('day')}} >
          <h1>ผลลัพธ์ของผู้ใช้งานรายวัน</h1> 
        </div>
          </div>
        
      <div className='flex items-center justify-center w-full bg-white rounded-2xl shadow-xl'>
      <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['เครียดสูง', 'ซึมเศร้า', '.ฆ่าตัวตาย'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: data,
        },
      ]}
      width={1000}
      height={500}
    />
      </div> */}
        <ChatAi/>
        </main>
    </>
  )
}
