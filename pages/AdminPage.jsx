import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
    <div className="w-full h-full bg-amber-50 flex" >
       <div className="w-[300px] h-full bg-amber-300 flex flex-col  ">
        <h3 >admin page </h3>
        < Link to = "/admin">oders</Link>
        < Link to = "/admin/products">products</Link>
        < Link to = "/admin/users">users</Link>
        < Link to = "/admin/reviews">reviews</Link>
      
       </div>
       <div className="w-[calc(100%-300px)] h-full  bg-red-800 text-2xl overflow-y-scroll">
        
            <Routes path="/">
                <Route path="/" element={<h1>oders</h1>}/>
                <Route path="/products" element={<h1>products</h1>}/>
                <Route path="/users" element={<h1>users</h1>}/>
                <Route path="/reviews" element={<h1>reviews</h1>}/>

            </Routes>
       </div>
    </div>
    );



}