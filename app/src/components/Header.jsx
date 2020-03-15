import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { CardMedia } from '@material-ui/core';

let Header = () => {

    const [token] = useState(localStorage.getItem('myTraining_token'))
    const [user, setUser] = useState("Nawang")

    useEffect(() => {
    })

    return (
        <div className="header">
            <div className="name">
                Hi {user}!
                </div>
        </div>
    )
}

export default withRouter(Header)