import {FC} from "react";
import {InputProps} from "../constants/types";

const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50"

const Input: FC<InputProps> = ({
                         handleChange,
                         value,
                         labelText,
                         labelFor,
                         id,
                         name,
                         type,
                         isRequired = false,
                         placeholder,
                         customClass,
    disabled
                     }) => {
    return (
        <div className="my-4 max-w-[400px]">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <input
                onChange={handleChange}
                value={value}
                id={id}
                name={name}
                type={type}
                required={isRequired}
                className={fixedInputClass + customClass}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    )
}

export default Input;