import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { Smile } from "lucide-react";

export default function GraphModal({ userQuiz }) {
  const [data, setData] = useState(userQuiz);
  const preQuizRq29 = data.find(
    (quiz) => quiz.quizId === 6 && quiz.quizType === "PRE"
  );
  const preQuizRq20 = data.find(
    (quiz) => quiz.quizId === 7 && quiz.quizType === "PRE"
  );
  const preQuizRq3 = data.find(
    (quiz) => quiz.quizId === 8 && quiz.quizType === "PRE"
  );
  const postQuizRq29 = data.find(
    (quiz) => quiz.quizId === 6 && quiz.quizType === "POST"
  );
  const postQuizRq20 = data.find(
    (quiz) => quiz.quizId === 7 && quiz.quizType === "POST"
  );
  const postQuizRq3 = data.find(
    (quiz) => quiz.quizId === 8 && quiz.quizType === "POST"
  );
  const preData = [
    {
      name: "ความทนต่อแรงกดดัน",
      value: preQuizRq20?.pressure || 0,
    },
    {
      name: "การมีความหวังและกำลังใจ",
      value: preQuizRq20?.encouragement || 0,
    },
    {
      name: "การต่อสู้เอาชนะอุปสรรค",
      value: preQuizRq20?.obstacle || 0,
    },
    {
        name: "พลังใจ",
        value: preQuizRq3?.total || 0,
      },
  ];
  const postData = [
    {
      name: "ความทนต่อแรงกดดัน",
      value: postQuizRq20?.pressure || 0,
    },
    {
      name: "การมีความหวังและกำลังใจ",
      value: postQuizRq20?.encouragement || 0,
    },
    {
      name: "การต่อสู้เอาชนะอุปสรรค",
      value: postQuizRq20?.obstacle || 0,
    },
    {
        name: "พลังใจ",
        value: postQuizRq3?.total || 0,
      },
  ];
  {
    /* pressure แรงกดดัน encouragement  กำลังใจ obstacle อุปสรรค */
  }
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
    <dialog id="graphModal" className="modal -z-50">
      <div className="modal-box max-w-7xl h-auto ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg p-4">ผลลัพธ์แบบทดสอบเเปรียบเทียบระหว่างการทำแบบทดสอบก่อนและหลัง</h3>

        <div className="flex justify-center">
            <div className="flex flex-col justify-center space-y-6">

           

            {preQuizRq29 && (<span className='badge border-2 badge-lg p-3'><h1>• ความรอบรู้ด้านสุภาพจิต : <span className="font-semibold">{preQuizRq29.total >= 3.68 && preQuizRq29.total <=5 ? "มาก" : preQuizRq29.total <= 3.67 && preQuizRq29.total >= 2.34 ? "ปกติ" : "น้อย"}</span></h1></span>)}

  {/* pressure แรงกดดัน encouragement  กำลังใจ obstacle อุปสรรค */}
  {preQuizRq20 && (<span className='badge border-2 badge-lg   p-3'><h1>• ความทนต่อแรงกดดัน : <span className="font-semibold">{preQuizRq20.pressure > 34 ? "สูงกว่าปกติ" : preQuizRq20.pressure <= 34 && preQuizRq20.pressure >= 27 ? "ปกติ" : "ต่ำกว่าปกติ"}</span></h1></span>)}
  {preQuizRq20 && (<span className='badge border-2 badge-lg    p-3'><h1>• การมีความหวังและกำลังใจ : <span className="font-semibold">{preQuizRq20.encouragement > 19 ? "สูงกว่าปกติ" : preQuizRq20.encouragement <= 19 && preQuizRq20.encouragement >= 14 ? "ปกติ" : "ต่ำกว่าปกติ"}</span></h1></span>)}
  {preQuizRq20 && (<span className='badge border-2 badge-lg    p-3'><h1>• การต่อสู้เอาชนะอุปสรรค : <span className="font-semibold">{preQuizRq20.obstacle > 18 ? "สูงกว่าปกติ" : preQuizRq20.obstacle <= 18 && preQuizRq20.obstacle >= 13 ? "ปกติ" : "ต่ำกว่าปกติ"}</span></h1></span>)}
  {preQuizRq3 && (<span className="badge border-2 badge-lg    p-3"><h1>• พลังใจ : <span className="font-semibold">{preQuizRq3.total >=7 ? "มาก" : preQuizRq3.total >=5 ? "ปานกลาง" : "น้อย"}</span></h1></span>)}

            </div>
          <BarChart data={preData} width={800} height={500} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis  />
            <Tooltip content={<CustomTooltip />} />
            <Legend  />
            <Bar
              dataKey="value"
              name="แบบทดสอบก่อน"
              fill="#10b981"
              label={{ fill: 'white', fontSize: 20 }}
              activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
            />
          </BarChart>
        </div>
        <hr/>
        <div className="flex justify-center my-6">
          <BarChart data={postData} width={800} height={500}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis  />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="value"
              name="แบบทดสอบหลัง"
              
              fill="#3b82f6"
              
              label={{ fill: 'white', fontSize: 20 }}
              activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
            />
          </BarChart >
          <div className="flex flex-col justify-center space-y-6 ml-6">
          {postQuizRq29 && (<span className='badge border-2 badge-lg p-3'><h1>• ความรอบรู้ด้านสุภาพ : <span className="font-semibold">{postQuizRq29.total >= 3.68 && postQuizRq29.total <=5 ? "จิตมาก" : postQuizRq29.total <= 3.67 && postQuizRq29.total >= 2.34 ? "ปกติ" : "น้อย"}</span></h1></span>)}

  {/* pressure แรงกดดัน encouragement  กำลังใจ obstacle อุปสรรค */}
  {postQuizRq20 && (<span className='badge border-2 badge-lg   p-3'><h1>• ความทนต่อแรงกดดัน : <span className="font-semibold">{postQuizRq20.pressure > 34 ? "สูงกว่าปกติ" : postQuizRq20.pressure <= 34 && postQuizRq20.pressure >= 27 ? "ปกติ" : "ต่ำกว่าปกติ"}</span></h1></span>)}
  {postQuizRq20 && (<span className='badge border-2 badge-lg    p-3'><h1>• การมีความหวังและกำลังใจ : <span className="font-semibold">{postQuizRq20.encouragement > 19 ? "สูงกว่าปกติ" : postQuizRq20.encouragement <= 19 && postQuizRq20.encouragement >= 14 ? "ปกติ" : "ต่ำกว่าปกติ"}</span></h1></span>)}
  {postQuizRq20 && (<span className='badge border-2 badge-lg    p-3'><h1>• การต่อสู้เอาชนะอุปสรรค : <span className="font-semibold">{postQuizRq20.obstacle > 18 ? "สูงกว่าปกติ" : postQuizRq20.obstacle <= 18 && postQuizRq20.obstacle >= 13 ? "ปกติ" : "ต่ำกว่าปกติ"}</span></h1></span>)}
  {postQuizRq3 && (<span className="badge border-2 badge-lg    p-3"><h1>• พลังใจ : <span className="font-semibold">{postQuizRq3.total >=7 ? "มาก" : postQuizRq3.total >=5 ? "พลังใจปานกลาง" : "พลังใจน้อย"}</span></h1></span>)}


            </div>
        </div>
      </div>
    </dialog>
  );
}
