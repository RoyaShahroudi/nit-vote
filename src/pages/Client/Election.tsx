import React, {FC, SetStateAction, useEffect, useState} from "react";
import Header from "../../components/Header";
import List from "../../components/List";
import login from "./Login";
import ListItem from "../../components/ListItem";
import {getTokens} from "../../utils";
import {useParams} from "react-router-dom";
import {CandidatesState, ElectionState} from "../../constants/types";
import Select, {MultiValue, SingleValue} from "react-select";
import makeAnimated from "react-select/animated";
import FormAction from "../../components/FormAction";
import Layout from "../../components/Layout";

const Election: FC<{}> = () => {
    const [election, setElection] = useState<ElectionState>();
    const [candidates, setCandidates] = useState<CandidatesState[]>();
    const [selectedCandidate, setSelectedCandidate] = useState<SingleValue<CandidatesState>>();
    const [getCandidateLoading, setGetCandidateLoading] = useState(true);
    const [submitVoteLoading, setSubmitVoteLoading] = useState(false);
    const params = useParams();
    const animatedComponents = makeAnimated();

    useEffect(() => {
        getElectionDetails();
        getCandidates();
    }, []);

    const getElectionDetails = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/student/${params.id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    console.log("election: ", res)
                    setElection(res)
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        })
    }


    const getCandidates = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/get-candidates-for-students/${params.id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    const newList: CandidatesState[] = [];
                    res.map((candidate: { id: number; name: string; }) => {
                        newList.push({
                            value: candidate.id,
                            label: candidate.name
                        })
                    })
                    setCandidates(newList);
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        }).finally(() => {
            setGetCandidateLoading(false);
        })
    }


    const handleSubmitVote = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (selectedCandidate) {
            setSubmitVoteLoading(true)
            const tokens = getTokens();
            fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/vote/submit`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokens?.token}`
                },
                body: JSON.stringify({
                    electionId: params.id && +params.id,
                    candidateId: selectedCandidate.value,
                })
            }).then(async (response: any) => {
                    if (response.ok) {
                        // const res = await response.json();
                        // addCandidatesToElection(res.id);
                    } else {
                        throw new Error('Error: ' + response.status);
                    }
                }
            ).catch(error => {
                console.log("error: ", error)
            }).finally(() => {
                setSubmitVoteLoading(false)
            })
        } else {
            console.log("Fill all inputs")
        }

    }

    return (
        <Layout>
            {/* @ts-ignore */}
            <>
                <div className="font-bold text-gray-600 mb-6 mt-4">
                     {election && election.name}
                </div>
                <form className="mt-8 space-y-6 flex flex-col justify-center" onSubmit={handleSubmitVote}>
                    <div className="mb-4">
                        از لیست زیر فرد منتخب خود را انتخاب کنید و سپس رای خود را ثبت کنید.
                    </div>
                    <Select
                        name="candidates"
                        options={candidates}
                        className="max-w-[400px] basic-multi-select"
                        value={selectedCandidate}
                        onChange={(selected) => {
                            // @ts-ignore
                            setSelectedCandidate(selected)
                        }}
                        classNamePrefix="select"
                        placeholder="نامزدهای انتخابات"
                        components={animatedComponents}
                        isDisabled={getCandidateLoading}
                    />
                    <FormAction loading={submitVoteLoading} handleSubmit={handleSubmitVote} text="ثبت رای"/>
                </form>
            </>
        </Layout>
    )
}

export default Election
