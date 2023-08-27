import {FC, useEffect, useState} from "react";
import Header from "../../components/Navbar";
import List from "../../components/List";
import {getTokens} from "../../utils";

const Elections: FC<{}> = () => {

    const [elections, setElections] = useState([]);

    useEffect(() => {
        getElections()
    }, []);


    const getElections = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/by-student-id`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then((response: any) => response.json()).then(res => {
            console.log("res: ", res)
            setElections(res);
        }).catch((error) => {
            console.log("error: ", error)
        })
    }


    return (
        <>
            <Header text="انتخابات درحال اجرا که شما امکان شرکت در آنها را دارید"/>
            <div className="container px-3 ">
                <List items={elections} onClickItem={() => console.log("onClick...")}/>
            </div>
        </>
    )
}

export default Elections
