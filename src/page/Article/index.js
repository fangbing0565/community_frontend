import * as React from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Link} from 'react-router-dom'
import {getArticle} from './actions'
import {checkRegex} from '../../util'
import {EMAIL_REGEX} from '../../config'
import PageComponent from '../../components/Pagination'
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
        this.props.getArticle(articleReq)
    }

    render() {
        const articles = this.props.articles.entities
        return (
            <div className="article grow">
                <Helmet title="文章列表 - 启程"/>
                <div className="articleList">
                    {
                        articles && articles.length > 0 &&
                        articles.map((item,index) =>
                            <div key={index} className="article-item">
                                <Link className="title" to={`/detail/${item.id}` }  >{item.title}</Link>
                                <div className="sub-title">
                                    <div>
                                        作者
                                    </div>
                                    <div>
                                        {item.add_date}
                                    </div>
                                </div>
                                <p className="content">{item.content}</p>
                            </div>

                        )
                    }
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
        articles: state.articles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (data) => dispatch(getArticle(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

