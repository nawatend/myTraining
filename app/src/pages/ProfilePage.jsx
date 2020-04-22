import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';
import { withRouter, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, Divider } from '@material-ui/core';
import { Title, SubTitle, TextAndLabel } from '../components/texts'
import Button from '../components/Button'

//api
import { SporterService } from '../api'
import { getUserIdFromJWT } from '../utils/jwt'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '100%'
    },
    small: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

let ProfilePage = () => {
    const classes = useStyles();

    const [values, setValues] = useState({
        user: {},
        trainer: { user: {} },
        goal: "",
        height: "",
        weight: "",
        daysTrained: 0
        , daysTrainedStreak: 1
    })

    const [sporterId, setSporterId] = useState(null)

    useEffect(() => {
        SporterService.getSporterByUserId(getUserIdFromJWT())
            .then((res) => {
                setValues({ ...values, ...res })
            }).catch((e) => console.log('sporter not found'))
    }, [values])

    const cancelInvite = (e) => {
        e.preventDefault()
        console.log('gtfo')
        SporterService.cancelInvite({ sporterId: values.id, trainerId: values.trainer.id, acceptTrainer: false })
            .then(res => {
                setValues({ ...values, acceptInvite: false, trainer: null })
            })
            .catch((e) => console.log(e))
    }

    const acceptInvite = (e) => {
        e.preventDefault()
        console.log('come again')
        SporterService.acceptInvite({ sporterId: values.id, trainerId: values.trainer.id, acceptTrainer: true })
            .then(res => {
                setValues({ ...values, acceptInvite: true })
            })
            .catch((e) => console.log(e))
    }


    return (
        <div className="profile">
            <div className="action__edit">
                <Button text="edit" variant="text" />
            </div>
            <div className="profile__detail--avatar">
                <Avatar alt={values.user.fullName} src="/static/images/avatar/1.jpg" className={classes.large} />
                <Title text={values.user.fullName} />
            </div>
            <Divider variant="middle" />
            <div className="profile__detail">

                {values.acceptTrainer !== true && values.trainer !== null &&
                    <div className="profile__detail--trainer">
                        <div className="profile__detail--trainer--request"  >
                            <TextAndLabel label="Trainer" text={"Invite from: " + values.trainer.user.fullName} />
                            <Avatar alt={values.trainer.user.fullName} src="/static/images/avatar/1.jpg" className={classes.small} />
                        </div>
                        <div className="profile__detail--trainer--action" >
                            <Button text="Accept" variant="contained" onClick={(e) => acceptInvite(e)} /> <Button text="Cancel" variant="text" onClick={cancelInvite} />
                        </div>
                    </div>

                }

                {values.acceptTrainer === true && values.trainer !== null &&
                    <div className="profile__detail--trainer">
                        <div className="profile__detail--trainer--request"  >
                            <TextAndLabel label="Trainer" text={values.trainer.user.fullName + ": " + values.trainer.focus} />
                            <Avatar alt={values.trainer.user.fullName} src="/static/images/avatar/1.jpg" className={classes.small} />
                        </div>
                    </div>
                }

                {values.trainer === null &&
                    <div className="profile__detail--trainer">
                        <div className="profile__detail--trainer--request"  >
                            <TextAndLabel label="Trainer" text={"No Trainer "} />
                        </div>
                    </div>
                }


                <Divider variant="middle" />
                <TextAndLabel label="Goal" text={values.goal} />
                <TextAndLabel label="Days trained streak" text={values.daysTrainedStreak} />
                <TextAndLabel label="Days trained" text={values.daysTrained} />
            </div>
        </div>
    )
}

export default withRouter(ProfilePage)
