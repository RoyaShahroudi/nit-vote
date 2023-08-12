import {FC, SetStateAction, useState} from "react";
import Header from "../../components/Navbar";
import List from "../../components/List";
import login from "./Login";
import Input from "../../components/Input";
import Select from "react-select";

const colourOptions = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
    { value: "silver", label: "Silver" },
];

const items = [
    {
        id: 0,
        label: "election 1"
    }
    ,
    {
        id: 1,
        label: "election 2"
    },
    {
        id: 2,
        label: "election 3"
    }
]

const NewElection: FC<{}> = () => {
    const [candidates, setCandidates] = useState([]);
    const [numberOfVotes, setNumberOfVotes] = useState(1);
    const [requirements, setRequirements] = useState([]);

    return (
        <>
            <Header admin text="ایجاد انتخابات جدید"/>
            <div className="container px-3 ">
                <div>
                    {/*<Input*/}
                    {/*    key="username"*/}
                    {/*    handleChange={(e: { target: { value: SetStateAction<string>; }; }) => {*/}
                    {/*        */}
                    {/*        let newCandidates =[ */}
                    {/*            ...candidates,*/}
                    {/*            {*/}
                    {/*                id: index,*/}
                    {/*              username:e.target.value  */}
                    {/*            }*/}
                    {/*        ]*/}
                    {/*    }}*/}
                    {/*    value={candidates[index].username}*/}
                    {/*    labelText="نام و نام خانوادگی"*/}
                    {/*    labelFor="username"*/}
                    {/*    id="username"*/}
                    {/*    name="username"*/}
                    {/*    isRequired={true}*/}
                    {/*    placeholder="نام و نام خانوادگی"*/}
                    {/*/>*/}
                </div>
                <div className="flex items-center">
                    <span className="ml-2">تعداد حق رای</span>
                    <Input
                        key="numberOfVotes"
                        handleChange={(e: { target: { value: SetStateAction<string>; }; }) => setNumberOfVotes(+e.target.value)}
                        value={numberOfVotes}
                        labelText="تعداد حق رای"
                        labelFor="numberOfVotes"
                        id="numberOfVotes"
                        name="numberOfVotes"
                        isRequired={true}
                        placeholder=""
                        customClass="w-8"
                    />
                </div>
                <div className="flex items-center">
                    <span className="ml-2">شرایط رای دهندگان</span>
                    <Select
                        defaultValue={[colourOptions[1], colourOptions[4]]}
                        isMulti
                        name="colors"
                        options={colourOptions}
                        className="w-96"
                        classNamePrefix="select"
                    />
                </div>
            </div>
        </>
    )
}

export default NewElection
