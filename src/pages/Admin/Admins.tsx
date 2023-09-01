import React, {FC, useEffect, useState} from "react";
import Header from "../../components/Header";
import List from "../../components/List";
import login from "./Login";
import {getTokens} from "../../utils";
import {AdminState} from "../../constants/types";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const Admins: FC<{}> = () => {
    const [admins, setAdmins] = useState<AdminState[]>([]);
    const [loading, setLoading] = useState(true);

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
        }).finally(() => {
            setLoading(false);
        })
    }


    return (
        <Layout admin>
            {/*// @ts-ignore*/}
            <>
                <div className="font-bold text-gray-600 mb-6">
                    لیست ادمین‌‌ها
                </div>
                {loading ?
                    <Loading/>
                    :
                    <List items={admins}/>
                }
            </>
        </Layout>
    )
}

export default Admins
