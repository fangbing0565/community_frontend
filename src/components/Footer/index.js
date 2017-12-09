import * as React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import './Footer.css'

class Footer extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-container">
                    启程 © {moment().year()} 沪
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        width: state.width,
    }
}

export default connect(mapStateToProps, {})(Footer)
