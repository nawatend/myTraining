import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router";
import { MdHome, MdAccountCircle, MdShowChart, MdFitnessCenter } from "react-icons/md";

const useStyles = makeStyles({
    root: {
        width: "auto",
    },
});

let Nav = () => {

    console.log(useLocation().pathname)
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            showLabels
            className="bottom__nav">
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<MdHome />} />
            <BottomNavigationAction component={Link} to="/workouts" label="Workout" icon={<MdFitnessCenter />} />
            <BottomNavigationAction component={Link} to="/progress" label="Progress" icon={<MdShowChart />} />
            <BottomNavigationAction component={Link} to="/profile" label="Profile" icon={<MdAccountCircle />} />
        </BottomNavigation>
    )
}

export default Nav