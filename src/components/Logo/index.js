import * as React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class Logo extends React.Component {
    render() {
        return (
            <div className="logo">
                <Link to="/">
                    <div className="icon" />
                    <p>启程</p>
                </Link>
            </div>
        )
    }
}

export default Logo
