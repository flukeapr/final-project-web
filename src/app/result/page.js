"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
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
import FilterSection from "../components/ResultComponents/FilterSection";
import ResultTable from "../components/ResultComponents/ResultTable";
import { QuizCalculations } from "../components/ResultComponents/Function/QuizCalculations";

export default function Result() {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selected, setSelected] = useState("all");
  const [averageRq20, setAverageRq20] = useState([]);
  const [averageRq29, setAverageRq29] = useState([]);
 const [scorePreAndPostTest,setScorePreAndPostTest] = useState({
  scorePretestRq29:0,
  scorePretestRq3:0,
  scorePretestRq20:0,
  scorePosttestRq29:0,
  scorePosttestRq3:0,
  scorePosttestRq20:0
 });
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
  const [searchAge,setSearchAge] = useState('')
  const [searchGender,setSearchGender] = useState('')
  const [searchFaculty,setSearchFaculty] = useState('')
 

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
  useEffect(() => {
    const scores = QuizCalculations(allData);
    setScorePreAndPostTest(scores);
  }, [allData]);


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
            
            <FilterSection
              search={search}
              setSearch={setSearch}
              searchAge={searchAge}
              setSearchAge={setSearchAge}
              searchGender={searchGender}
              setSearchGender={setSearchGender}
              searchFaculty={searchFaculty}
              setSearchFaculty={setSearchFaculty}
              searchQuizName={searchQuizName}
              setSearchQuizName={setSearchQuizName}
            />

          <ResultTable 
            allData={allData}
            filterData={filterData}
            search={search}
            searchAge={searchAge}
            searchGender={searchGender}
            searchFaculty={searchFaculty}
            searchQuizName={searchQuizName}
          />
          </div>
        )}
        {selected === "all" && (
          <>
            <div className="flex flex-col  items-center justify-center w-full bg-white p-10 rounded-2xl shadow-xl">
              <hr className="w-full m-2" />
              <div className="flex flex-col items-center justify-center w-full my-2">
                <div className="flex flex-col items-center justify-center w-full my-2">
                <h1 className="text-xl font-semibold">ผู้ที่มีคะแนนต่ำสุดในแต่ละแบบประเมิน</h1>
                </div>
                <div className="flex p-4 max-w-6xl justify-around w-full">
                <Link
                  href={`/resultuser/${
                    lowestRiskUserRq29 && lowestRiskUserRq29.userId
                  }`}
                  className="flex flex-col items-center space-y-3 cursor-pointer "
                >
                  <h1 className="text-xl">
                  แบบประเมิน MHL 29
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
                   แบบประเมิน RQ 20
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
                    แบบประเมิน RQ 3
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
              </div>
               
              
              
              <hr className="w-full m-2" />
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full my-2">
                  <h1 className="text-xl font-semibold">คะแนนโดยเฉลี่ยของแบบประเมิน MHL 29</h1>
                </div>
              <div className="flex justify-evenly p-6  space-x-8 w-full max-sm:flex-col">
                {/* ก่อนกิจกรรม */}
                <div className="flex flex-col items-center space-y-3">
                  <h1 className="text-xl text-center">
                    ก่อนกิจกรรม
                  </h1>
                  <span className="badge badge-lg p-4 border-2 border-DB text-2xl font-semibold w-28 h-28 rounded-full ">
                    {scorePreAndPostTest.PretestRq29 || 0}
                  </span>
                  <h1>
                    อยู่ในระดับ : มีความรอบรู้ด้านสุขภาพจิต
                    <span className=" font-semibold ml-2 ">
                      {scorePreAndPostTest.PretestRq29 >= 3.68
                        ? "มาก"
                        : scorePreAndPostTest.PretestRq29 >= 2.34
                        ? "ปานกลาง"
                        : "น้อย"}
                    </span>
                  </h1>
                </div>
                 {/* หลังกิจกรรม */}
                 <div className="flex flex-col items-center space-y-3">
                  <h1 className="text-xl text-center">
                  หลังกิจกรรม
                  </h1>
                  <span className="badge badge-lg p-4 border-2 border-DB text-2xl font-semibold w-28 h-28 rounded-full ">
                    {scorePreAndPostTest.PostRq29 || 0}
                  </span>
                  <h1>
                    อยู่ในระดับ : มีความรอบรู้ด้านสุขภาพจิต
                    <span className=" font-semibold ml-2 ">
                      {scorePreAndPostTest.PostRq29 >= 3.68
                        ? "มาก"
                        : scorePreAndPostTest.PostRq29 >= 2.34
                        ? "ปานกลาง"
                        : "น้อย"}
                    </span>
                  </h1>
                </div>
                
              </div>
              </div>
            
              <hr className="w-full m-2" />
              <div className="flex flex-col items-center justify-center w-full my-2">
                <div className="flex flex-col items-center justify-center w-full my-2">
                  <h1 className="text-xl font-semibold">คะแนนโดยเฉลี่ยของแบบประเมิน RQ 20</h1>
                </div>
                <div className="flex justify-evenly p-6 mt-6 space-x-8 w-full max-sm:flex-col">
                    {/* ก่อนกิจกรรม */}
              <div className="flex flex-col items-center space-y-3 ">
                  <h1 className="text-xl text-center">
                    ก่อนกิจกรรม
                  </h1>

                  <span className="badge badge-lg p-4 border-2 border-B text-2xl font-semibold w-28 h-28 rounded-full">
                    {scorePreAndPostTest.PretestRq20 || 0}
                  </span>
                  <h1>
                    อยู่ในระดับ : คะแนนรวม
                    <span className=" font-semibold ml-2">
                      {scorePreAndPostTest.PretestRq20 > 69
                        ? "สูง"
                        : scorePreAndPostTest.PretestRq20 <= 69 && scorePreAndPostTest.PretestRq20 > 55
                        ? "ปกติ"
                        : "ต่ํา"}
                    </span>
                  </h1>
                </div>
                {/* หลังกิจกรรม */}
                <div className="flex flex-col items-center space-y-3 ">
                  <h1 className="text-xl text-center">
                   หลังกิจกรรม
                  </h1>

                  <span className="badge badge-lg p-4 border-2 border-B text-2xl font-semibold w-28 h-28 rounded-full">
                    {scorePreAndPostTest.PostRq20 || 0}
                  </span>
                  <h1>
                    อยู่ในระดับ : คะแนนรวม
                    <span className=" font-semibold ml-2">
                      {scorePreAndPostTest.PostRq20 > 69
                        ? "สูง"
                        : scorePreAndPostTest.PostRq20 <= 69 && scorePreAndPostTest.PostRq20 > 55
                        ? "ปกติ"
                        : "ต่ํา"}
                    </span>
                  </h1>
                </div>
              </div>
              </div>

            
              <hr className="w-full m-2" />
              <div className="flex flex-col items-center justify-center w-full my-2">
                <div className="flex flex-col items-center justify-center w-full my-2">
                  <h1 className="text-xl font-semibold">คะแนนโดยเฉลี่ยของแบบประเมิน RQ 3</h1>
                </div>
                <div className="flex justify-evenly p-6 mt-6 space-x-8 w-full max-sm:flex-col">
                {/* ก่อนกิจกรรม */}
              <div className="flex flex-col items-center space-y-3">
                  <h1 className="text-xl text-center">
                  ก่อนและหลัง
                  </h1>
                  <span className="badge badge-lg p-4 border-2 border-LB text-2xl font-semibold w-28 h-28 rounded-full">
                    {scorePreAndPostTest.PretestRq3 || 0}
                  </span>
                  <h1>
                    อยู่ในระดับ : พลังใจ
                    <span className=" font-semibold ml-2">
                      {scorePreAndPostTest.PretestRq3 > 7
                        ? "มาก"
                        : scorePreAndPostTest.PretestRq3 >= 5
                        ? "ปานกลาง"
                        : "น้อย"}
                    </span>
                  </h1>
                </div>
                {/* หลังกิจกรรม */}
                <div className="flex flex-col items-center space-y-3">
                  <h1 className="text-xl text-center">
                   หลังกิจกรรม
                  </h1>
                  <span className="badge badge-lg p-4 border-2 border-LB text-2xl font-semibold w-28 h-28 rounded-full">
                    {scorePreAndPostTest.PostRq3 || 0}
                  </span>
                  <h1>
                    อยู่ในระดับ : พลังใจ
                    <span className=" font-semibold ml-2">
                      {scorePreAndPostTest.PostRq3 > 7
                        ? "มาก"
                        : scorePreAndPostTest.PostRq3 >= 5
                        ? "ปานกลาง"
                        : "น้อย"}
                    </span>
                  </h1>
                </div>
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
            <BarChart
              data={[
                {name:"ความรอบรู้ทางสุขภาพจิต",value:averageRq29.value},
                {name:"พลังใจ",value:averageRq3.value}
              ]}
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
                name="คะแนนเฉลี่ยของแบบประเมิน RQ 29 และ RQ 3"
                fill="#023e8a"
                label={{ fill: "white", fontSize: 20 }}
                activeBar={<Rectangle fill="#38bdf8" stroke="white" />}
              />
            
            </BarChart>
            <hr className="w-full m-2" />
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
