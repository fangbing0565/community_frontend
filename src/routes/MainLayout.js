import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Home from '../page/Home'
import Login from '../page/Auth/Login'
import Register from '../page/Auth/Register'
import Article from '../page/Article'
import Detail from '../page/Detail'
import Editor from '../page/Editor'

class MainLayout extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-content">
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route exact={true} path="/login" component={Login} />
                        <Route exact={true} path="/register" component={Register} />
                        <Route token={this.props.token} exact={true} path="/editor" component={Editor} />
                        <PrivateRoute token={this.props.token} exact={true} path="/article" component={Article} />
                        <PrivateRoute token={this.props.token} exact={true} path="/detail/:id" component={Detail} />
                    </Switch>
                </div>
                <Footer />
            </div>
        )
    }
}

const PrivateRoute = ({component: Component, token, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => (token && token.length > 0)
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.fetchedToken,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)

