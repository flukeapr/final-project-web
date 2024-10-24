"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useUserContext } from "../context/UsersContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Result() {
  const { users, setUsers, allQuiz, fetchUserQuiz } = useUserContext();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selected, setSelected] = useState("all");
  const [averageRq20, setAverageRq20] = useState([]);
  const [averageRq29, setAverageRq29] = useState([]);
  const [averageRq3, setAverageRq3] = useState([]);
  const [dateRange, setDateRange] = useState("all");
  const [lowestRiskUserRq20, setLowestRiskUserRq20] = useState({});
  const [lowestRiskUserRq29, setLowestRiskUserRq29] = useState({});
  const [lowestRiskUserRq3, setLowestRiskUserRq3] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterRq20, setFilterRq20] = useState([]);
  const [filterRq29, setFilterRq29] = useState([]);
  const [filterRq3, setFilterRq3] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuizName, setSearchQuizName] = useState({mhl:false,rq3:false,rq20:false});
  const { data: session } = useSession();
  // if(!session)  redirect('/')

  const getData = async () => {
    try {
      const res = await fetch("/api/result");
      const data = await res.json();

      setAllData(data);
      setFilterData(data);
      if (res.ok) {
        const averageRq20 = data.reduce(
          (acc, quiz) => {
            acc.pressure += quiz.pressure;
            acc.encouragement += quiz.encouragement;
            acc.obstacle += quiz.obstacle;
            return acc;
          },
          { pressure: 0, encouragement: 0, obstacle: 0 }
        );

        const userQuizRq20Count = data.filter(
          (quiz) => quiz.pressure && quiz.encouragement && quiz.obstacle > 0
        ).length;
        console.log(userQuizRq20Count);
        averageRq20.pressure /= userQuizRq20Count;
        averageRq20.encouragement /= userQuizRq20Count;
        averageRq20.obstacle /= userQuizRq20Count;
        const dataAverageRq20 = [
          {
            id: 1,
            name: "ความทนต่อแรงกดดัน",
            value: averageRq20.pressure.toFixed(2),
          },
          {
            id: 2,
            name: "การมีความหวังและกำลังใจ",
            value: averageRq20.encouragement.toFixed(2),
          },
          {
            id: 3,
            name: "การต่อสู้เอาชนะอุปสรรค",
            value: averageRq20.obstacle.toFixed(2),
          },
        ];
        const averageRq3 = data
          .filter((quiz) => quiz.quizId === 8)
          .reduce(
            (acc, quiz) => {
              return { total: acc.total + quiz.total };
            },
            { total: 0 }
          );
        const userQuizRq3Count = data.filter(
          (quiz) => quiz.quizId === 8
        ).length;
        averageRq3.total /= userQuizRq3Count;
        const dataAverageRq3 = {
          name: "พลังใจ",
          value: averageRq3.total.toFixed(2),
        };

        const averageRq29 = data
          .filter((quiz) => quiz.quizId === 6)
          .reduce(
            (acc, quiz) => {
              return { total: acc.total + quiz.total };
            },
            { total: 0 }
          );
        const userQuizRq29Count = data.filter(
          (quiz) => quiz.quizId === 6
        ).length;
        averageRq29.total /= userQuizRq29Count;
        const dataAverageRq29 = {
          name: "ความรอบรู้ทางสุขภาพจิต",
          value: averageRq29.total.toFixed(2),
        };

        setAverageRq29(dataAverageRq29);
        setAverageRq3(dataAverageRq3);
        setAverageRq20(dataAverageRq20);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sumAverageRq20 = averageRq20.reduce((acc, quiz) => {
    return acc + parseFloat(quiz.value);
  }, 0);

  useEffect(() => {
    getData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white rounded-md ">
          <p className="label">
            {label} : {payload[0].value} คะแนน
          </p>
        </div>
      );
    }

    return null;
  };
  useEffect(() => {
    const lowRiskUsersRq29 = allData.filter((quiz) => {
      return quiz.quizId === 6;
    });

    const lowRiskUsersRq20 = allData.filter((quiz) => {
      return quiz.quizId === 7;
    });
    const lowRiskUsersRq3 = allData.filter((quiz) => {
      return quiz.quizId === 8;
    });

    if (lowRiskUsersRq29.length > 0) {
      const lowestUser = lowRiskUsersRq29.reduce((lowest, user) => {
        return user.total < lowest.total ? user : lowest;
      }, lowRiskUsersRq29[0]);

      setLowestRiskUserRq29(lowestUser);
    }

    if (lowRiskUsersRq20.length > 0) {
      const lowestUser = lowRiskUsersRq20.reduce((lowest, user) => {
        return user.total < lowest.total ? user : lowest;
      }, lowRiskUsersRq20[0]);

      setLowestRiskUserRq20(lowestUser);
    }

    if (lowRiskUsersRq3.length > 0) {
      const lowestUser = lowRiskUsersRq3.reduce((lowest, user) => {
        return user.total < lowest.total ? user : lowest;
      }, lowRiskUsersRq3[0]);

      setLowestRiskUserRq3(lowestUser);
    }
  }, [allData]);

  const getDateRange = (range) => {
    const today = new Date();
    let start, end;
    switch (range) {
      case "today":
        start = end = today.toISOString().split("T")[0];
        break;
      case "week":
        start = new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .split("T")[0];
        end = new Date().toISOString().split("T")[0];
        break;
      case "month":
        start = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
          .toISOString()
          .split("T")[0];
        break;
      default:
        start = "";
        end = "";
        break;
    }
    console.log(start, end);
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (dateRange) {
      getDateRange(dateRange);
    }
  }, [dateRange]);

  useEffect(() => {
    if (startDate && endDate) {
      const sDate = new Date(startDate);
      const eDate = new Date(endDate);
      if (sDate > eDate) {
        toast.error("วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด");
      } else {
        const dataRange = filterData.filter(
          (quiz) =>
            new Date(quiz.create_at) >= sDate &&
            new Date(quiz.create_at) <= eDate
        );
        console.log(dataRange);
        const averageRq20 = dataRange.reduce(
          (acc, quiz) => {
            acc.pressure += quiz.pressure;
            acc.encouragement += quiz.encouragement;
            acc.obstacle += quiz.obstacle;
            return acc;
          },
          { pressure: 0, encouragement: 0, obstacle: 0 }
        );

        const userQuizRq20Count = dataRange.filter(
          (quiz) => quiz.pressure && quiz.encouragement && quiz.obstacle > 0
        ).length;
        console.log(userQuizRq20Count);
        averageRq20.pressure /= userQuizRq20Count;
        averageRq20.encouragement /= userQuizRq20Count;
        averageRq20.obstacle /= userQuizRq20Count;
        const dataAverageRq20 = [
          {
            id: 1,
            name: "ความทนต่อแรงกดดัน",
            value: averageRq20.pressure.toFixed(2) || 0,
          },
          {
            id: 2,
            name: "การมีความหวังและกำลังใจ",
            value: averageRq20.encouragement.toFixed(2) || 0,
          },
          {
            id: 3,
            name: "การต่อสู้เอาชนะอุปสรรค",
            value: averageRq20.obstacle.toFixed(2) || 0,
          },
        ];
        const averageRq3 = dataRange
          .filter((quiz) => quiz.quizId === 8)
          .reduce(
            (acc, quiz) => {
              return { total: acc.total + quiz.total };
            },
            { total: 0 }
          );
        const userQuizRq3Count = dataRange.filter(
          (quiz) => quiz.quizId === 8
        ).length;
        averageRq3.total /= userQuizRq3Count;
        const dataAverageRq3 = {
          name: "พลังใจ",
          value: averageRq3.total ? averageRq3.total.toFixed(2) : 0,
        };

        const averageRq29 = dataRange
          .filter((quiz) => quiz.quizId === 6)
          .reduce(
            (acc, quiz) => {
              return { total: acc.total + quiz.total };
            },
            { total: 0 }
          );
        const userQuizRq29Count = dataRange.filter(
          (quiz) => quiz.quizId === 6
        ).length;
        averageRq29.total /= userQuizRq29Count;
        const dataAverageRq29 = {
          name: "ความรอบรู้ทางสุขภาพจิต",
          value: averageRq29.total ? averageRq29.total.toFixed(2) : 0,
        };
        setFilterRq29(dataAverageRq29);
        setFilterRq3(dataAverageRq3);
        setFilterRq20(dataAverageRq20);
      }
    }
  }, [startDate, endDate]);


  useEffect(()=>{
    console.log(searchQuizName)
  },[searchQuizName])

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto pt-10 px-6">
        <div className="flex flex-rows w-full items-center justify-evenly">
          <div
            className={`flex items-center justify-center  p-4 rounded-lg shadow-md cursor-pointer ${
              selected === "table"
                ? "bg-gradient-to-r from-DB via-B to-LB text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setSelected("table");
            }}
          >
            <h1 className=" tracking-wide">ผลลัพธ์ตาราง</h1>
          </div>
          <div
            className={`flex items-center justify-center p-4 rounded-lg shadow-md cursor-pointer ${
              selected === "all"
                ? "bg-gradient-to-r from-DB via-B to-LB text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setSelected("all");
            }}
          >
            <h1 className=" tracking-wide">ผลลัพธ์ของผู้ใช้งานทั้งหมด</h1>
          </div>
          <div
            className={`flex items-center justify-center  p-4 rounded-lg shadow-md cursor-pointer ${
              selected === "day"
                ? "bg-gradient-to-r from-DB via-B to-LB text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setSelected("day");
            }}
          >
            <h1 className=" tracking-wide">ผลลัพธ์ของผู้ใช้งานรายวัน</h1>
          </div>
        </div>
        {selected === "table" && (
          <div className="flex flex-row w-full h-auto mt-10 ">
            <div className="w-1/4 h-[500px] bg-gradient-to-br from-DB  via-B to-LB rounded-md shadow-md p-6">
              {/* <button className="btn bg-white w-full text-B text-lg" onClick={()=>{
          document.getElementById("checkPassword").showModal()
        }}>สร้างบัญชีผู้ดูแลระบบ</button> */}
              <h1 className="text-lg text-white my-2">ค้นหาผู้ใช้</h1>
              <input
                type="search"
                className="w-full border-2 border-white rounded-lg p-4 "
                placeholder="ค้นหาผู้ใช้"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="mt-4 space-y-4">
                <h1 className="text-lg text-white">ค้นหาตามกลุ่มผู้ใช้</h1>
                <div className="form-control rounded-md bg-white p-2">
                  <label className="label cursor-pointer ">
                    <span className="label-text  text-md">
                      แบบประเมิน MHL 29 ข้อ
                    </span>
                    <input
                      type="checkbox"
                      onChange={() =>
                        setSearchQuizName(prev=> ({mhl: !prev.mhl, rq20:prev.rq20,rq3:prev.rq3}))
                      }
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
                <div className="form-control rounded-md bg-white p-2">
                  <label className="label cursor-pointer">
                    <span className="label-text  text-md">
                      แบบประเมิน RQ 20 ข้อ{" "}
                    </span>
                    <input
                      type="checkbox"
                      onChange={() => setSearchQuizName(prev =>({rq20: !prev.rq20 ,mhl:prev.mhl,rq3:prev.rq3}))}
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
                <div className="form-control rounded-md bg-white p-2">
                  <label className="label cursor-pointer">
                    <span className="label-text  text-md">
                      แบบประเมิน RQ 3 ข้อ{" "}
                    </span>
                    <input
                      type="checkbox"
                      onChange={() => setSearchQuizName(prev =>({rq3: !prev.rq3,mhl:prev.mhl,rq20:prev.rq20}))}
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
              </div>
              {/* Dropdown more details */}
              <div className="flex items-end justify-end">
                <div className=" dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-circle btn-ghost btn-xs text-info"
                  >
                    <svg
                      color="white"
                      tabIndex={0}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    tabIndex={0}
                    className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow"
                  >
                    <div tabIndex={0} className="card-body">
                      <h2 className="card-title">คำอธิบาย</h2>
                      <p>
                        Admin คือ ผู้ใช้ที่มีสิทธิ์สูงสุดในการใช้งานระบบ
                        สามารถเข้าสู่ระบบบนเว็บไซต์ได้
                        <br />
                        User คือ
                        ผู้ใช้งานบนแอพลิเคชั่นมือถือไม่มีสิทธิ์เข้าถึงข้อมลต่างๆบนเว็บไซต์ได้
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-3/4  overflow-y-scroll ml-2">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>ลำดับที่</th>
                    <th>ชื่อผู้ใช้งาน</th>
                    <th>ชื่อแบบประเมิน</th>
                    <th>ประเภทก่อนหรือหลังกิจกรรม</th>
                    <th>คะแนน</th>
                    <th>ระดับความเสี่ยง</th>
                  </tr>
                </thead>
                {allData
                  .filter(
                    (data) =>
                      data.username.includes(search) ||
                      data.quizName.includes(search)
                  )
                  .filter((data) => {
                    if(!searchQuizName.mhl && !searchQuizName.rq20 && !searchQuizName.rq3){
                      return data
                    }else if(searchQuizName.mhl && searchQuizName.rq20 && searchQuizName.rq3){
                      return data
                    }else if(searchQuizName.mhl){
                     return data.quizId === 6
                   }else if(searchQuizName.rq20){
                     return data.quizId === 7
                   }else if(searchQuizName.rq3){
                     return data.quizId=== 8
                   }
                   
                  })
                  .map((data, index) => (
                    <tbody>
                      {/* row 1 */}
                      <tr className="hover">
                        <td>{index + 1}</td>
                        <td>{data.username}</td>
                        <td>{data.quizName}</td>
                        <td>
                          {data.quizType === "PRE"
                            ? "แบบประเมินก่อนกิจกรรม"
                            : "แบบประเมินหลังกิจกรรม"}
                        </td>
                        <td>{data.total}</td>
                        <td>{data.risk}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        )}
        {selected === "all" && (
          <>
            <div className="flex flex-col  items-center justify-center w-full bg-white p-10 rounded-2xl shadow-xl">
              <hr className="w-full m-2" />
              <div className="flex p-4 max-w-6xl justify-around w-full">
                <Link
                  href={`/resultuser/${
                    lowestRiskUserRq29 && lowestRiskUserRq29.userId
                  }`}
                  className="flex flex-col items-center space-y-3 cursor-pointer "
                >
                  <h1 className="text-xl">
                    ผู้ที่มีคะแนนต่ำสุดในแบบประเมิน MHL 29
                  </h1>
                  <div className="flex bg-white shadow-sm drop-shadow-lg p-6 rounded-xl ">
                    <img
                      src={lowestRiskUserRq29 && lowestRiskUserRq29.image}
                      className="w-14 h-14 rounded-full"
                    />
                    <div className="flex flex-col ml-2">
                      <h1>
                        {lowestRiskUserRq29 && lowestRiskUserRq29.username}
                      </h1>
                      <h1>
                        คะแนนอยู่ที่{" "}
                        <span className=" text-2xl">
                          {" "}
                          {lowestRiskUserRq29.total &&
                            lowestRiskUserRq29.total.toFixed(2)}
                        </span>
                      </h1>
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/resultuser/${
                    lowestRiskUserRq20 && lowestRiskUserRq20.userId
                  }`}
                  className="flex flex-col items-center space-y-3 cursor-pointer "
                >
                  <h1 className="text-xl">
                    ผู้ที่มีคะแนนต่ำสุดในแบบประเมิน RQ 20
                  </h1>
                  <div className="flex bg-white shadow-sm drop-shadow-lg p-6 rounded-xl ">
                    <img
                      src={lowestRiskUserRq20 && lowestRiskUserRq20.image}
                      className="w-14 h-14 rounded-full"
                    />
                    <div className="flex flex-col ml-2">
                      <h1>
                        {lowestRiskUserRq20 && lowestRiskUserRq20.username}
                      </h1>
                      <h1>
                        คะแนนอยู่ที่{" "}
                        <span className=" text-2xl">
                          {" "}
                          {lowestRiskUserRq20.total &&
                          lowestRiskUserRq20.total % 1 !== 0
                            ? lowestRiskUserRq20.total.toFixed(2)
                            : lowestRiskUserRq20.total}
                        </span>
                      </h1>
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/resultuser/${
                    lowestRiskUserRq3 && lowestRiskUserRq3.userId
                  }`}
                  className="flex flex-col items-center space-y-3 cursor-pointer "
                >
                  <h1 className="text-xl">
                    ผู้ที่มีคะแนนต่ำสุดในแบบประเมิน RQ 3
                  </h1>
                  <div className="flex bg-white shadow-sm drop-shadow-lg p-6 rounded-xl ">
                    <img
                      src={lowestRiskUserRq3 && lowestRiskUserRq3.image}
                      className="w-14 h-14 rounded-full"
                    />
                    <div className="flex flex-col ml-2">
                      <h1>{lowestRiskUserRq3 && lowestRiskUserRq3.username}</h1>
                      <h1>
                        คะแนนอยู่ที่{" "}
                        <span className=" text-2xl">
                          {" "}
                          {lowestRiskUserRq3.total &&
                            lowestRiskUserRq3.total.toFixed(2)}
                        </span>
                      </h1>
                    </div>
                  </div>
                </Link>
              </div>
              <hr className="w-full m-2" />
              <div className="flex justify-around p-6 mt-6 space-x-8 w-full max-sm:flex-col">
                <div className="flex flex-col items-center space-y-3">
                  <h1 className="text-xl text-center">
                    คะแนนโดยเฉลี่ย
                    <br /> แบบประเมิน MHL 29 ก่อนและหลัง
                  </h1>
                  <span className="badge badge-lg p-4 border-2 border-DB text-2xl font-semibold w-28 h-28 rounded-full ">
                    {averageRq29.value}
                  </span>
                  <h1>
                    อยู่ในระดับ : มีความรอบรู้ด้านสุขภาพจิต
                    <span className=" font-semibold ml-2 ">
                      {averageRq29.value >= 3.68
                        ? "มาก"
                        : averageRq29.value >= 2.34
                        ? "ปานกลาง"
                        : "น้อย"}
                    </span>
                  </h1>
                </div>
                <div className="flex flex-col items-center space-y-3 ">
                  <h1 className="text-xl text-center">
                    คะแนนโดยเฉลี่ย
                    <br /> แบบประเมิน RQ 20 ก่อนและหลัง
                  </h1>

                  <span className="badge badge-lg p-4 border-2 border-B text-2xl font-semibold w-28 h-28 rounded-full">
                    {sumAverageRq20.toFixed(2)}
                  </span>
                  <h1>
                    อยู่ในระดับ : คะแนนรวม
                    <span className=" font-semibold ml-2">
                      {sumAverageRq20 > 69
                        ? "สูง"
                        : sumAverageRq20 <= 69 && sumAverageRq20 > 55
                        ? "ปกติ"
                        : "ต่ํา"}
                    </span>
                  </h1>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <h1 className="text-xl text-center">
                    คะแนนเฉลี่ยคะแนนของ
                    <br />
                    แบบทดสอบ RQ 3 ก่อนและหลัง
                  </h1>
                  <span className="badge badge-lg p-4 border-2 border-LB text-2xl font-semibold w-28 h-28 rounded-full">
                    {averageRq3.value}
                  </span>
                  <h1>
                    อยู่ในระดับ : พลังใจ
                    <span className=" font-semibold ml-2">
                      {averageRq3.value > 7
                        ? "มาก"
                        : averageRq3.value >= 5
                        ? "ปานกลาง"
                        : "น้อย"}
                    </span>
                  </h1>
                </div>
              </div>

              <hr className="w-full m-2" />
              <div className="flex flex-col  items-center justify-center w-full pt-20 ">
                <BarChart data={averageRq20} width={800} height={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="คะแนนเฉลี่ยของแบบประเมิน RQ 20 ก่อนและหลัง"
                    fill="#0078b7"
                    label={{ fill: "white", fontSize: 20 }}
                    activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
                  />
                </BarChart>
              </div>
            </div>
          </>
        )}
        {selected === "day" && (
          <>
            <div className="flex items-center justify-center w-full bg-white p-10 rounded-2xl shadow-xl max-w-7xl">
              <div className="hidden  lg:w-1/4 h-[500px] bg-gradient-to-br from-DB via-B to-LB rounded-md shadow-md drop-shadow-lg  space-y-4 lg:flex flex-col p-4">
                <div className="mt-4 space-y-4">
                  <h1 className="text-lg text-white">เลือกวันที่</h1>
                  <h1 className=" text-white">ระหว่างวันที่</h1>
                  <input
                    className="btn  bg-white w-full"
                    min={"2024-01-01"}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                  />
                  <h1 className=" text-white">ถึงวันที่</h1>
                  <input
                    className="btn  bg-white w-full"
                    min={"2024-01-01"}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                  />
                  <div className="flex flex-row justify-center items-center">
                    <hr className="w-1/2" />
                    <h1 className="text-white p-2">หรือ</h1>
                    <hr className="w-1/2" />
                  </div>

                  <h1 className=" text-white">เลือกช่วงเวลา</h1>
                  <select
                    className="select select-bordered w-full"
                    onChange={(e) => setDateRange(e.target.value)}
                    value={dateRange}
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="today">วันนี้</option>
                    <option value="week">สัปดาห์นี้</option>
                    <option value="month">เดือนนี้</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: filterRq29.value ? filterRq29.value : 0,
                          label: "ความรอบรู้ทางสุขภาพจิต",
                          color: "#023e8a",
                        },
                        {
                          id: 1,
                          value: filterRq3.value ? filterRq3.value : 0,
                          label: "พลังใจ",
                          color: "#afd7f6",
                        },
                      ],
                      arcLabel: (data) => `${data.value}`,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontWeight: "semibold",
                      fontSize: "20px",
                      letterSpacing: "1px",
                    },
                  }}
                  width={600}
                  height={200}
                ></PieChart>
                <BarChart
                  data={filterRq20.length > 0 ? filterRq20 : averageRq20}
                  width={800}
                  height={500}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="คะแนนเฉลี่ยของแบบทดสอบ RQ 20 ก่อนและหลัง"
                    fill="#0078b7"
                    label={{ fill: "white", fontSize: 20 }}
                    activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
                  />
                </BarChart>
              </div>
            </div>
          </>
        )}
      </main>
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
  );
}
