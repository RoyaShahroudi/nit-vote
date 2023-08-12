import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"

interface ListProps {
    onClickItem?: () => void;
    children?: any;
}

const ListItem: FC<ListProps> = ({onClickItem, children}) => {
    return (
        <div onClick={onClickItem}
             className="flex justify-between w-96 px-2 py-2 mb-3 border rounded-md border-blue-600 text-blue-600 cursor-pointer hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white">
            {children}
        </div>
    );
}

export default ListItem;