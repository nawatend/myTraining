import React, { useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

import { Link, useHistory, useParams } from 'react-router-dom'
import { Title, SubTitle, Paragraph } from '../components/texts/index'
import Button from '../components/Button'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { FeedbackService, RateService, WorkoutSessionService } from '../api'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

let Feedback = props => {

    const history = useHistory()

    const classes = useStyles();
    const [rateValue, setRateValue] = useState(4)
    const [isRated, setIsRated] = useState(false)

    const [feedbackValue, setFeedbackValue] = useState()
    const [isFeedbackSkipped, setIsFeedbackSkipped] = useState(true)
    const [done, setDone] = useState(false)

    const [rateId, setRateId] = useState()
    const [message, setMessage] = useState()

    console.log(props.data.workoutSessionId)
    const handleChange = event => {
        setFeedbackValue(event.target.value);
    };

    const sendFeedback = () => {
        //TODO-> send feedback to DB
        let body = {
            message: feedbackValue,
            rateId: rateId,
            workoutSessionId: props.data.workoutSessionId,
            trainerId: props.data.sporter.trainer.id
        }

        FeedbackService.createFeedback(body)
            .then((res) => {
                console.log(res)
            }).catch((e) => console.log(e))

        WorkoutSessionService.setDone({ workoutSessionId: props.data.workoutSessionId, done: true })
            .then((res) => {
                console.log(res)
                setDone(true)
            }).catch((e) => console.log(e))
    }

    const acceptFeedback = () => {
        //finally store rate
        let body = {
            workoutSessionId: props.data.workoutSessionId,
            rate: rateValue,
            sporterId: props.data.sporter.id
        }
        RateService.createRate(body)
            .then((res) => {
                console.log(res)
                setRateId(res.data.id)
            }).catch((e) => console.log(e))
        setIsFeedbackSkipped(false)
    }

    const skipFeedback = () => {

        //finally store rate
        let body = {
            workoutSessionId: props.data.workoutSessionId,
            rate: rateValue,
            sporterId: props.data.sporter.id
        }
        RateService.createRate(body)
            .then((res) => {
                console.log(res)
                setRateId(res.data.id)

            }).catch((e) => console.log(e))

        WorkoutSessionService.setDone({ workoutSessionId: props.data.workoutSessionId, done: true })
            .then((res) => {
                setIsFeedbackSkipped(true)
                setDone(true)
            }).catch((e) => console.log(e))


        history.push('/')


    }
    if (!done) {


        if (!isFeedbackSkipped) {
            return (
                <Card className="feedback__workoutSession">
                    <div className="feedback__main">
                        <SubTitle text="Write your feedback here" />
                        <div className="feedback__text">
                            <Rating
                                name="workout-rating"
                                value={rateValue}
                                onChange={(event, newValue) => {
                                    setRateValue(newValue);
                                }}
                            />
                            <form className={classes.root} noValidate autoComplete="off">
                                <div>
                                    <TextField
                                        autoFocus
                                        id="standard-multiline-flexible"
                                        multiline
                                        rowsMax="5"
                                        value={feedbackValue}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="feedback__send--button">
                            <Button onClick={() => { sendFeedback() }} text="SEND" />
                        </div>
                    </div>
                </Card>
            )
        }

        if (isRated) {
            return (
                <Card className="feedback__workoutSession">
                    <div className="feedback__main">
                        <SubTitle text="Would you like to give a feedback?" />
                        <div className="feedback__choice">
                            <Button onClick={() => { acceptFeedback() }} text="YES" />
                            <Button onClick={() => { skipFeedback() }} text="NO, THANKS" variant="outlined" />
                        </div>
                    </div>
                </Card>
            )
        }
        else {
            return (
                // <div>
                //     <Box component="fieldset" mb={3} borderColor="transparent">
                //         <Typography component="legend">Rate here</Typography>
                //         <Rating
                //             name="simple-controlled"
                //             rateValue={rateValue}
                //             onChange={(event, newValue) => {
                //                 setValue(newValue);
                //             }}
                //         />
                //     </Box>
                // </div>
                <Card className="feedback__workoutSession">
                    <div className="feedback__main">
                        <SubTitle text="How great do you feel after this workout session?" />
                        <div className="feedback__rating">
                            <Paragraph text="Tap to Rate" />
                            <Rating
                                name="workout-rating"
                                value={rateValue}
                                onChange={(event, newValue) => {
                                    setRateValue(newValue);
                                }}
                            />
                        </div>

                        <Button onClick={() => { setIsRated(true) }} text="SEND" />
                    </div>
                </Card>
            );
        }
    } else {
        //TODO message: today end
        return null
    }
}


export default Feedback