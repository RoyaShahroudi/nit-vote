import {FC, SetStateAction, useState} from "react";
import Input from "../../components/Input";
import FormAction from "../../components/FormAction";
import VoteImage from "../../images/vote.svg"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../utils/auth";
import Layout from "../../components/Layout";

const Register: FC<{}> = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleRegister()
    }

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setPasswordError(true)
        } else {
            setLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/student/register`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentNumber: username,
                    password: password
                })
            })
                .then(async (response: any) => {
                    setPasswordError(false);
                    const res = await response.json();
                    // @ts-ignore
                    auth?.login(response?.headers?.get('Authorization'), res.studentNumber);
                    navigate("/elections");
                })
                .catch((error) => {
                    console.error(error);
                }).finally(() => {
                    setLoading(false)
            });
        }
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
                        ثبت حساب کاربری
                    </h2>
                </div>
                <form className="mt-8 space-y-6 flex justify-center" onSubmit={handleSubmit}>
                    <div className="">
                        <Input
                            key="username"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                                setUsername(e.target.value);
                                setPasswordError(false)
                            }}
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
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                                setPassword(e.target.value)
                                setPasswordError(false)
                            }}
                            value={password}
                            labelText="رمز عبور"
                            labelFor="password"
                            id="password"
                            name="password"
                            type="password"
                            isRequired={true}
                            placeholder="رمز عبور"
                        />
                        <Input
                            key="confirmPassword"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            labelText="تایید رمز عبور"
                            labelFor="confirmPassword"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            isRequired={true}
                            placeholder="تایید رمز عبور"
                        />
                        {<span
                            className={`${passwordError ? "text-opacity-100" : "text-opacity-0"} text-red-500 text-sm`}>رمزعبورهای انتخاب شده مطابقت ندارند.</span>}
                        <FormAction loading={loading} handleSubmit={handleSubmit} text="ثبت نام" className="w-full"/>
                        <div className="mt-3">
                            حساب کاربری دارید؟
                            <Link to="/login" className="mr-1 text-primary-blue">
                                وارد شوید
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register
