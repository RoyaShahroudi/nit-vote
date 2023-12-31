import {FC, SetStateAction, useState} from "react";
import Input from "../../components/Input";
import FormAction from "../../components/FormAction";
import VoteImage from "../../images/vote.svg"
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../utils/auth";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import List from "../../components/List";

const Login: FC<{}> = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleLogin()
    }

    const handleLogin = () => {
        setLoading(true)
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/student/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentNumber: username,
                password: password
            })
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    console.log("res login: ", res)
                    // @ts-ignore
                    auth?.login(response?.headers?.get('Authorization'), res.studentNumber);
                    console.log("token: ", response?.headers?.get('Authorization'));
                    navigate("/elections");
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
            <div>
                <div className="mb-10">
                    <div className="flex justify-center items-center">
                        <img
                            alt=""
                            className="h-14 w-14"
                            src={VoteImage}/>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        ورود به حساب کاربری
                    </h2>
                </div>
                <form className="mt-8 space-y-6 flex justify-center" onSubmit={handleSubmit}>
                    <div className="">
                        <Input
                            key="username"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
                            value={username}
                            labelText="شماره دانشجویی"
                            labelFor="username"
                            id="username"
                            name="username"
                            isRequired={true}
                            placeholder="شماره دانشجویی"
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
                        <div className="mt-3">
                            حساب کاربری ندارید؟
                            <Link to="/register" className="mr-1 text-primary-blue">
                                ثبت نام کنید
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
