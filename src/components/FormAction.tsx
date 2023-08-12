import {FC} from "react";

interface FormActionProps {
    handleSubmit: any;
    type?: any;
    action?: any;
    text: string;
}

const FormAction: FC<FormActionProps> = ({
                                             handleSubmit,
                                             type = 'Button',
                                             action = 'submit',
                                             text
                                         }) => {
    return (
        <>
            {
                type === 'Button' ?
                    <button
                        type={action}
                        className="group relative w-96 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                        onSubmit={handleSubmit}
                    >

                        {text}
                    </button>
                    :
                    <></>
            }
        </>
    )
}

export default FormAction;