import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

export default function WorkoutCard() {
    return (
        <Card component={Link} to="/today" className="card__workout">
            <CardActionArea className="card__workout__ActionArea">
                <CardMedia
                    className="card__workout__media"
                    image="/images/bag_squad.jpg"
                    title="bag squad"
                />
                <CardContent className="card__workout__content">
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizardee
            </Typography>
                    <Typography variant="body2" component="p">
                        Lizard
            </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                    Share
            </Button>
                <Button size="small" color="primary">
                    Learn More
            </Button>
            </CardActions> */}
        </Card>
    )
}
