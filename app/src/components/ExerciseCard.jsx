import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress'


import { Link } from 'react-router-dom'
import Button from '../components/Button'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ExerciseCard(props) {


    const [completed, setCompleted] = React.useState(0);


    useEffect(() => {

        let progress = () => {
            setCompleted(prevCompleted => (prevCompleted >= 100 ? 0 : prevCompleted + 10));
        }

        const timer = setInterval(progress, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [])


    return (
        <Card className="card__exercise">
            <Link to={`/exercisedetail/${props.data.workoutSession.id}/${props.data.id}`} className="card__exercise__main">
                <CardMedia
                    className="card__exercise--image"
                    image={`http://res.cloudinary.com/filesmytraining/image/upload/f_auto,q_auto/v1/${props.data.exerciseBase.imageName}`}
                    title={props.data.title}
                />
                <CardHeader
                    className="card__exercise--title"
                    title={props.data.exerciseBase.title}
                    subheader={(props.data.exerciseBase.type === "time") ? `${props.data.time} min` :
                        (<div>
                            <div className="subHeader">{`${props.data.reps} reps`}</div>
                            <div className="subHeader">{`${props.data.kg} kg`}</div>
                            <div className="subHeader">{`${props.data.sets} sets`}</div>
                        </div>)}

                >


                </CardHeader>
            </Link>
            <div className="card__exercise__expand">
                {props.data.done &&
                    <CircularProgress className="exercise__progress" variant="static" value={80} />
                }
                {/* <CircularProgress className="exercise__progress" variant="static" value={80} /> */}
                {/* <CardActions className="card__exercise--expand" disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <MdExpandMore />
                    </IconButton>

                </CardActions> */}
                {!props.data.done &&
                    <Link to="/exercisedetail/1" className="card__exercise__main">
                        <Button text="START" />
                    </Link>
                }
            </div>
        </Card>
    )
}
