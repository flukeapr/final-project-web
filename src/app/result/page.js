'use client'
import React, { useEffect , useState } from 'react'
import Navbar from '../components/Navbar';

import { useUserContext } from '../context/UsersContext';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ChatAi from '../components/ChatAi';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend, Tooltip
} from "recharts";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function Result() {
  const {users ,setUsers ,allQuiz,fetchUserQuiz } = useUserContext();
  const [allData , setAllData] = useState([]);
  const [selected , setSelected] = useState('total');
  const [averageRq20 , setAverageRq20] = useState([]);
  const [averageRq29 , setAverageRq29] = useState([]);
  const [averageRq3 , setAverageRq3] = useState([]);
  const { data: session } = useSession();
  if(!session)  redirect('/')


    const getData = async ()=>{
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_serverURL + "/api/result")
        const data = await res.json()
        if(res.ok){
          const averageRq20 = data.reduce((acc, quiz) => {
            acc.pressure += quiz.pressure;
            acc.encouragement += quiz.encouragement;
            acc.obstacle += quiz.obstacle;
            return acc;
          }, { pressure: 0, encouragement: 0, obstacle: 0 });
          
          const userQuizRq20Count = data.filter((quiz)=>quiz.pressure && quiz.encouragement && quiz.obstacle > 0).length;
          averageRq20.pressure /= userQuizRq20Count;
          averageRq20.encouragement /= userQuizRq20Count;
          averageRq20.obstacle /= userQuizRq20Count;
         const dataAverageRq20 = [
           {
              id:1,
             name: "ความทนต่อแรงกดดัน",
             value: averageRq20.pressure
           },
           {
              id:2,
             name: "การมีความหวังและกำลังใจ",
             value: averageRq20.encouragement
           },
           {
              id:3,
             name: "การต่อสู้เอาชนะอุปสรรค",
             value: averageRq20.obstacle
           }
         ]
         const averageRq3 = data.filter((quiz)=>quiz.quizId === 8).reduce((acc, quiz) => {
          return { total: acc.total + quiz.total };
           
         },{total:0})
         const userQuizRq3Count = data.filter((quiz)=>quiz.quizId === 8).length;
         averageRq3.total /= userQuizRq3Count;
         const dataAverageRq3 = {name:"พลังใจ",value:averageRq3.total}

         const averageRq29 = data.filter((quiz)=>quiz.quizId === 6).reduce((acc, quiz) => {
          return { total: acc.total + quiz.total };
           
         },{total:0})
         const userQuizRq29Count = data.filter((quiz)=>quiz.quizId === 6).length;
         averageRq29.total /= userQuizRq29Count;
         const dataAverageRq29 = {name:"ความรอบรู้ทางสุขภาพจิต",value:averageRq29.total}






         setAverageRq29(dataAverageRq29)
         setAverageRq3(dataAverageRq3)
         setAverageRq20(dataAverageRq20)
        }
       
        
      } catch (error) {
        console.log(error)
      }
    }
    const sumAverageRq20 = averageRq20.reduce((acc, data) => acc + data.value, 0);
  useEffect(()=>{
    getData()
  },[])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white rounded-md ">
          <p className="label">{label} : {payload[0].value} คะแนน</p> 
        </div>
      );
    }
  
    return null;
  }
  

  return (
    <>
        <Navbar/>
        <main  className="max-w-7xl mx-auto pt-10 px-6">
          <div className='flex flex-rows w-full items-center justify-evenly'>
        <div className={`flex items-center justify-center p-4 rounded-lg shadow-md cursor-pointer ${selected==="total" ? "bg-gradient-to-r from-blue-500 to-sky-400 text-white" : "bg-white text-black"}`} onClick={()=>{setSelected('total')}}  >
          <h1 className=' tracking-wide'>ผลลัพธ์ของผู้ใช้งานทั้งหมด</h1> 
        </div>
        <div className={`flex items-center justify-center  p-4 rounded-lg shadow-md cursor-pointer ${selected==="day" ? "bg-gradient-to-r from-blue-500 to-sky-400 text-white" : "bg-white text-black"}`} onClick={()=>{setSelected('day')}} >
          <h1 className=' tracking-wide'>ผลลัพธ์ของผู้ใช้งานรายวัน</h1> 
        </div>
          </div>
      {selected === 'total' && (
        <>
         <div className='flex flex-col  items-center justify-center w-full bg-white p-10 rounded-2xl shadow-xl'>
        <div className="flex justify-around p-6 mt-6 space-x-8 w-full max-sm:flex-col">
        <div className='flex flex-col items-center space-y-3'>
            <h1>โดยเฉลี่ยคะแนนของแบบทดสอบ RQ 29 ก่อนและหลัง</h1>
            <span className='badge badge-lg p-4 border-2 border-sky-400 text-xl font-semibold w-28 h-28 rounded-full'>{averageRq29.value}</span>
            <h1>อยู่ในระดับ : มีความรอบรู้ด้านสุขภาพจิต<span className=' font-semibold ml-2'>{averageRq29.value >=3.68 ? "มาก" : averageRq29.value >= 2.34 ? "ปานกลาง" : "น้อย"}</span></h1>
            

          </div>
          <div className='flex flex-col items-center space-y-3 '>
            <h1>โดยเฉลี่ยคะแนนของแบบทดสอบ RQ 20 ก่อนและหลัง</h1>
           

            <span className='badge badge-lg p-4 border-2 border-emerald-500 text-xl font-semibold w-28 h-28 rounded-full'>{sumAverageRq20}</span>
            <h1>อยู่ในระดับ : คะแนนรวม<span className=' font-semibold ml-2'>{sumAverageRq20  > 69 ? "สูง" : sumAverageRq20 <= 69 && sumAverageRq20 > 55 ? "ปกติ" : "ต่ํา"}</span></h1>
           
            

          </div>
          <div className='flex flex-col items-center space-y-3'>
            <h1>โดยเฉลี่ยคะแนนของแบบทดสอบ RQ 3 ก่อนและหลัง</h1>
            <span className='badge badge-lg p-4 border-2 border-blue-500 text-xl font-semibold w-28 h-28 rounded-full'>{averageRq3.value}</span>
            <h1>อยู่ในระดับ : พลังใจ<span className=' font-semibold ml-2'>{averageRq3.value > 7 ? "มาก" : averageRq3.value <= 6 && averageRq3.value >= 5 ? "ปานกลาง" : "น้อย"}</span></h1>
           
            

          </div>

        </div>
        

        {/* <div className='flex items-center justify-around w-full bg-white p-10 rounded-2xl shadow-xl'>
      
        <PieChart
  series={[
    {
      data: [
        { id: 0, value: averageRq29.value, color: '#38bdf8' },
       
      ],
       arcLabel:(item)=> `คะแนน ${item.value}%`
    },
  ]}
  sx={{
    [`& .${pieArcLabelClasses.root}`]: {
      fill: 'white',
      fontWeight: 'semibold',
      fontSize: '20px',
      letterSpacing: '1px',
    },
  }}
  width={300}
  height={500}
/>
<PieChart
  series={[
    {
      data: [
        { id: 0, value: averageRq3.value, color: '#3b82f6' },
      ],
      arcLabel:(item)=> `คะแนน 
      ${item.value}`

    },
  ]}
  sx={{
    [`& .${pieArcLabelClasses.root}`]: {
      fill: 'white',
      fontWeight: 'semibold',
      fontSize: '20px',
      letterSpacing: '1px',
    },
  }}
  width={300}
  height={300}
/>

      <BarChart data={[averageRq29]} width={800} height={500} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis  />
            <Tooltip content={<CustomTooltip />} />
            <Legend  />
            <Bar
              dataKey="value"
              name="คะแนนเฉลี่ยของแบบทดสอบ RQ 29 ก่อนและหลัง"
              fill="#38bdf8"
              label={{ fill: 'white', fontSize: 20 }}
              activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
            />
          </BarChart>
          <div className='flex flex-col items-center space-y-3'>
            <h1>โดยเฉลี่ยคะแนนของแบบทดสอบ RQ 29 ก่อนและหลัง</h1>
            <span className='badge badge-lg p-4 border-2 border-sky-400 text-xl font-semibold'>{averageRq29.value}</span>
            <h1>อยู่ในระดับ : มีความรอบรู้ด้านสุขภาพจิต{averageRq29.value >=3.68 ? "มาก" : averageRq29.value >= 2.34 ? "ปานกลาง" : "น้อย"}</h1>
            

          </div>
      </div> */}
         <div className='flex flex-col  items-center justify-center w-full pt-20 '>
         {/* <div className='flex flex-col items-center space-y-3 p-4'>
            <h1>โดยเฉลี่ยคะแนนของแบบทดสอบ RQ 20 ก่อนและหลัง</h1>
           

            <span className='badge badge-lg p-4 border-2 border-emerald-500 text-xl font-semibold w-28 h-28 rounded-full'>{sumAverageRq20}</span>
            <h1>อยู่ในระดับ : คะแนนรวม{sumAverageRq20 > 69 ? "สูง" : sumAverageRq20 <= 69 && sumAverageRq20 > 55 ? "ปกติ" : "ต่ํา"}</h1>
           
            

          </div> */}
      <BarChart data={averageRq20} width={800} height={500} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis  />
            <Tooltip content={<CustomTooltip />} />
            <Legend  />
            <Bar
              dataKey="value"
              name="คะแนนเฉลี่ยของแบบทดสอบ RQ 20 ก่อนและหลัง"
              fill="#10b981"
              label={{ fill: 'white', fontSize: 20 }}
              activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
            />
          </BarChart>
          {/* <div className='flex flex-col items-center space-y-3'>
            <h1>โดยเฉลี่ยคะแนนของแบบทดสอบ RQ 20 ก่อนและหลัง</h1>
           

            <span className='badge badge-lg p-4 border-2 border-emerald-500 text-xl font-semibold'>{sumAverageRq20}</span>
            <h1>อยู่ในระดับ : คะแนนรวม{sumAverageRq20 > 69 ? "สูง" : sumAverageRq20 <= 69 && sumAverageRq20 > 55 ? "ปกติ" : "ต่ํา"}</h1>
           
            

          </div> */}
      </div>
      {/* <div className='flex items-center justify-center w-full bg-white p-10 rounded-2xl shadow-xl'>
      <BarChart data={[averageRq3]} width={800} height={500} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis  />
            <Tooltip content={<CustomTooltip />} />
            <Legend  />
            <Bar
              dataKey="value"
              name="คะแนนเฉลี่ยของแบบทดสอบ RQ 3 ก่อนและหลัง"
              fill="#3b82f6"
              label={{ fill: 'white', fontSize: 20 }}
              activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
            />
          </BarChart>
          <div className='flex flex-col items-center space-y-3'>
            <h1>โดยเฉลี่ยคะแนนของแบบทดสอบ RQ 3 ก่อนและหลัง</h1>
            <span className='badge badge-lg p-4 border-2 border-blue-500 text-xl font-semibold'>{averageRq3.value}</span>
            <h1>อยู่ในระดับ : พลังใจ{averageRq3.value > 7 ? "มาก" : averageRq3.value <= 6 && averageRq3.value >= 5 ? "ปานกลาง" : "น้อย"}</h1>
           
            

          </div>
      </div> */}
        </div>
        </>
      )}
     {selected === 'day' && (
      <>
         <div className='flex items-center justify-center w-full bg-white p-10 rounded-2xl shadow-xl'>
      <BarChart data={averageRq20} width={800} height={500} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis  />
            <Tooltip content={<CustomTooltip />} />
            <Legend  />
            <Bar
              dataKey="value"
              name="คะแนนเฉลี่ยของแบบทดสอบ RQ 20 ก่อนและหลัง"
              fill="#10b981"
              label={{ fill: 'white', fontSize: 20 }}
              activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
            />
          </BarChart>
      </div>
      
      </>
     )}
        
        </main>
    </>
  )
}
