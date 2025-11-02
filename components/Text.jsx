import { useState } from "react";

export default function Test() {

    const[count,setCount] = useState(0)



   



  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-[300px] h-[400px] shadow-2xl flex justify-evenly items-center bg-white rounded-xl">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" 
        onClick={()=>{
            setCount(count+1)
        }}>increse</button>

        <h1 className="w-[50px] h-[3px] flex justify-center items-center ">{count}</h1>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" 
        onClick={()=>{
           setCount(count-1)
        }}>decrese</button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" 
        onClick={()=>{
           setCount(0)
        }}>set=0</button>
      </div>
    </div>
  );
}
