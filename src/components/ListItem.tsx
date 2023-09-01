import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useNavigate} from "react-router-dom"
import {ListProps} from "../constants/types";

const ListItem: FC<ListProps> = ({url, id, children}) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            url ? navigate(`${url}/${id}`) : null
        }}
             className="flex justify-between max-w-[400px] w-full px-2 py-2 rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200 hover:text-primary-blue focus:bg-blue-700 focus:text-white">
            {children}
        </div>
    );
}

export default ListItem;