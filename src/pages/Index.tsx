import * as React from 'react'
import { Navigate } from 'react-router-dom'

const Index = () => {
    return (
        <Navigate to="/search?genre=all&sortBy=release_date" replace={true} />
    )
}

export default Index