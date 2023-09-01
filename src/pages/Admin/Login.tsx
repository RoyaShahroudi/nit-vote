import {FC, SetStateAction, useState} from "react";
import Input from "../../components/Input";
import FormAction from "../../components/FormAction";
import VoteImage from "../../images/vote.svg"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../utils/auth";
import Layout from "../../components/Layout";

const Login: FC<{}> = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        loginAccount()
    }

    const loginAccount = async () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/admin/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({// @ts-ignore
                username: username,
                password: password
            })
        }).then(async (response: any) => {
                if (response.ok) {
                    console.log("res: ", response)
                    const token = response?.headers?.get('Authorization')
                    const res = await response.json();
                    // @ts-ignore
                    auth?.login(token, res.username);
                    console.log("token: ", token);
                    navigate("/admin/elections");
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Layout header={false}>
            {/*// @ts-ignore*/}
            <>
                <div className="mb-10">
                    <div className="flex justify-center items-center">
                        <img
                            alt=""
                            className="h-14 w-14"
                            src={VoteImage}/>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        ورود به پنل ادمین
                    </h2>
                </div>
                <form className="mt-8 space-y-6 flex justify-center" onSubmit={handleSubmit}>
                    <div className="">
                        <Input
                            key="username"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
                            value={username}
                            labelText="نام کاربری"
                            labelFor="username"
                            id="username"
                            name="username"
                            isRequired={true}
                            placeholder="نام کاربری"
                        />
                        <Input
                            key="password"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                            value={password}
                            labelText="رمز عبور"
                            labelFor="password"
                            id="password"
                            name="password"
                            type="password"
                            isRequired={true}
                            placeholder="رمز عبور"
                        />
                        <FormAction loading={loading} handleSubmit={handleSubmit} text="ورود" className="w-full"/>
                    </div>
                </form>
            </>
        </Layout>
    )
}

export default Login
