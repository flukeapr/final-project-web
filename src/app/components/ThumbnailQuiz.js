import React from 'react'
import { FileMinus } from 'lucide-react'
import { useState } from 'react'

export default function ThumbnailQuiz({quiz,onQuizSelected}) {
    const [selectQuiz , setSelectQuiz] = useState(null)

    const handleClick = (id) => {
        setSelectQuiz(id)
    }

  return (
    quiz.map((quiz, index) => (
        <div key={quiz.id} className={`w-10/12 p-4 mt-4 ${selectQuiz === quiz.id ? 'bg-orange-500 ' : "bg-white"}  rounded-2xl cursor-pointer shadow-xl `} onClick={() => {handleClick(quiz.id), onQuizSelected(quiz)}}>
        <div className='h-20 flex items-center justify-around '>
            <div className={`flex flex-col ${selectQuiz === quiz.id ? 'text-white' : 'text-black'}`}>
            <h1 className='text-md'>{quiz?.name}</h1>
            <h1 className='text-md'>1 นาที | {quiz.answers.length} คำถาม</h1>

            </div>
            <div className='rounded-full bg-gray-100 p-2 w-14 h-14 flex items-center justify-center'>
            <FileMinus size={35} color={selectQuiz === quiz.id ? '#f97316' : 'black'} />

            </div>
        </div>
         
    </div>
    ))
  
  )
}
