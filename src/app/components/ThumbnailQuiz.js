import React from 'react'
import { FileMinus } from 'lucide-react'
import { useState } from 'react'

export default function ThumbnailQuiz({quiz,onQuizSelected}) {
    const [selectQuiz , setSelectQuiz] = useState(null)
    const preQuizRq3 = quiz.find(quiz => quiz.quizId === 8 && quiz.quizType === "PRE")
    const postQuizRq3 = quiz.find(quiz => quiz.quizId === 8 && quiz.quizType === "POST")
    const preQuizRq20 = quiz.find(quiz => quiz.quizId === 7 && quiz.quizType === "PRE")

    

    const handleClick = (id) => {
        setSelectQuiz(id)
    }

  return (
    <>
    <div className='my-2 flex flex-col w-full space-y-2 items-center justify-center'>
    <h1>แบบทดสอบก่อน</h1>
    <hr className="  border-2 border-[#F26522] rounded-lg w-1/2" />
    </div>
    <div>
      {preQuizRq3 && (<span className="badge border-2">• {preQuizRq3.total/3<=10 && preQuizRq3.total/3 >=7 ? "พลังใจมาก" : preQuizRq3.total/3<=6 && preQuizRq3.total/3 >=5 ? "พลังใจปานกลาง" : "พลังใจน้อย"}</span>
)}
     
    </div>

   
     {quiz.filter((quiz)=>{
        return quiz.quizType==="PRE"
    }).map((quiz, index) => (
      
      <div key={quiz.id} className={`w-10/12 p-4 mt-4 ${selectQuiz === quiz.id ? 'bg-gradient-to-r from-orange-500 to-neutral-300 ' : "bg-white"}  rounded-2xl cursor-pointer shadow-xl `} onClick={() => {handleClick(quiz.id), onQuizSelected(quiz)}}>
        <div className='h-20 flex items-center justify-around '>
            <div className={`flex flex-col flex-wrap space-y-2 ${selectQuiz === quiz.id ? 'text-white' : 'text-black'}`}>
            <h1 className='text-md'>{quiz?.name} | {quiz.answers.length} คำถาม</h1>
            {quiz.quizId === 8 && (<span className="badge border-2  ">• {quiz.total/3<=10 && quiz.total/3 >=7 ? "พลังใจมาก" : quiz.total/3<=6 && quiz.total/3 >=5 ? "พลังใจปานกลาง" : "พลังใจน้อย"}</span>)}

           

            </div>
            <div className='rounded-full bg-gray-100 p-2 w-14 h-14 flex items-center justify-center'>
            <FileMinus size={35} color={selectQuiz === quiz.id ? '#f97316' : 'black'} />

            </div>
            
        </div>
    </div>
    
      
        
    ))}
  <div className='my-4 flex flex-col w-full space-y-2 items-center justify-center'>
    <h1>แบบทดสอบหลัง</h1>
    <hr className="  border-2 border-[#F26522] rounded-lg w-1/2" />
    </div>
    <div>
      {postQuizRq3 && (<span className="badge border-2">• {postQuizRq3.total/3<=10 && postQuizRq3.total/3 >=7 ? "พลังใจมาก" : postQuizRq3.total/3<=6 && postQuizRq3.total/3 >=5 ? "พลังใจปานกลาง" : "พลังใจน้อย"}</span>
)}
     
    </div>
     {quiz.filter((quiz)=>{
        return quiz.quizType==="POST"
    }).map((quiz, index) => (
      
      <div key={quiz.id} className={`w-10/12 p-4 mt-4 ${selectQuiz === quiz.id ? 'bg-gradient-to-r from-orange-500 to-neutral-300  ' : "bg-white"}  rounded-2xl cursor-pointer shadow-xl `} onClick={() => {handleClick(quiz.id), onQuizSelected(quiz)}}>
        <div className='h-20 flex items-center justify-around '>
            <div className={`flex flex-col ${selectQuiz === quiz.id ? 'text-white' : 'text-black'}`}>
            <h1 className='text-md'>{quiz?.name} | {quiz.answers.length} คำถาม</h1>
            {quiz.quizId === 8 && (<span className="badge border-2  ">• {quiz.total/3<=10 && quiz.total/3 >=7 ? "พลังใจมาก" : quiz.total/3<=6 && quiz.total/3 >=5 ? "พลังใจปานกลาง" : "พลังใจน้อย"}</span>)}

            </div>
            <div className='rounded-full bg-gray-100 p-2 w-14 h-14 flex items-center justify-center'>
            <FileMinus size={35} color={selectQuiz === quiz.id ? '#f97316' : 'black'} />

            </div>
        </div>
         
    </div>
    
      
        
    ))}
    </>
   
  
  )
}
