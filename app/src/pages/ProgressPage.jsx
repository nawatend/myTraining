/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';
import TabsMenu from '../components/Tabs'
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem'

//chart
import Chart from '../components/Chart'
import Chartv from '../components/Chartv'

import { SporterService, ProgressService } from '../api'
import { getUserIdFromJWT } from '../utils/jwt'
import { getDayNumber } from '../utils/getDayNumber'
import { withRouter, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

let ProgressPage = () => {

    const classes = useStyles();

    const [exerciseBase, setExerciseBase] = useState({})
    const [exerciseBaseId, setExerciseBaseId] = useState(0)
    const [chartType, setChartType] = useState("day")

    const [exerciseBases, setExerciseBases] = useState([])

    const [progresses, setProgresses] = useState([])
    const [sporter, setSporter] = useState({})
    const [loading, setLoading] = useState(true)

    const [currentProgresses, setCurrentProgresses] = useState([])

    const [dayData, setDayData] = useState(Array(getDayNumber(new Date())).fill(0))

    useEffect(() => {

        SporterService.getSporterByUserId(getUserIdFromJWT())
            .then((res) => {
                setSporter({ ...res })
            }).catch((e) => console.log('sporter not found'))
    }, [])

    useEffect(() => {
        ProgressService.getProgressesBySporter(sporter.id)
            .then((res) => {
                setProgresses([...res])
            })
    }, [sporter.id])


    useEffect(() => {
        let EBs = []
        if (progresses.length >= 1) {
            progresses.forEach(progress => {
                //push unique
                if (EBs.find(eb => eb.id === progress.exerciseFull.exerciseBase.id) === undefined) {

                    EBs.push(progress.exerciseFull.exerciseBase)
                }
            });
        }
        setExerciseBases(EBs)
        setLoading(false)
    }, [progresses, progresses.length])

    useEffect(() => {
        setExerciseBase({ ...exerciseBases[0] })
    }, [exerciseBases])


    useEffect(() => {

        let filter = progresses.filter((progress) => {
            return progress.exerciseFull.exerciseBase.id === exerciseBase.id
        })


        setCurrentProgresses(filter)
    }, [exerciseBase.id, progresses])

    useEffect(() => {

        let updateDays = [...dayData]
        currentProgresses.forEach(cp => {
            updateDays[getDayNumber(cp.createdAt) - 1] = cp.kg
        })

        console.log(dayData)
        setDayData(updateDays)
    }, [currentProgresses])


    const handleChange = event => {

        setExerciseBaseId([event.target.value])
        setExerciseBase({ ...exerciseBases[event.target.value] })
    };


    const handleTabsChange = (type) => {
        setChartType(type)
    }
    return (
        <div className="progress">

            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Exercise</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={exerciseBaseId ? exerciseBaseId : 0}

                    onChange={handleChange}
                >
                    {exerciseBases.map((eb, id) => {
                        return <MenuItem key={id} value={id}>{eb.title}</MenuItem>
                    })
                    }
                </Select>
            </FormControl>

            <TabsMenu onChange={handleTabsChange} />

            <Chart labelType={chartType} name={exerciseBase.title} averageName="Average Kg" data={{ day: [...dayData] }} />
            {/* <Chart labelType={chartType} name={exerciseBase.title} averageName="Average performance" color="#0F4C75" data={[2, 10, 5, 2, 20, 30, 55, 70, 24.2, 63, 49, 10]} /> */}

        </div>
    )
}

export default withRouter(ProgressPage)
