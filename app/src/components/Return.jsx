import React from 'react'
import { MdNavigateBefore } from "react-icons/md"

export default function Return() {
    return (
        <div onClick={() => window.history.back()} className="button__return">
            <MdNavigateBefore className="back__icon" />
        </div>
    )
}
