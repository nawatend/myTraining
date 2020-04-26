import { Avatar, Button, Card, CardActions, CardContent, Divider, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloudinaryContext, Image } from "cloudinary-react";
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ImageUpload from '../../../../components/UploadFiles/ImageUpload';

//api
import { TrainerService } from '../../../../services/api';
//jwt authen
import { getTrainerIdFromJWT } from '../../../../utils/jwt';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  profileImage: {
    width: '150%',
    margin: 0
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [trainer, setTrainer] = useState({ user: {} })
  
  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_11.png'
  };


  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        setTrainer({ ...res })
      }).catch((e) => console.log('trainer not found'))

  }, [])

  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {trainer.user.fullName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {trainer.focus}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              Joined {moment(trainer.user.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
          //src={user.avatar}
          >
            <CloudinaryContext cloudName="filesmytraining">
              <Image
                className={classes.profileImage}
                alt="WorkoutSession"
                publicId={props.image ? `http://res.cloudinary.com/filesmytraining/image/upload/f_auto,q_auto/v1/${props.image}`: trainer.user.imageName}
                fetch-format="auto"
                quality="auto"
              />
            </CloudinaryContext>
          </Avatar>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <ImageUpload simple={true} onChange={props.handleImage} image={props.image} />

      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
