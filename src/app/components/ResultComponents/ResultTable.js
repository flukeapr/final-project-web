import { TABLE_HEAD } from "../../../../Constants/quizConfig";
export default function ResultTable({ 
    allData,
    filterData,
    search,
    searchAge,
    searchGender,
    searchFaculty,
    searchQuizName
 }) {
    return (
      <div className="overflow-x-auto ml-2">
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            {TABLE_HEAD.map((item)=>{
              return <th>{item}</th>
            })}
          </thead>
          
          {allData
                  .map((data, index) => ({ ...data, originalIndex: index + 1 }))
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
                  .filter((data)=>{
                    if(!searchAge || searchAge === "all"){
                      return true
                    }
                    return data.age === searchAge
                  })
                  .filter((data)=>{
                    if(!searchGender || searchGender === "all"){
                      return true
                    }
                    return data.gender === searchGender
                  })
                  .filter((data)=>{
                    if (!searchFaculty || searchFaculty === "all") {
                      return true;
                    }
                    return data.faculty === searchFaculty;
                  })
                  .map((data) => (
                    <tbody>
                      {/* row 1 */}
                      <tr className="hover">
                        <td>{data.originalIndex}</td>
                        <td>{data.username}</td>
                        <td>{data.age}</td>
                        <td>{data.gender}</td>
                        <td>{data.faculty}</td>
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
    );
  }