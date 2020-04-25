/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ProgressService, SporterService } from '../api';
//chart
import Chart from '../components/Chart';
import TabsMenu from '../components/Tabs';
import { TextAndLabel } from '../components/texts';
import { getDayNumber, getWeekNumber } from '../utils/getDayNumber';
import { getUserIdFromJWT } from '../utils/jwt';



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

    //datas
    const [dayData, setDayData] = useState(Array(getDayNumber(new Date())).fill(0))
    const [weekData, setWeekData] = useState(Array(getWeekNumber(new Date()) + 1).fill(0))
    const [monthData, setMonthData] = useState(Array(new Date().getMonth() + 1).fill(0))
    const [yearData, setYearData] = useState(Array(5).fill(0))


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
        let updateDays = Array(getDayNumber(new Date())).fill(0)
        currentProgresses.forEach(cp => {
            if (exerciseBase.type === "time") {
                updateDays[getDayNumber(cp.createdAt) - 1] = cp.time
            } else {
                updateDays[getDayNumber(cp.createdAt) - 1] = cp.kg
            }
        })

        //let updatedDays = [...dayData]
        let updateWeek = [...weekData]
        const step = 6


        weekData.forEach((w, i) => {
            let weekTot = 0
            //     console.log("Week", i)
            //    console.log(i * 7 + " - " + (i * 7 + step))
            for (let n = i * 7; n <= (i * 7 + step); n++) {

                weekTot += (updateDays[n]) ? updateDays[n] : 0
            }
            updateWeek[i] = parseInt(weekTot / currentProgresses.length)
            weekTot = 0
        })

        //console.log(updateWeek)


        let goodWeek = [...updateWeek].slice(1, updateWeek.length)
        let updateMonth = [...monthData]
        const monthStep = 3

        monthData.forEach((m, i) => {

            //console.log("month", i)
            let monthTot = 0
            //console.log(i * 4 + " - " + (i * 4 + monthStep))
            for (let n = i * 4; n <= (i * 4 + monthStep); n++) {

                monthTot += (goodWeek[n]) ? goodWeek[n] : 0
            }

            updateMonth[i] = parseInt(monthTot / currentProgresses.length)
            monthTot = 0

        })

        let updateYear = [...yearData]


        yearData.forEach((m, i) => {
            //console.log("month", i)
            let yearTot = 0
            //console.log(i * 4 + " - " + (i * 4 + monthStep))
            for (let n = 0; n <= updateMonth.length; n++) {
                yearTot += (updateMonth[n]) ? updateMonth[n] : 0
            }
            updateYear[i] = parseInt(yearTot / currentProgresses.length)
            yearTot = 0
        })
        console.log(updateMonth)
        console.log(updateYear)


        setYearData(updateYear)
        setMonthData(updateMonth)
        setWeekData(updateWeek)
        setDayData(updateDays)
    }, [currentProgresses])




    const handleChange = event => {

        setExerciseBaseId(event.target.value)
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

            {exerciseBase.type !== "time" ?
                (<Chart labelType={chartType} name={exerciseBase.title} averageName="Average Kg" data={{ day: [...dayData], week: [...weekData], month: [...monthData], year: [...yearData] }} />)
                :
                (<Chart labelType={chartType} name={exerciseBase.title} averageName="Average Minutes" data={{ day: [...dayData], week: [...weekData], month: [...monthData], year: [...yearData] }} />)
            }


            {/* <Chart labelType={chartType} name={exerciseBase.title} averageName="Average performance" color="#0F4C75" data={[2, 10, 5, 2, 20, 30, 55, 70, 24.2, 63, 49, 10]} /> */}

            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <TextAndLabel label={exerciseBase.title} text={currentProgresses.length + " times"} />
                </Grid>
            </Grid>

        </div>
    )
}

export default withRouter(ProgressPage)
