import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Home from '../components/Editor/editor'
import Login from '../page/Auth/Login'
import Register from '../page/Auth/Register'

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
                    </Switch>
                </div>
                <Footer />
            </div>
        )
    }
}

// const PrivateRoute = ({component: Component, token, ...rest}) => {
//     return (
//         <Route
//             {...rest}
//             render={(props) => (token && token.length > 0)
//                 ? <Component {...props} />
//                 : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
//         />
//     )
// }

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)

