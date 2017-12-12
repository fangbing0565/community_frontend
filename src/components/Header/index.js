import * as React from 'react'
import { Link } from 'react-router-dom'
import { logout } from './actions'
import { connect } from 'react-redux'
import Logo from '../Logo'
import './Header.css'

class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            showMenu: false,
            enableClose: 0,
        }
    }
    componentDidMount() {
        document.onclick = this.hideFavorite;
    }

    handleLogout = () => {
        this.setState({
            showMenu: false,
            currentTab: 0,
            favoritesState: 'hide-favorite',
        })
        this.props.logout()
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        const hasToken = this.props.token ? true : false
        // const email = this.props.user.entities
        const email = 'fang'
        const focusMask = this.state.focusMask
        return (
            <div className="header">
                {
                    focusMask ?
                        <div className="focus-background"/>
                        :
                        ''
                }
                <div className="header-container">
                    <Logo/>
                    <div className={'menu ' + (this.state.showMenu ? 'show-menu' : 'hide-menu')}>
                        <ul className="main-nav"/>
                        <div className="user-nav">
                            {
                                hasToken ?
                                    <ul>
                                        <li><a>{email}</a></li>
                                        <li><Link to="/editor">Editor</Link></li>
                                        <li><Link to="/article">文章</Link></li>
                                        <li><a onClick={() => {this.handleLogout()}}>退出登录</a></li>
                                    </ul> :
                                    <ul>
                                        <li><Link to="/login">登录</Link></li>
                                        <li><Link to="/register">注册</Link></li>
                                    </ul>
                            }
                        </div>
                    </div>
                    <div className="mobile-menu-icon" onClick={() => this.toggleMenu()}>
                        <p><i className="fa fa-bars"/></p>
                    </div>

                    {
                        this.state.showMenu &&
                        <div className="menu-overlay" onClick={() => this.toggleMenu()}/>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.fetchedToken,
        user: state.user,
        reports: state.reports,
        detail: state.articleDetail,
        isLoggingOut: state.isLoggingOut,
        hasLoggedOut: state.hasLoggedOut,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
