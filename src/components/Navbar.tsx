import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"

interface HeaderProps {
    admin?: boolean;
    text: string;
}

const adminButtons = [
    {
        label: "ایجاد انتخابات جدید",
        linkUrl: "/admin/new-election"
    },
    {
        label: "انتخابات درحال اجرا",
        linkUrl: "/admin/elections"
    },
    {
        label: "لیست ادمین ها",
        linkUrl: "/admin/admins"
    },
    {
        label: "ایجاد ادمین جدید",
        linkUrl: "/admin/new-admin"
    }];

const clientButtons = [
    {
        label: "تاریخچه انتخابات",
        linkUrl: "/elections-history"
    },
    {
        label: "انتخابات درحال اجرا",
        linkUrl: "/elections"
    }];

const Header: FC<HeaderProps> = ({admin = false, text}) => {

    return (
        <div className="bg-blue-600 py-5">
            <div className="container px-3 flex justify-between">
                <div className="text-white text-lg font-bold">
                    {text}
                </div>
                <div>
                    {admin ? (adminButtons.map(({label, linkUrl}) => {
                            return <Link to={linkUrl}
                                         className="text-white rounded-xl px-2 py-1 ml-2 hover:bg-white hover:text-blue-700 focus:bg-white focus:text-blue-700">{label}</Link>
                        })
                    ) : (clientButtons.map(({label, linkUrl}) => {
                            return <Link to={linkUrl}
                                         className="text-white rounded-xl px-2 py-1 ml-2 hover:bg-white hover:text-blue-700 focus:bg-white focus:text-blue-700">{label}</Link>
                        })
                    )}
                </div>
            </div>

        </div>
    );
}

export default Header;

// import { useState } from "react";
//
// export default function Navbar() {
//     const [navbar, setNavbar] = useState(false);
//
//     return (
//         <nav className="w-full bg-white shadow">
//             <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
//                 <div>
//                     <div className="flex items-center justify-between py-3 md:py-5 md:block">
//                         <a href="javascript:void(0)">
//                             <h2 className="text-2xl font-bold">LOGO</h2>
//                         </a>
//                         <div className="md:hidden">
//                             <button
//                                 className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
//                                 onClick={() => setNavbar(!navbar)}
//                             >
//                                 {navbar ? (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                     >
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                 ) : (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth={2}
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M4 6h16M4 12h16M4 18h16"
//                                         />
//                                     </svg>
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div
//                         className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//                             navbar ? "block" : "hidden"
//                         }`}
//                     >
//                         <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
//                             <li className="text-gray-600 hover:text-blue-600">
//                                 <a href="javascript:void(0)">Home</a>
//                             </li>
//                             <li className="text-gray-600 hover:text-blue-600">
//                                 <a href="javascript:void(0)">Blog</a>
//                             </li>
//                             <li className="text-gray-600 hover:text-blue-600">
//                                 <a href="javascript:void(0)">About US</a>
//                             </li>
//                             <li className="text-gray-600 hover:text-blue-600">
//                                 <a href="javascript:void(0)">Contact US</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }