import {FC} from "react";
import Header from "./Header";
import {LayoutProps} from "../constants/types";

const Layout: FC<LayoutProps> = ({admin = false, header = true, children}) => {

    return (
        <div className="flex flex-col min-h-screen h-auto text-gray-600">
            {header ? <Header admin={admin}/> : null}
            <div className={`${!admin ? "bg-[url('./src/images/wave-blue.svg')] lg:bg-[url('./src/images/wave.svg')] xl:bg-[url('./src/images/wave-blue.svg')] bg-no-repeat bg-bottom h-[calc(100vh-48px)]" : ""}`}>
                <div className="container pt-24">
                    {/* @ts-ignore*/}
                    {children}
                </div>
            </div>

            <footer className="mt-auto bg-primary-blue text-gray-300 py-3">
                <div className="container flex justify-center align-center">
                    <span className="text-center">سامانه رای‌گیری انجمن‌‌های علمی دانشگاه صنعتی نوشیروانی بابل</span>
                </div>
            </footer>
        </div>
    );
}

export default Layout;