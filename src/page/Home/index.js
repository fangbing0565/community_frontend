import * as React from 'react'
import './index.css'
import history from '../../history'

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            focusMask: false
        }
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value 
        })
    }

    goToSearch(input) {
        const url = '/search/' + input
        history.push(url)
        this.hideMask()
    }
    setBackgroundMask() {
        this.setState(
            {
                focusMask: true
            }
        )
    }
    hideMask() {
        this.setState(
            {
                focusMask: false
            }
        )
    }
    render () {
        const focusMask = this.state.focusMask
        return (
            <div className="home grow">
                {
                    focusMask ?
                        <div className="focus-background"/>
                        :
                        ''
                }
                <div className="bg bg-left" />
                <div className="bg bg-right" />
                <div className="bg-content">
                    <div className="title">
                        <h1>启程社区</h1>
                        <h2>有价值的知识分享平台</h2>
                    </div>
                    <div className="bottom">
                        本站由FangBing开发维护
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
