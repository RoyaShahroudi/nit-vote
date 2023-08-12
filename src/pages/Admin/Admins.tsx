import {FC, SetStateAction, useState} from "react";
import Header from "../../components/Navbar";
import List from "../../components/List";
import login from "./Login";

const items = [
    {
        id: 0,
        label:"admin 1"
    }
    ,
    {
        id: 1,
        label:"admin 2"
    },
    {
        id: 2,
        label:"admin 3"
    }
]

const Admins: FC<{}> = () => {


    return (
        <>
            <Header admin text="ادمین ها"/>
            <div className="container px-3 ">
                <List items={items} onClickItem={() => console.log("onClick...")} ordered />
            </div>
        </>
    )
}

export default Admins
