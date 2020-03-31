import React from 'react'
import MDButton from '@material-ui/core/Button';

export default function Button({ variant = "contained", text = "just a button", color = "primary", onClick = () => { console.log('btn clicked') } }) {
    return (
        <MDButton  onClick={() => onClick()} variant={variant} color={color}>
            {text}
        </MDButton>
    )
}
