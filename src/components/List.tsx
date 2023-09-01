import React, {FC} from 'react';
import ListItem from "./ListItem";
import {ListProps} from "../constants/types";
import {Link} from "react-router-dom";

const List: FC<ListProps> = ({items, url, resultButton, resultUrl, ordered = false}) => {

    return (
        <div>
            {items && items.length ? (
                items.map(item => {
                    return (
                        <div className="flex items-center mb-3">
                            <ListItem url={url} id={item.id}>
                                <div>
                                    {item.name ? (<span>{item.name}</span>) : null}
                                    {item.username ? (<span>{item.username}</span>) : null}

                                </div>
                            </ListItem>
                            {
                                resultButton ? (
                                    <Link to={`${resultUrl}/${item.id}`}
                                          className="whitespace-nowrap mr-2 px-2 py-2 rounded text-gray-600 bg-gray-100 hover:text-white hover:bg-primary-blue focus:text-white focus:bg-primary-blue">
                                        دیدن نتایج
                                    </Link>) : null
                            }
                        </div>
                    )
                })
            ) : null}
        </div>
    );
}

export default List;