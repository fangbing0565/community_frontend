import * as React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import '../Auth.css'
import { login, loginError } from './actions'
import { checkRegex } from '../../../util'
import { EMAIL_REGEX } from '../../../config'
import './index.css'

class Login extends React.Component {

    private email
    private password
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillUnmount() {
        this.props.updateLoginError('')
    }

    handleChange = (event) => {
        switch (event.target.name) {
            case 'email':
                this.setState({
                    email: event.target.value 
                })
                break
            case 'password':
                this.setState({
                    password: event.target.value 
                })
                break
            default:
                return
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.updateLoginError('')

        if (!this.state.email) {
            this.email.focus()
            return
        }

        if (!this.state.password) {
            this.password.focus()
            return
        }

        if (!checkRegex(EMAIL_REGEX, this.state.email)) {

            this.props.updateLoginError('邮箱格式不正确')
            return 
        }

        this.props.login({
            password: this.state.password,
            email: this.state.email,
            username: this.state.email,
        })
    }

    componentWillReceiveProps() {
        if (this.props.QRCode.entities.url !== null) {
           // window.open(this.props.QRCode.entities.url)
        }
    }

    render () {
        if (this.props.QRCode.entities.url) {
            window.open(this.props.QRCode.entities.url)
        }
        return (
            <div className="login-and-register grow">
                <Helmet title="登录 - 投研通" />
                <div className="login-and-register-container">
                    <div className="form-content">
                        <form className="default-form" name="loginForm" onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="title">
                                <p>登录</p>
                            </div>
                            <div className="errors">
                                <p>{this.props.loginInfo.error}</p>
                            </div>
                            <div className="form-item">
                                <input
                                    className="input"
                                    type="text" 
                                    id="email" 
                                    name="email"
                                    ref={input => this.email = input}
                                    placeholder="邮箱" 
                                    autoComplete="off"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <div className="input-button" />
                            </div>
                            <div className="form-item">
                                <input 
                                    className="input"
                                    type="password" 
                                    id="password" 
                                    name="password"
                                    ref={input => this.password = input}
                                    placeholder="密码" 
                                    autoComplete="off"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <div className="input-button" />
                            </div>
                            <button type="submit" className="button-default">立即登录</button>
                        </form>
                        <div className="login-register-help">
                            <p>还没有账号？<Link to="/register">注册</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        captcha: state.captcha,
        loginInfo: state.login,
        QRCode: state.QRCode,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(login(data)),
        updateLoginError: (error) => dispatch(loginError(error)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
