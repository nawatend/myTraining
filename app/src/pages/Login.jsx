import React from 'react'
import BaseLayout from '../layouts/base';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../components/Button'
import { Link } from 'react-router-dom'

import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
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

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
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

    return (
        <div className="App main__app">
            <main className="main__content">
                <div className="login">
                    <div className="login__icon">
                        <img src={`${process.env.PUBLIC_URL}/svgs/start_logo.svg`} alt="" srcSet="" />
                    </div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="standard-helperText"
                            label="E-mail"
                        />
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
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
                        <div className="form__actions">
                            <Link to="/">
                                Forgot Your Password?
                        </Link>
                            <Link to="/">
                                <Button text="Sign in" />
                            </Link>
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