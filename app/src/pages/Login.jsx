import React from 'react'
import BaseLayout from '../layouts/base';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid'

import { MdVisibility, MdVisibilityOff } from "react-icons/md";


//api
import { AuthService, UserService } from '../api'
import checkRole from '../utils/checkRole'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        }
    }
}
));

let LoginPage = () => {
    const classes = useStyles()
    let history = useHistory();
    const [values, setValues] = React.useState({
        email: 'sporter@gmail.com',
        amount: '',
        password: '111111',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: false
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const showError = e => {
        console.log(e)
        setValues({ ...values, error: true })
    }

    const login = (e) => {
        e.preventDefault()
        AuthService.login({ email: values.email, password: values.password })
            .then((response) => {
                if (checkRole().role === "sporter") {
                    history.push("/")
                } else {
                    AuthService.logout()
                    history.push("/auth/register")
                }

            }).catch((e) => showError(e))

        console.log("logged in")
    }

    return (
        <div className="App main__app">
            <main className="main__content">
                <div className="login">
                    <div className="login__icon">
                        <img src={`${process.env.PUBLIC_URL}/svgs/start_logo.svg`} alt="" srcSet="" />
                    </div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            error={values.email === '' || values.error ? true : false}
                            id="standard-helperText"
                            label="E-mail"
                            helperText={values.email === '' || values.error ? "Fill in correct e-mail" : ''}
                            onChange={handleChange('email')}
                            value={values.email}
                        />
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                error={values.password === '' && values.error ? true : false}
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <p className="MuiFormHelperText-root MuiFormHelperText-filled" id="standard-helperText-helper-text">{values.password === '' || values.error ? "Fill in correct password" : ''}</p>

                        <div className="form__actions">
                            <Grid container justify="space-between" alignItems="center" spacing={2}>
                                <Grid item sm={6}>
                                    <Link to="/">
                                        Forgot Your Password?
                        </Link>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        text="Sign in"
                                        onClick={login}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="form__action--register">
                            <Link to="/auth/register">
                                Create Account
                        </Link>
                        </div>
                    </form >
                </div>
            </main>
        </div>

    )
}
export default LoginPage