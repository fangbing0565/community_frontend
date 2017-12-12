import {ajax} from '../../util'
function afterUpload() {
    alert('发表成功')
    window.location.href = '/article'
}

export function uploadArticleError(data) {
    return {
        type: 'UPLOAD_ARTICLE_ERROR',
        data
    }
}

export function uploadArticleSuccess(data) {
    return {
        type: 'UPLOAD_ARTICLE_ERROR',
        data
    }
}

export function uploadArticle(data) {
    return (dispatch) => {
        const url = '/api/article_upload'
        ajax(url, data, 'POST').then(res => {
            if (res.hasError) {
                dispatch(uploadArticleError(res[Object.keys(res)[0]]))
            } else {
                dispatch(uploadArticleSuccess(res))
                afterUpload()
            }
        })
    }
}