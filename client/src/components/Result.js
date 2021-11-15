import React, { Fragment } from 'react';
import { useLocation } from 'react-router';

const Result = (props) => {
    const state = useLocation();
    console.log(state);
    return (
        <Fragment>{props.msg}</Fragment>
    )
}

export default Result;

