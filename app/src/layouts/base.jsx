import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav'
import Header from '../components/Header'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

//jwt authen
import { isJWTValid } from '../utils/jwt'


const BaseLayout = props => {

    const { children } = props
    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {
        setIsAuth(isJWTValid())
    }, [isAuth])


    if (!isAuth) {
        return (
            <Redirect to='/auth/login' />
        )
    } else {
        return (
            <div className="App main__app">
                <Header />
                <main className="main__content">
                    {children}
                </main>
                <Nav />
            </div>
        )
    }
}

BaseLayout.propTypes = {
    children: PropTypes.node
};

export default BaseLayout