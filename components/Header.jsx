
// import { Link } from "react-router-dom";
// import logo from "../src/assets/react.svg"; // change to your actual logo path
// import CartIcon from "./CartIcon.jsx";

// export default function Header() {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2">
//           <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
//           <h1 className="text-xl font-semibold text-gray-800">My Website</h1>
//         </div>

//         {/* Navigation Links */}
//         <div className="space-x-6">
//           <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
//           <Link to="/product" className="text-gray-600 hover:text-blue-600">Product</Link>
//           <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
//           <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
//           <Link to="/cart" className="text-gray-600 hover:text-blue-600"><CartIcon/></Link>
//         </div>
//       </div>
//     </header>
//   );
// }



import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../src/assets/react.svg"; // your logo path
import CartIcon from "./CartIcon.jsx";
import UserInfo from "./UserInfo.jsx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md relative z-50"> {/* Added relative and z-50 */}
  <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative z-50">
    {/* Logo Section */}
    <div className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
      <h1 className="text-xl font-semibold text-gray-800">My Website</h1>
    </div>

    {/* Hamburger Button */}
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-blue-600 focus:outline-none"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>

    {/* Navigation Links */}
    <nav
      className={`flex-col md:flex-row md:flex items-center gap-6 absolute md:static bg-white md:bg-transparent w-full left-0 md:w-auto md:space-x-6 transition-all duration-300 ${
        isOpen ? "top-full flex py-4 px-4 shadow-md z-50" : "top-[-490px] hidden md:flex"
      }`}
    >
      <Link to="/" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
      <Link to="/product" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Product</Link>
      <Link to="/about" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link>
      <Link to="/contact" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</Link>
      <Link to="/cart" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}><CartIcon/></Link>
      {/* USER INFO HERE (mobile view) */}
          <div className="mt-2">
            <UserInfo/>
          </div>

    </nav>
    
  </div>
</header>

  );
}
