import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress'

import { MdExpandMore } from "react-icons/md";

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

export default function ExerciseCard() {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            <div className="card__exercise__main">
                <CardMedia
                    className="card__exercise--image"
                    image="/images/bag_squad.jpg"
                    title="Paella dish"
                />
                <CardHeader
                    className="card__exercise--title"
                    title="Chorizo Paella"
                    subheader="September 14, 2016"
                >
                    ggg
            </CardHeader>
            </div>

            <div className="card__exercise__expand">
                <CircularProgress className="exercise__progress" variant="static" value={80} />
                <CardActions className="card__exercise--expand" disableSpacing>
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
                </CardActions>
            </div>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
            </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
                </CardContent>
            </Collapse>

        </Card>
    )
}
