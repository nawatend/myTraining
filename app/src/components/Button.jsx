import React from 'react'
import MDButton from '@material-ui/core/Button';

export default function Button({ variant = "contained", text = "just a button" }) {
    return (
        <MDButton variant={variant} color="primary">
            {text}
        </MDButton>
    )
}
