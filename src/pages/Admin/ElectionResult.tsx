import React, {FC, SetStateAction, useState} from "react";
import Header from "../../components/Navbar";
import List from "../../components/List";
import login from "./Login";

const items = [
    {
        id: 0,
        label: "Candidate 1",
        voteCount: 3
    }
    ,
    {
        id: 1,
        label: "Candidate 2",
        voteCount: 5
    },
    {
        id: 2,
        label: "Candidate 3",
        voteCount: 1
    }
]

const ElectionResult: FC<{}> = () => {


    return (
        <>
            <Header admin text="نتایج"/>
            <div className="container px-3 ">
                <div className="mb-5">
                    voting subject
                </div>
                {items && items.length ? (
                    items.map(item => {
                        return (
                            <div
                                className="flex justify-between w-96 px-2 py-2 mb-3 bg-blue-600 text-white">
                                <div>
                                    <span>{item.id + 1}. </span>
                                    {item.label ? (<span>{item.label}</span>) : null}
                                </div>
                                <div>
                                    {item.voteCount} رای
                                </div>
                            </div>
                        )
                    })
                ) : null}
            </div>
        </>
    )
}

export default ElectionResult
