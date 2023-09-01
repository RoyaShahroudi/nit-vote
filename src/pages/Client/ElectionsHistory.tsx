import {FC, SetStateAction, useEffect, useState} from "react";
import Header from "../../components/Header";
import List from "../../components/List";
import login from "./Login";
import {getTokens} from "../../utils";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const Elections: FC<{}> = () => {
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getElections()
    }, []);

    const getElections = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/get-elections-history-for-student`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then((response: any) => response.json()).then(res => {
            console.log("res: ", res)
            setElections(res);
        }).catch((error) => {
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
                    انتخاباتی که شما در آنها شرکت کرده اید.
                </div>
                {loading ? <Loading/> :
                    <List items={elections} resultButton resultUrl="/election-result"/>
                }
            </>
        </Layout>
    )
}

export default Elections
