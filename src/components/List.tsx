import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"
import ListItem from "./ListItem";

interface ListProps {
    items: any[];
    onClickItem?: () => void;
    resultButton?: boolean;
    ordered?: boolean;
}

const List: FC<ListProps> = ({items, onClickItem, resultButton, ordered = false}) => {


    return (
        <div>
            {items && items.length ? (
                items.map(item => {
                    return (
                        <ListItem onClickItem={onClickItem}>
                            <div>
                                {
                                    ordered ? (<span>{item.id + 1}. </span>) : null
                                }
                                {item.label ? (<span>{item.label}</span>) : null}
                            </div>
                            {
                                resultButton ? (<button
                                    className="px-2 py-1 text-white bg-blue-600 hover:text-blue-700 hover:bg-white focus:text-blue-700 focus:bg-white">
                                    دیدن نتایج
                                </button>) : null
                            }
                        </ListItem>
                    )
                })
            ) : null}
        </div>
    );
}

export default List;