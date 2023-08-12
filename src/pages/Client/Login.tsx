import {FC, SetStateAction, useState} from "react";
import Input from "../../components/Input";
import FormAction from "../../components/FormAction";
import VoteImage from "../../images/vote.svg"
import axios from "axios";
import {setToken} from "../../utils";

const Login: FC<{}> = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleLogin()
    }


    const handleLogin = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/v1/student/login`, {
            studentNumber: username
        }
        )
            .then((response: any) => {
                setToken(response?.headers?.get('Authorization'));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="h-screen flex justify-center items-center">
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
                            // isRequired={true}
                            isRequired={false}
                            placeholder="رمز عبور"
                        />
                        <FormAction handleSubmit={handleSubmit} text="ورود"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
