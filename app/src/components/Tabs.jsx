import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';



export default function TabsMenu(props) {

    const [value, setValue] = useState(0);
    const [type, setType] = useState('day')

    const types = ['day', 'week', 'month', 'year']

    const handleChange = (event, newValue) => {
        setType(types[newValue])
        setValue(newValue);
    };

    const handleTabs = () => {
        return type
    }


    return (
        <Paper className="tabs">
            <Tabs
                value={value}
                onChange={(event, newValue) => {
                    handleChange(event, newValue)
                    props.onChange(types[newValue])
                }}
                indicatorColor="secondary"
                textColor="primary"
                centered
            >
                
                <Tab label="WEEK" />
                <Tab label="MONTH" />
                <Tab label="YEAR" />
            </Tabs>
        </Paper>
    )
}
