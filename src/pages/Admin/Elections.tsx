import React, {FC, useEffect, useState} from "react";
import Header from "../../components/Navbar";
import {getTokens} from "../../utils";
import ListItem from "../../components/ListItem";
import {useNavigate} from "react-router-dom";

interface ElectionState {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    requirements?: string;
}

const Elections: FC<{}> = () => {

    const [elections, setElections] = useState<ElectionState[]>();
    const navigate = useNavigate();

    useEffect(() => {
        getElections()
    }, []);

    const getElections = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/in-progress`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    setElections(res);
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
            <Header admin text="انتخابات درحال اجرا"/>
            <div className="container px-3 ">
                {/*<List items={elections} onClickItem={() => console.log("onClick...")} resultButton={true} ordered/>*/}
                {elections && elections.length ? (
                    elections.map(item => {
                        return (
                            <ListItem onClickItem={() => {
                                navigate(`/admin/election-result/${item.id}`)
                            }}>
                                <div>
                                    {item.name ? (<span>{item.name}</span>) : null}
                                </div>
                                {
                                   <button
                                        className="px-2 py-1 text-white bg-blue-600 hover:text-blue-700 hover:bg-white focus:text-blue-700 focus:bg-white">
                                        دیدن نتایج
                                    </button>
                                }
                            </ListItem>
                        )
                    })
                ) : null}
            </div>
        </>
    )
}

export default Elections
