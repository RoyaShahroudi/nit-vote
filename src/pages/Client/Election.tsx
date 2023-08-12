import {FC, SetStateAction, useState} from "react";
import Header from "../../components/Navbar";
import List from "../../components/List";
import login from "./Login";
import ListItem from "../../components/ListItem";

const items = [
    {
        id: 0,
        label: "election 1"
    }
    ,
    {
        id: 1,
        label: "election 2"
    },
    {
        id: 2,
        label: "election 3"
    }
]

const electionItem = {
    title: "Election 1",
    candidates: [
        {name: "candidate 1"},
        {name: "candidate 2"}
    ]
}

const Election: FC<{}> = () => {
    return (
        <>
            <Header text={electionItem.title}/>
            {/*<Header />*/}
            <div className="container px-3 ">
                <div className="mb-4">
                    از لیست زیر افراد منتخب خود را انتخاب کنید و سپس رای خود را ثبت کنید.
                </div>
                <div className="container px-3 ">
                    {electionItem && electionItem.candidates && electionItem.candidates.length ? (
                        electionItem.candidates.map(candidate => {
                            return (
                                <ListItem>
                                    {candidate.name}
                                </ListItem>
                            )
                        })
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Election
