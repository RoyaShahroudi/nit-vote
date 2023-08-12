import React, {FC, SetStateAction, useState} from "react";
import Input from "../../components/Input";
import FormAction from "../../components/FormAction";
import VoteImage from "../../images/vote.svg"
import Header from "../../components/Navbar";

const NewAdmin: FC<{}> = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        loginAccount()
    }

//handle Signup API Integration here
    const loginAccount = () => {

    }

    return (
        <>
            <Header admin text="ادمین جدید"/>
            <div className="flex justify-center items-center">
            <div>
                <div className="mb-5">
                    <h2 className="mt-24 text-center text-2xl font-extrabold text-gray-900">
                        اطلاعات ادمین جدید را وارد کنید.
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
                        <FormAction handleSubmit={handleSubmit} text="ثبت"/>
                    </div>
                </form>
            </div>
        </div>

        </>
    )
}

export default NewAdmin
