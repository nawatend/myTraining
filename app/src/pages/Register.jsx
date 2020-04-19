import React, { useState, useEffect } from 'react'
import BaseLayout from '../layouts/base';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom'

import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Header from '../components/Header'
import { Title, SubTitle } from '../components/texts'

//form
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

//slider
import Slider from '@material-ui/core/Slider';

//api
import { AuthService, UserService } from '../api'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        backgroundColor: 'white'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function valuetext(value) {
    return `${value} cm`;
}

function getSteps() {
    return ['Select Gender', 'Height', 'Weight', 'Goal', "Profile"];
}

const marks = {
    heights: [
        {
            value: 130,
            label: '130 cm',
        },
        {
            value: 168,
            label: '168 cm',
        },
        {
            value: 228,
            label: '228 cm',
        }
    ],
    weights: [
        {
            value: 50,
            label: '50 kg',
        },
        {
            value: 190,
            label: '190 kg',
        }
    ]
};


let RegisterPage = () => {

    let history = useHistory();

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    //user informations
    const [userInfo, setUserInfo] = useState({
        gender: "female",
        height: 168,
        weight: 50,
        goal: 'muscle',
        fullName: '',
        email: '',
        password: '',
        age: 20,
        showPassword: false,
        role: "sporter",
        imageName: "images/skr_wcjk4w"
    })

    const handleClickShowPassword = () => {
        setUserInfo({ ...userInfo, showPassword: !userInfo.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const handlePasswordChange = (prop) => (event) => {
        setUserInfo({ ...userInfo, [prop]: event.target.value })
    }
    //end  password


    const handleChange = (prop) => (event, value) => {
        setUserInfo({ ...userInfo, [prop]: value })
    }


    const handleTextFieldChange = (event) => {
        console.log(event.target.value)
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleFinish = () => {
        history.push("/")

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {

    }, [history])

    const registerUser = (e) => {
        e.preventDefault()

        UserService.createUser(userInfo)
            .then((response) => {
                console.log("pushed")
                history.push("/")
            }).catch((e) => console.log('failed registration'))
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (<FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender" value={userInfo.gender} onChange={handleChange('gender')}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>)
            case 1:
                return (
                    <FormControl component="fieldset">
                        <Typography id="discrete-slider" gutterBottom>
                            I am {userInfo.height} cm tall.
                        </Typography>
                        <Slider
                            defaultValue={168}
                            //getAriaValueText={valuetext}
                            onChange={handleChange('height')}
                            aria-labelledby="height"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marks.heights}
                            min={120}
                            max={228}
                            name='height'
                        />
                    </FormControl>)
            case 2:
                return (
                    <FormControl component="fieldset">
                        <Typography id="discrete-slider" gutterBottom>
                            I weight {userInfo.weight} kg.
                        </Typography>
                        <Slider
                            defaultValue={50}
                            //getAriaValueText={valuetext}
                            onChange={handleChange('weight')}
                            aria-labelledby="weight"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marks.weights}
                            min={40}
                            max={190}
                            name='weight'
                        />
                    </FormControl>)

            case 3:
                return (<FormControl component="fieldset">
                    <RadioGroup aria-label="goal" name="goal" value={userInfo.goal} onChange={handleChange('goal')}>
                        <FormControlLabel value="strength" control={<Radio />} label="Build Strength" />
                        <FormControlLabel value="muscle" control={<Radio />} label="Build Muscle" />
                        <FormControlLabel value="fat" control={<Radio />} label="Lose Fat" />
                        <FormControlLabel value="stamina" control={<Radio />} label="Improve Stamina" />
                    </RadioGroup>
                </FormControl>)
            case 4:
                return (<FormControl component="fieldset">
                    <TextField
                        onChange={handleTextFieldChange}
                        id="standard-helperText"
                        label="Full name"
                        name='fullName'
                    />
                    <TextField
                        id="standard-helperText"
                        label="E-mail"
                        name='email'
                        onChange={handleTextFieldChange}
                    />

                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={userInfo.showPassword ? 'text' : 'password'}
                            value={userInfo.password}
                            onChange={handlePasswordChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {userInfo.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                </FormControl >)
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className="App main__app">
            <Header />
            <main className="main__content">
                <div className="register">
                    <div className={classes.root}>
                        <Title text="Let's fill in informations" />
                        <Stepper activeStep={activeStep} orientation="vertical">

                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {getStepContent(index)}
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                            </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={(activeStep === steps.length - 1) ? registerUser : handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </div>
            </main>
        </div>

    )
}
export default RegisterPage