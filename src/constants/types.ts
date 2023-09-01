import React, {ReactChildren} from "react";

export interface ElectionState {
    electionName: string;
    candidateResults?: {candidate: {
            id: number ,
            name: string,
            info: string
        },
        voteCount: number ,
    }[]
}

export interface ElectionState {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    requirements?: string;
}

export interface HeaderProps {
    admin?: boolean;
}

export interface LayoutProps {
    admin?: boolean;
    header?: boolean;
    children: typeof React.Children;
}

export interface CandidatesState {
    value: number;
    label: string
}


export interface ListProps {
    items?: any[];
    resultButton?: boolean;
    ordered?: boolean;
    url?: string;
    resultUrl?: string;
}


export interface ListProps {
    children?: any;
    url?: string;
    id?: number;
}

export interface FormActionProps {
    handleSubmit: any;
    type?: any;
    action?: any;
    text: string;
    loading?: boolean;
    className?: string;
}

export interface InputProps {
    handleChange: any;
    value: string | number | any[];
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type?: string;
    isRequired: boolean;
    placeholder: string;
    customClass?: string;
    disabled?: boolean;
}

export interface AdminState {
    electionName: string;
    candidateResults?: {candidate: {
            id: number ,
            name: string,
            info: string
        },
        voteCount: number ,
    }[]
}