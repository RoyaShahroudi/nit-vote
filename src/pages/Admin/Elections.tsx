import React, {FC, useEffect, useState} from "react";
import Header from "../../components/Header";
import {getTokens} from "../../utils";
import ListItem from "../../components/ListItem";
import {useNavigate} from "react-router-dom";
import {ElectionState} from "../../constants/types";
import Layout from "../../components/Layout";
import List from "../../components/List";
import Loading from "../../components/Loading";

const Elections: FC<{}> = () => {
    const [elections, setElections] = useState([]);
    const [inProgressElections, setInProgressElections] = useState([]);
    const [loadingAll, setLoadingAll] = useState(true);
    const [loadingInProgress, setLoadingInProgress] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getInProgressElections();
        getAllElections();
    }, []);

    const getAllElections = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/all`, {
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
        }).finally(() => {
            setLoadingAll(false);
        })
    }

    const getInProgressElections = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/in-progress`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    setInProgressElections(res);
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        }).finally(() => {
            setLoadingInProgress(false);
        })
    }

    return (
        <Layout admin>
            {/*// @ts-ignore*/}
            <>
                <div>
                    <div className="font-bold text-gray-600 mb-6">
                        انتخابات در حال اجرا
                    </div>
                    {loadingInProgress ?
                        <Loading/>
                        :
                        <List items={inProgressElections} resultUrl="/admin/election-result" resultButton/>
                    }
                </div>
                <div>
                    <div className="font-bold text-gray-600 my-6">
                        همه انتخابات
                    </div>
                    {loadingAll ? <Loading/> :
                        <List items={elections} resultUrl="/admin/election-result" resultButton/>
                    }
                </div>
            </>
        </Layout>
    )
}

export default Elections
