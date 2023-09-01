import React, {FC, SetStateAction, useEffect, useState} from "react";
import Input from "../../components/Input";
import Select, {MultiValue} from "react-select";
import {getTokens} from "../../utils";
import makeAnimated from 'react-select/animated';
import FormAction from "../../components/FormAction";
import {DatePicker} from "zaman";
import {DatePickerOnChange} from "zaman/dist/packages/DatePicker/DatePicker.types";
import {CandidatesState} from "../../constants/types";
import Layout from "../../components/Layout";

const NewElection: FC<{}> = () => {
    const [candidates, setCandidates] = useState<CandidatesState[]>([]);
    const [newCandidateName, setNewCandidateName] = useState<string>("");
    const [newCandidateInfo, setNewCandidateInfo] = useState<string>("");
    const [selectedCandidates, setSelectedCandidates] = useState<MultiValue<CandidatesState>>([]);
    const [newElectionName, setNewElectionName] = useState<string>("");
    const [newElectionStartDate, setNewElectionStartDate] = useState<Date | undefined>();
    const [newElectionEndDate, setNewElectionEndDate] = useState<Date | undefined>();
    const [addCandidateLoading, setAddCandidateLoading] = useState(false);
    const [addElectionLoading, setAddElectionLoading] = useState(false);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        getCandidates()
    }, []);

    const getCandidates = () => {
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/candidate/get-all`, {
            method: "GET",
            headers: {Authorization: `Bearer ${tokens?.token}`}
        }).then(async (response: any) => {
                if (response.ok) {
                    const res = await response.json();
                    const newList: CandidatesState[] = [];
                    res.map((candidate: { id: number; name: string; }) => {
                        newList.push({
                            value: candidate.id,
                            label: candidate.name
                        })
                    })
                    setCandidates(newList);
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        })
    }

    const handleNewCandidate = (e: { preventDefault: () => void; }) => {
        setAddCandidateLoading(true);
        e.preventDefault();
        const tokens = getTokens();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/candidate/submit`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokens?.token}`
            },
            body: JSON.stringify({
                name: newCandidateName,
                info: newCandidateInfo
            })
        }).then(async (response: any) => {
                if (response.ok) {
                    setNewCandidateName("")
                    setNewCandidateInfo("");
                    getCandidates();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            }
        ).catch(error => {
            console.log("error: ", error)
        }).finally(() => {
            setAddCandidateLoading(false);

        })
    }

    const addCandidatesToElection = (electionId: number) => {
        const tokens = getTokens();
        selectedCandidates.forEach(candidate => {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/add-candidate-to-election`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokens?.token}`
                },
                body: JSON.stringify({
                    candidateId: candidate.value,
                    electionId: electionId
                })
            }).then(async (response: any) => {
                    if (response.ok) {
                        setNewElectionName("");
                        setSelectedCandidates([]);
                    } else {
                        throw new Error('Error: ' + response.status);
                    }
                }
            ).catch(error => {
                console.log("error: ", error)
            }).finally(() => {
                setAddElectionLoading(false);
            })
        })
        console.log("All candidate added")

    }

    const handleNewElection = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (newElectionName && newElectionStartDate && newElectionEndDate) {
            if (newElectionStartDate > newElectionEndDate) {
                console.log("زمان پایان باید بعد از زمان شروع باشد.")
            } else {
                setAddElectionLoading(true);
                const tokens = getTokens();
                fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/election/new`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokens?.token}`
                    },
                    body: JSON.stringify({
                        name: newElectionName,
                        startDate: newElectionStartDate,
                        endDate: newElectionEndDate
                    })
                }).then(async (response: any) => {
                        if (response.ok) {
                            const res = await response.json();
                            addCandidatesToElection(res.id);
                        } else {
                            throw new Error('Error: ' + response.status);
                        }
                    }
                ).catch(error => {
                    console.log("error: ", error)
                    setAddElectionLoading(false);
                })
            }
        } else {
            console.log("Fill all inputs")
        }
    }

    return (
        <Layout admin>
            {/*// @ts-ignore*/}
            <>
                <div>
                    <div className="font-bold text-gray-600 mb-6">
                        اگر نام نامزد مورد نظر در لیست وجود ندارد، ابتدا آن را ثبت کنید و سپس از لیست نامزدها نام آن را
                        انتخاب کنید.
                    </div>
                    <form className="flex flex-col justify-center" onSubmit={handleNewCandidate}>
                        <Input
                            customClass="w-fit"
                            key="name"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                                setNewCandidateName(e.target.value);
                            }}
                            value={newCandidateName}
                            labelText="نام و نام خانوادگی"
                            labelFor="name"
                            id="name"
                            name="name"
                            isRequired={true}
                            placeholder="نام و نام خانوادگی"
                            disabled={addCandidateLoading}
                        />
                        <Input
                            customClass="w-fit"
                            key="name"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                                setNewCandidateInfo(e.target.value);
                            }}
                            value={newCandidateInfo}
                            labelText="توضیح"
                            labelFor="info"
                            id="info"
                            name="info"
                            isRequired={false}
                            placeholder="توضیح"
                            disabled={addCandidateLoading}
                        />
                        <FormAction loading={addCandidateLoading} handleSubmit={handleNewCandidate}
                                    text="ثبت کردن نامزد جدید"/>
                    </form>
                </div>
                <form className="mt-6 flex flex-col justify-center" onSubmit={handleNewElection}>
                    <div className="flex items-center">
                        <Input
                            customClass="w-full"
                            key="electionName"
                            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                                setNewElectionName(e.target.value);
                            }}
                            value={newElectionName}
                            labelText="نام انتخابات"
                            labelFor="electionName"
                            id="electionName"
                            name="electionName"
                            isRequired={true}
                            placeholder="نام انتخابات"
                            disabled={addElectionLoading}
                        />
                    </div>
                    <div className="flex items-center my-5 max-w-[400px]">
                        <Select
                            isMulti
                            name="candidates"
                            options={candidates}
                            className="w-full basic-multi-select"
                            value={selectedCandidates}
                            onChange={(selected: MultiValue<CandidatesState>) => {
                                console.log("selected: ", selected)
                                setSelectedCandidates(selected)
                            }}
                            classNamePrefix="select"
                            components={animatedComponents}
                            placeholder="نامزدهای انتخابات"
                            isDisabled={addElectionLoading || addCandidateLoading}

                        />
                    </div>
                    <div className="my-3 max-w-[400px]">
                        <DatePicker
                            round="x2"
                            accentColor="#6374ae"
                            inputAttributes={{
                                placeholder: "تاریخ شروع انتخابات",
                                //@ts-ignore
                                class: "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",
                                disabled: addElectionLoading
                            }}
                            onChange={(e: DatePickerOnChange) => {
                                setNewElectionStartDate(e.value);
                            }}
                        />
                    </div>
                    <div className="m3-5 max-w-[400px]">
                        <DatePicker
                            round="x2"
                            accentColor="#6374ae"
                            inputAttributes={{
                                placeholder: "تاریخ پایان انتخابات",
                                //@ts-ignore
                                class: "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",
                                disabled: addElectionLoading
                        }}
                            onChange={(e: DatePickerOnChange) => {
                                setNewElectionEndDate(e.value);
                            }}
                        />
                    </div>
                    <FormAction loading={addElectionLoading} handleSubmit={handleNewElection} text="ثبت کردن انتخابات جدید"/>
                </form>
            </>
        </Layout>
    )
}

export default NewElection
