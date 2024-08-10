import React from 'react'

export default function AnswerQuiz({quiz}) {
    // const answers = quiz?.answers || [];
   
    const totalOptions = 4;
  return (
    <div className='w-full flex flex-col items-center   p-4'>
        <h1 className='text-3xl text-slate-600'>{quiz?.name}</h1>
        {quiz?.answers?.length > 0 && quiz?.question?.length > 0 && (
        <>
          

          
          {quiz.question.map((question, qIndex) => (
            <div key={qIndex} className='mb-4 flex flex-col items-center '>
              <h2  className='text-md m-4  text-orange-500'>{qIndex + 1}.{question}</h2>
              <div className='flex flex-row items-center justify-center bg-[#C5C5C59e] w-80 h-24 rounded-2xl'>
              {[...Array(totalOptions)].map((_, oIndex) => {
                  
                  const isSelected = quiz.answers[qIndex] === oIndex;
                  return (
                    <>
                    <div className='flex flex-col items-center'>
                    <h1 className='text-black'>{oIndex }</h1>
                    <div
                      key={oIndex}
                      className={`${oIndex === 0 || oIndex === 3 ? 'w-10 h-10' : 'w-8 h-8'} rounded-full m-2 ${
                        isSelected ? 'bg-blue-500' : 'bg-white'
                      } border-2 border-gray-300`}
                    />
                    </div>
                    
                    </>
                   
                  );
                })}
              </div>
              

              
            </div>
          ))}
          
        </>
      )}
    </div>
  )
}
