import {FC, useEffect, useState} from "react";
import Header from "../../components/Navbar";
import List from "../../components/List";
import login from "./Login";
import {getTokens} from "../../utils";

interface AdminState {
    electionName: string;
    candidateResults?: {candidate: {
            id: number ,
            name: string,
            info: string
        },
        voteCount: number ,
    }[]
}

const Admins: FC<{}> = () => {
    const [admins, setAdmins] = useState<AdminState[]>([]);

    useEffect(() => {
        getAdmins()
    }, []);

    const getAdmins = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/admin/`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    setAdmins(res);
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        })
    }


    return (
        <>
            <Header admin text="ادمین ها"/>
            <div className="container px-3 ">
                <List items={admins} ordered />
            </div>
        </>
    )
}

export default Admins
