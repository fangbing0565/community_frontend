import * as React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import '../auth.css'
import { Link } from 'react-router-dom'
import { register, registerError } from './actions'
import { checkRegex } from '../../../util'
import { EMAIL_REGEX } from '../../../config'
let email
let password1
let password2
class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password1: '',
            password2: '',
        }
    }

    handleChange = (event) => {
        switch (event.target.name) {
            case 'email':
                this.setState({
                    email: event.target.value 
                })
                break
            case 'password1':
                this.setState({
                    password1: event.target.value 
                })
                break
            case 'password2':
                this.setState({
                    password2: event.target.value 
                })
                break
            default:
                return
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.updateRegisterError('')

        if (!this.state.email) {
            this.email.focus()
            return
        }

        if (!this.state.password1) {
            this.password1.focus()
            return
        }

        if (!this.state.password2) {
            this.password2.focus()
            return
        }

        if (!checkRegex(EMAIL_REGEX, this.state.email)) {
            this.props.updateRegisterError('邮箱格式不正确')
            return
        }

        if (this.state.password1 !== this.state.password2) {
            this.props.updateRegisterError('两次密码输入不一致')
            return
        }

        this.props.register({
            email: this.state.email,
            username: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2,
        })
    }

    render () {
        return (
            <div className="login-and-register grow">
                <Helmet title="注册 - 投研通" />
                <div className="login-and-register-container">
                    <div className="form-content">
                        <form className="default-form" name="registerForm" onSubmit={(event) => this.handleSubmit(event)}>
                                <div className="title">
                                    <p>注册</p>
                                </div>
                                {/*<div className="errors">*/}
                                    {/*<p>{this.props.registerInfo.error}</p>*/}
                                {/*</div>*/}
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
                                        type="password" 
                                        className="input"
                                        id="password1" 
                                        name="password1"
                                        ref={input => this.password1 = input}
                                        placeholder="密码" 
                                        autoComplete="off"
                                        value={this.state.password1}
                                        onChange={this.handleChange}
                                    />
                                    <div className="input-button" />
                                </div>
                                <div className="form-item">
                                    <input 
                                        type="password" 
                                        className="input"
                                        id="password2" 
                                        name="password2"
                                        ref={input => this.password2 = input}
                                        placeholder="确认密码" 
                                        autoComplete="off"
                                        value={this.state.password2}
                                        onChange={this.handleChange}
                                    />
                                    <div className="input-button" />
                                </div>
                                <button type="submit" className="button-default">立即注册</button>
                        </form>
                        <div className="login-register-help">
                            <p>已有账号？ <Link to="/login">登录</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registerInfo: state.register
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRegisterError: (data) => dispatch(registerError(data)),
        register: (data) => dispatch(register(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)