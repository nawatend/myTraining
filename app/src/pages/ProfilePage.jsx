import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';
import {  withRouter, useHistory } from 'react-router-dom';

let ProfilePage = () => {

    useEffect(() => {

    }, [])

    return (
        <div className="profile">
            Profile
        </div>
    )
}

export default withRouter(ProfilePage)
