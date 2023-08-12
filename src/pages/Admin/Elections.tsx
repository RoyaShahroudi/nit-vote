import {FC, SetStateAction, useState} from "react";
import Header from "../../components/Navbar";
import List from "../../components/List";
import login from "./Login";

const items = [
    {
        id: 0,
        label:"election 1"
    }
    ,
    {
        id: 1,
        label:"election 2"
    },
    {
        id: 2,
        label:"election 3"
    }
]

const Elections: FC<{}> = () => {


    return (
        <>
           <Header admin text="انتخابات درحال اجرا"/>
            <div className="container px-3 ">
                <List items={items} onClickItem={() => console.log("onClick...")} resultButton={true} ordered />
            </div>
        </>
    )
}

export default Elections
