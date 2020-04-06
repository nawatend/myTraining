import React from 'react'
import MDButton from '@material-ui/core/Button';

export default function Button(props, { variant = "contained", text = "just a button", color = "primary", onClick = () => { console.log('btn clicked') } }) {
    return (
        <MDButton fullWidth onClick={props.onClick} variant={props.variant || variant} color={props.color || color}>
            {props.text || text}
        </MDButton>
    )
}
