import React, {FC, useEffect, useState} from "react";
import Header from "../../components/Header";
import {useParams} from "react-router-dom";
import {getTokens} from "../../utils";
import FormAction from "../../components/FormAction";
import {ElectionState} from "../../constants/types";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";


const ElectionResult: FC<{}> = () => {
    const [election, setElection] = useState<ElectionState>();
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getElectionResult()
    }, []);

    const getElectionResult = (e = null) => {
        // @ts-ignore
        e?.preventDefault();
        setLoading(true);
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/student/result/${params.id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    setElection(res);
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <Layout>
            {/*// @ts-ignore*/}
            <>
                <div className="font-bold text-gray-600 mb-6">
                    نتایج {election && election.electionName}
                </div>
                {loading ? <Loading/>
                    : election && election.candidateResults && election.candidateResults.length ? (
                        election.candidateResults.map(item => {
                            return (
                                <div
                                    className="mb-3 flex justify-between max-w-[400px] px-2 py-2 rounded-md bg-gray-100">

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
                    ) : <div>
                        درحال حاضر نتیجه این انتخابات قابل مشاهده نیست. روزهای آینده مجددا تلاش کنید.
                    </div>}
            </>
        </Layout>
    )
}

export default ElectionResult
