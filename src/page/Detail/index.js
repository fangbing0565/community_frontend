import * as React from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Link} from 'react-router-dom'
import {getArticle} from './actions'
import {checkRegex} from '../../util'
import {EMAIL_REGEX} from '../../config'
import PageComponent from '../../components/Pagination'
import { getDetail } from './actions'
import './index.css'

let articleReq = {page: 1, limit: 10}

class Article extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        this.props.getDetail(this.props.match.params.id)
    }

    render() {
        const detail = this.props.detail.entities
        return (
            <div className="article grow">
                <Helmet title="详情 - 启程"/>
                <div className="article-container">
                    <div>
                        <div className="title">{detail.title}</div>
                        <div className="sub-title">
                            <div>
                                作者
                            </div>
                            <div>
                                事件
                            </div>
                        </div>
                        <p className="content">{detail.content}</p>
                    </div>
                </div>
                <div className="pagination-box">
                    <PageComponent/>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        detail: state.detail,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetail: (data) => dispatch(getDetail(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

