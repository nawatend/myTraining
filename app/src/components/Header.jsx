import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { Redirect } from 'react-router-dom'
import { withRouter, Link } from "react-router-dom";
import { CardMedia } from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { MdNavigateBefore, } from "react-icons/md";
import { useParams } from "react-router-dom";
import getPageName from '../utils/getPageName'

//api
import { AuthService, UserService } from '../api'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textTransform: 'capitalize'
    },
}));

let Header = ({ location, match, history }) => {

    const [token] = useState(localStorage.getItem('myTraining_token'))
    const [user, setUser] = useState("Nawang")
    const classes = useStyles();


    let logout = () => {
        AuthService.logout()

    }

    return (
        <div className={classes.root}>
            <AppBar className="header" id="main__header" position="static">
                <Toolbar>
                    {(match.path.split('/').length >= 3) &&
                        <IconButton onClick={() => window.history.back()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MdNavigateBefore />
                        </IconButton>
                    }
                    <Typography variant="h6" className={classes.title}>
                        {(getPageName(match.path) === "") ? "My Training" : getPageName(match.path)}
                    </Typography>

                    <Link to="/auth/login" onClick={logout}>
                        <Button color="inherit">Log out</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(Header)