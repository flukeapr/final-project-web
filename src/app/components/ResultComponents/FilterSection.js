import { FACULTIES,AGE_GROUP,GENDER } from "../../../../Constants/quizConfig";

export default function FilterSection({ 
    search, setSearch, 
    searchAge, setSearchAge,
    searchGender, setSearchGender,
    searchFaculty, setSearchFaculty,
    searchQuizName, setSearchQuizName 
  }) {
    return (
      <div className="w-1/4 h-[800px] bg-gradient-to-br from-DB via-B to-LB rounded-md shadow-md p-6">
        <h1 className="text-lg text-white my-2">ค้นหาผู้ใช้</h1>
        <input
          type="search"
          value={search}
          className="w-full border-2 border-white rounded-lg p-4"
          placeholder="ค้นหาผู้ใช้"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-4 space-y-4">
                <h1 className="text-lg text-white">ค้นหาตามกลุ่มผู้ใช้</h1>
                  
                    
                    <select className="select w-full max-w-xs"
                     onChange={(e) => setSearchAge(e.target.value)}
                     value={searchAge}
                    >
                      <option value={'all'}  selected>อายุ</option>
                      {AGE_GROUP.map((item)=>{
                        return <option value={item}>{item}</option>
                      })}
                     
                    </select>
        
                    <select className="select w-full max-w-xs"
                     onChange={(e) => setSearchGender(e.target.value)}
                     value={searchGender}
                    >
                      <option value={'all'}  selected>เพศ</option>
                      {GENDER.map((item)=>{
                        return <option value={item}>{item}</option>
                      })}
                     
                     
                    </select>
                    <select className="select w-full max-w-xs"
                     onChange={(e) => setSearchFaculty(e.target.value)}
                     value={searchFaculty}
                    >
                      <option value={'all'}  selected>สำนักวิชา</option>
                      {FACULTIES.map((item)=>{
                        return <option value={item}>{item}</option>
                      })}
                     
                    </select>
        
              
              </div>
              <div className="mt-4 space-y-4">
                <h1 className="text-lg text-white">ค้นหาตามแบบประเมิน</h1>
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
    );
  }