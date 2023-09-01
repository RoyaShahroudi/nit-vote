import {useAuth} from "../utils/auth";
import {FC, useState} from "react";
import VoteImage from "../images/vote.svg"
import {Link, useNavigate} from "react-router-dom";
import {HeaderProps} from "../constants/types";

const adminButtons = [
    {
        label: "ایجاد انتخابات جدید",
        linkUrl: "/admin/new-election"
    },
    {
        label: "لیست انتخابات ",
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
        label: "تاریخچه انتخابات ",
        linkUrl: "/elections-history"
    },
    {
        label: "انتخابات درحال اجرا",
        linkUrl: "/elections"
    }];

const Header: FC<HeaderProps> = ({admin}) => {
    const [navbar, setNavbar] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // @ts-ignore
        auth?.logout();
        admin ? navigate("/admin/login") : navigate("/login");
    }

    return (
        <nav className="w-full bg-white shadow fixed z-10">
            <div className="container justify-between mx-auto md:items-center md:flex">
                <div>
                    <div className="flex items-center justify-between py-3 md:block">
                        <div className="flex justify-center items-center">
                            <Link to="/elections">
                                <div className="flex justify-center items-center w-10 h-10">
                                    <img
                                        alt=""
                                        className="h-14 w-14"
                                        src={VoteImage}/>
                                </div>
                            </Link>
                            <span className="mr-4 font-bold text-gray-600">
                                {/*// @ts-ignore*/}
                                {auth?.user}
                            </span>
                        </div>

                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 outline-none"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-5 md:flex md:space-y-0">
                            {admin ? (adminButtons.map(({label, linkUrl}) => {
                                return <li className="text-gray-600 hover:text-primary-blue md:pr-4"><Link
                                    to={linkUrl}>{label}</Link></li>
                            })) : (clientButtons.map(({label, linkUrl}) => {
                                    return <li className="text-gray-600 hover:text-primary-blue md:pr-4"><Link
                                        to={linkUrl}>{label}</Link></li>
                                })
                            )}
                            <li className="text-gray-600 hover:text-red-600 hover:cursor-pointer md:pr-4 "
                                onClick={handleLogout}><span>خروج</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;