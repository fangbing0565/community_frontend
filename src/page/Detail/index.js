import * as React from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Link} from 'react-router-dom'
import {Editor, EditorState, convertToRaw} from 'draft-js';
import {getArticle} from './actions'
import {checkRegex} from '../../util'
import {EMAIL_REGEX} from '../../config'
import PageComponent from '../../components/Pagination'
import {getDetail, uploadComment} from './actions'
import './index.css'

let articleReq = {page: 1, limit: 10}

class Article extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            content: '',
            selection: '',
            editorState: EditorState.createEmpty()
        };
    }

    componentDidMount() {
        this.props.getDetail(this.props.match.params.id)
    }

    onChange = (editorState) => {
        if (this.state.editorState) {
            this.setState({editorState});
            const content = this.state.editorState.getCurrentContent();
            const selection = this.state.editorState.getSelection();
            this.setState(
                {
                    content: convertToRaw(content),
                    selection: selection,
                }
            )
        }
    }

    openEdit() {

    }

    uploadComment = () => {
        const {content} = this.state
        let str = ''
        if(!content || !content.blocks){
            return
        }
        for (let i = 0; i < content.blocks.length; i++) {
            str += content.blocks[i].text
        }
        const data = {
            reply_content: str,
            article_id: this.props.detail.entities._id,
            comment_user_id: '',  //本地获取
        }
        console.log(data)
        // this.props.uploadComment(data)
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
                        <div className="add-comment">
                            <button onClick={this.openEdit}>添加评论</button>
                        </div>
                        <div className="comment-list">
                            {
                                detail.comment && detail.comment.map((item, index) =>
                                    <div key={index}>
                                        {'1'}
                                        {
                                            item.comment_user_id === '用户id' &&
                                            <div onClick={this.deleteComment}>删除
                                            </div>
                                        }
                                    </div>
                                )
                            }
                            {
                                detail.comment &&
                                <div className="pagination-box">
                                    <PageComponent/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="edit-box">
                        <div className="edit-add">
                            <Editor editorState={this.state.editorState} onChange={this.onChange}/>
                        </div>
                        <button className="save-add" onClick={this.uploadComment}>
                            +
                        </button>
                    </div>
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
        uploadComment: (data) => dispatch(uploadComment(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

