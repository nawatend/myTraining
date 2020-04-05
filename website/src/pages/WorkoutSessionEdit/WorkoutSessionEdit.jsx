import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    FormHelperText,
    Checkbox,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageUpload from '../../components/UploadFiles/ImageUpload'
import VideoUpload from '../../components/UploadFiles/VideoUpload'
import AddExerciseList from './components/AddExerciseList'
//import MaterialTable from 'material-table';
//api
import { WorkoutSessionService } from '../../services'
import axios from 'axios'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,

        padding: theme.spacing(4)
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    policyCheckbox: {
        marginLeft: '-14px'
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
}));

const schema = {
    title: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    type: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    muscleLevel: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    cardioLevel: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    // password: {
    //     presence: { allowEmpty: false, message: 'is required' },
    //     length: {
    //         maximum: 128
    //     }
    // },
    // policy: {
    //     presence: { allowEmpty: false, message: 'is required' },
    //     checked: true
    // }
};

let WorkoutSessionEdit = (props) => {
    const { history } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        title: 'Nawang',
        type: '',
        imagePath: '',
        videoPath: '',
        cardioLevel: 0,
        muscleLevel: 0,
        mainInfo: '',
        time: 0,
        repetition: 0,
        set: 0,
        kg: 0,
        exerciseId: 0,
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    })

    const [exerciseIds, setExerciseIds] = useState([])

    const selections = {
        types:
            [
                {
                    value: '',
                    label: ''
                },
                {
                    value: 'muscle',
                    label: 'Build Muscle'
                },
                {
                    value: 'cardio',
                    label: 'Increase Cardio'
                },
                {
                    value: 'stayFit',
                    label: 'Stay Fit'
                },
                {
                    value: 'burnFat',
                    label: 'Burn Fat'
                }
            ]
        , levels: [{
            value: 0,
            label: '0 Level'
        },
        {
            value: 1,
            label: '1 Level'
        },
        {
            value: 2,
            label: '2 Level'
        },
        {
            value: 3,
            label: '3 Level'
        },
        {
            value: 4,
            label: '4 Level'
        },
        {
            value: 5,
            label: '5 Level'
        }
        ]
        , exercises: [
            {
                value: '',
                label: ''
            },
            {
                value: 1,
                label: '1 Exercise',
                type: 'reps'


            },
            {
                value: 2,
                label: '2 Exercise',
                type: 'time'
            },
            {
                value: 3,
                label: '3 Exercise',
                type: 'reps'
            },
            {
                value: 4,
                label: '4 Exercise',
                type: 'reps'
            },
            {
                value: 5,
                label: '5 Exercise',
                type: 'time'
            }
        ]
    }


    useEffect(() => {
        const errors = validate(values.values, schema);

        setValues(values => ({
            ...values,
            isValid: errors ? false : true,
            errors: errors || {}
        }));

        axios.post("http://127.0.0.1:8000/test")
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [values.values]);


    const addExerciseToWorkoutSession = (e) => {

        e.preventDefault()

        let newExercise = {
            id: values.exerciseId
            , title: selections.exercises[values.exerciseId].label
            , type: selections.exercises[values.exerciseId].type
            , set: values.set
            , repetition: values.repetition
            , kg: values.kg
            , time: values.time
        }

        let newData = [...exerciseIds]
        newData.push(newExercise)
        setExerciseIds(newData)
    }

    const deleteExercise = (e, id) => {
        e.preventDefault()
        exerciseIds.forEach((exercise, i) => {


            if (parseInt(exercise.id) === parseInt(id)) {
                let newArr = [...exerciseIds]
                if (i > -1) {
                    newArr.splice(i, 1)
                    setExerciseIds(newArr)
                }
            }
        });
    }

    const handleImage = (publicId) => {
        setValues({
            ...values,
            imagePath: publicId
        })
    }

    const handleVideo = (publicId) => {
        setValues({
            ...values,
            videoPath: publicId
        })
    }

    const handleChange = event => {
        event.persist();

        setValues({
            ...values,
            [event.target.name]: event.target.value
        });

        setValues(values => ({
            ...values,
            values: {
                ...values.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...values.touched,
                [event.target.name]: true
            }
        }));
    };

    const saveWorkoutSession = async (e) => {
        e.preventDefault()
        //TODO save exercise to db
        let data = {}

        if (values.type === "time") {
            data = {
                trainerId: 1,
                title: values.title,
                type: values.type,
                muscleLevel: values.muscleLevel,
                cardioLevel: values.cardioLevel,
                imagePath: values.imagePath,
                videoPath: values.videoPath,
                description: values.description,
                mainInfo: [{ time: values.time }]
            }
        } else {
            data = {
                trainerId: 1,
                title: values.title,
                type: values.type,
                muscleLevel: values.muscleLevel,
                cardioLevel: values.cardioLevel,
                imagePath: values.imagePath,
                videoPath: values.videoPath,
                description: values.description,
                mainInfo: [{ set: values.set, reps: values.repetition, rest: "2 min" }]
            }
        }



        //WorkoutSessionService.createWorkoutSession(data)

        await axios.post("http://127.0.0.1:1234/test", {}, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                }
            }).catch((error) => {
                console.log(error)

            })
    }

    const handleBack = () => {
        history.goBack();
    };

    const handleSignUp = event => {
        event.preventDefault();
        history.push('/');
    };

    const hasError = field =>
        values.touched[field] && values.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.content}
                    item
                    lg={7}
                    xs={12}
                >
                    <div className={classes.content}>
                        <div className={classes.contentHeader}>
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleSignUp}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    Create New Workout Wession
                            </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Fill detail of new workout session
                            </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('title')}
                                    fullWidth
                                    helperText={
                                        hasError('title') ? values.errors.title[0] : null
                                    }
                                    label="Title"
                                    name="title"
                                    onChange={handleChange}
                                    type="text"
                                    value={values.values.title || ''}
                                    variant="outlined"
                                    required
                                />

                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    label="Select Type"
                                    margin="dense"
                                    name="type"
                                    onChange={handleChange}
                                    required
                                    select
                                    // eslint-disable-next-line react/jsx-sort-props
                                    SelectProps={{ native: true }}
                                    value={values.type}
                                    variant="outlined"
                                >
                                    {selections.types.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    label="Select Cardio Level"
                                    margin="dense"
                                    name="cardioLevel"
                                    onChange={handleChange}
                                    required
                                    select
                                    // eslint-disable-next-line react/jsx-sort-props
                                    SelectProps={{ native: true }}
                                    value={values.cardioLevel}
                                    variant="outlined"
                                >
                                    {selections.levels.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField

                                    fullWidth
                                    label="Select Muscle Level"
                                    margin="dense"
                                    name="muscleLevel"
                                    onChange={handleChange}
                                    required
                                    select
                                    // eslint-disable-next-line react/jsx-sort-props
                                    SelectProps={{ native: true }}
                                    value={values.muscleLevel}
                                    variant="outlined"
                                >
                                    {selections.levels.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>


                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Upload Cover Image
                            </Typography>
                                <ImageUpload onChange={handleImage} />


                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Add Exercises To This Workout Session
                            </Typography>

                                {/* //list of added exercise */}
                                <AddExerciseList exercises={exerciseIds} deleteExercise={deleteExercise} />
                                {/* end of list of added exercise */}

                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        <TextField

                                            fullWidth
                                            label="Select Exercise"
                                            margin="dense"
                                            name="exerciseId"
                                            onChange={handleChange}
                                            required
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            value={values.exerciseId}
                                            variant="outlined"
                                        >
                                            {selections.exercises.map(option => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                    >

                                        {selections.exercises[values.exerciseId].type === 'time' ?
                                            (<TextField
                                                className={classes.textField}
                                                error={hasError('time')}
                                                fullWidth
                                                helperText={
                                                    hasError('time') ? values.errors.type[0] : null
                                                }
                                                label="Time in min"
                                                name="time"
                                                onChange={handleChange}
                                                type="number"
                                                value={values.values.time || ''}
                                                variant="outlined"
                                            />)
                                            : (

                                                <Grid
                                                    container
                                                    spacing={2}
                                                >
                                                    <Grid
                                                        item
                                                        sm={4}
                                                        xs={6}
                                                    >
                                                        <TextField
                                                            error={hasError('repetition')}
                                                            helperText={
                                                                hasError('repetition') ? values.errors.type[0] : null
                                                            }
                                                            label="Repetition"
                                                            name="repetition"
                                                            onChange={handleChange}
                                                            type="number"
                                                            SelectProps={{ native: true }}
                                                            value={values.values.repetition || ''}
                                                            variant="outlined"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        sm={4}
                                                        xs={6}
                                                    >
                                                        <TextField
                                                            error={hasError('set')}
                                                            helperText={
                                                                hasError('set') ? values.errors.type[0] : null
                                                            }
                                                            label="Sets"
                                                            name="set"
                                                            onChange={handleChange}
                                                            type="number"
                                                            value={values.values.set || ''}
                                                            variant="outlined"
                                                            required
                                                        />
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        sm={4}
                                                        xs={6}
                                                    >
                                                        <TextField

                                                            error={hasError('kg')}

                                                            helperText={
                                                                hasError('kg') ? values.errors.type[0] : null
                                                            }
                                                            label="Kilograms"
                                                            name="kg"
                                                            onChange={handleChange}
                                                            type="number"
                                                            value={values.values.kg || ''}
                                                            variant="outlined"
                                                            required
                                                        />
                                                    </Grid>
                                                </Grid>

                                            )
                                        }
                                    </Grid>
                                    <Grid
                                        item
                                        sm={12}
                                        xs={6}
                                    >
                                        <Button
                                            className={classes.signUpButton}
                                            color="primary"
                                            //disabled={!values.isValid}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="outlined"
                                            onClick={(e) => addExerciseToWorkoutSession(e)}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Button
                                    className={classes.signUpButton}
                                    color="primary"
                                    disabled={!values.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={(e) => saveWorkoutSession(e)}
                                >
                                    SAVE Workout Session
                    </Button>

                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div >
    );
}


export default withRouter(WorkoutSessionEdit);