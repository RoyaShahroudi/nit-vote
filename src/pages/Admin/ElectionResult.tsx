import React, {FC, useEffect, useState} from "react";
import Header from "../../components/Navbar";
import {useParams} from "react-router-dom";
import {getTokens} from "../../utils";
import FormAction from "../../components/FormAction";

interface ElectionState {
    electionName: string;
    candidateResults?: {candidate: {
        id: number ,
        name: string,
        info: string
        },
    voteCount: number ,
    }[]
}

const ElectionResult: FC<{}> = () => {
    const [election, setElection] = useState<ElectionState>();
    const params = useParams();

    useEffect(() => {
        getElectionResult()
    }, []);

    const getElectionResult = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/result/${params.id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    console.log("getElectionResult: ", res)
                    setElection(res);
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
            <Header admin text="نتایج"/>
            <div className="container px-3 ">
                <div className="mb-5">
                    {election && election.electionName}
                </div>
                {election && election.candidateResults && election.candidateResults.length ? (
                    election.candidateResults.map(item => {
                        return (
                            <div
                                className="flex justify-between w-96 px-2 py-2 mb-3 bg-blue-600 text-white">
                                <div>
                                    {item.candidate && item.candidate.name ? (
                                        <span>{item.candidate.name}</span>) : null}
                                    -
                                    {item.candidate && item.candidate.info ? (
                                        <span>{item.candidate.info}</span>) : null}
                                </div>
                                <div>
                                    {item.voteCount} رای
                                </div>
                            </div>
                        )
                    })
                ) : null}
            </div>
            <FormAction handleSubmit={getElectionResult} text="بروزرسانی" />
        </>
    )
}

export default ElectionResult
