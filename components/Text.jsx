import { useState } from "react";
//https://rzzvovavivrvktpgxrhy.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6enZvdmF2aXZydmt0cGd4cmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzQ3NTUsImV4cCI6MjA3ODExMDc1NX0.MW5RxyY8PgEe6_1ik6G48RO_d17Rg4H6XUKxMDu6qWM

export default function Test() {

    //const[count,setCount] = useState(0)



   



  return (
    <div className="w-full h-full flex items-center justify-center">

      <input type="file" onChange={(e)=>{
        console.log(e.target.file);}}/>

    </div>
    
  );
}
// <div className="w-full h-screen flex justify-center items-center overflow-hidden overflow-x-hidden">
    //   <div className="w-[300px] h-[400px] shadow-2xl flex justify-evenly items-center bg-white rounded-xl overflow-hidden">
    //     <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" 
    //     onClick={()=>{
    //         setCount(count+1)
    //     }}>increse</button>

    //     <h1 className="w-[50px] h-[3px] flex justify-center items-center ">{count}</h1>

    //     <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" 
    //     onClick={()=>{
    //        setCount(count-1)
    //     }}>decrese</button>

    //     <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" 
    //     onClick={()=>{
    //        setCount(0)
    //     }}>set=0</button>
    //   </div>
    // </div>