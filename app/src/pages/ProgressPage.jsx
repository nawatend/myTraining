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

    const [exerciseId, setExerciseId] = useState(10)
    const [chartType, setChartType] = useState("day")
    useEffect(() => {

    }, [])
    const handleChange = event => {
        setExerciseId(event.target.value)
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
                    value={exerciseId ? exerciseId : 10}

                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    
                    <MenuItem value={10}>Squat</MenuItem>
                    <MenuItem value={20}>Running</MenuItem>
                    <MenuItem value={30}>Benchpress</MenuItem>
                </Select>
            </FormControl>

            <TabsMenu onChange={handleTabsChange} />
            <Chart labelType={chartType} data={[2, 10, 5, 2, 20, 30, 55, 70, 24.2, 63, 49, 10]} />

        </div>
    )
}

export default BaseLayout(ProgressPage)
