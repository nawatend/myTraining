import React, { useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

import { Link } from 'react-router-dom'
import { Title, SubTitle, Paragraph } from '../components/texts/index'
import Button from '../components/Button'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Feedback() {

    const classes = useStyles();
    const [rateValue, setRateValue] = useState(4)
    const [isRated, setIsRated] = useState(false)

    const [feedbackValue, setFeedbackValue] = useState()
    const [isFeedbackSkipped, setIsFeedbackSkipped] = useState(true)
    const [done, setDone] = useState(false)


    let acceptFeedback = () => {
        setIsFeedbackSkipped(false)
    }

    const handleChange = event => {
        setFeedbackValue(event.target.value);
    };

    const sendFeedback = () => {
        //TODO-> send feedback to DB
        setDone(true)
    }

    const skipFeedback = () => {
        setIsFeedbackSkipped(true)
        setDone(true)
    }
    if (!done) {


        if (!isFeedbackSkipped) {
            return (
                <Card className="feedback__workoutSession">
                    <div className="feedback__main">
                        <SubTitle text="Write your feedback here?" />
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
                            <Button onClick={() => { setIsFeedbackSkipped(false) }} text="YES" /> <Button onClick={() => { skipFeedback() }} text="NO, THANKS" variant="outlined" />
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
                        <SubTitle text="How do you feel after this workout session?" />
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

                        <Button onClick={() => { setIsRated(true) }} text="Finish" />
                    </div>
                </Card>
            );
        }
    } else {
        //TODO message: today end
        return null
    }
}
