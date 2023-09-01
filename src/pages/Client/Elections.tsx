import {FC, useEffect, useState} from "react";
import Header from "../../components/Header";
import List from "../../components/List";
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
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/by-student-id`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then((response: any) => response.json()).then(res => {
            console.log("res: ", res)
            setElections(res);
        }).catch((error) => {
            console.log("error: ", error)
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <Layout>
            {/*// @ts-ignore*/}
            <>
                <div className="font-bold text-gray-600 mb-6">
                    انتخابات درحال اجرا که شما امکان شرکت در آنها را دارید.
                </div>
                {loading ? <Loading/> :
                    <List items={elections} url="/elections"/>
                }
            </>
        </Layout>
    )
}

export default Elections
