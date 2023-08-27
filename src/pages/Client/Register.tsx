import {FC, SetStateAction, useState} from "react";
import Input from "../../components/Input";
import FormAction from "../../components/FormAction";
import VoteImage from "../../images/vote.svg"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../utils/auth";

const Register: FC<{}> = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleRegister()
    }

    const handleRegister = () => {
        if(password !== confirmPassword) {
            setPasswordError(true)
        } else {
            axios.post('http://localhost:8080/v1/student/register', {
                studentNumber: username,
                password: password
            })
                .then((response: any) => {
                    console.log(response.data);
                    // @ts-ignore
                    auth?.login(response?.headers?.get('Authorization'), response.data);
                    navigate("/elections");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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
                        ثبت حساب کاربری
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
                        {passwordError && <span>رمزعبورهای انتخاب شده مطابقت ندارند.</span>}
                        <FormAction handleSubmit={handleSubmit} text="ورود"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
