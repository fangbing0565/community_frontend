import history from '../history'
const UA = window.navigator.userAgent

function json2Form(json) {
    if (!json) {
        return ''
    }

    let str = []
    for (let p in json) {
        if (json.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
        }
    }
    return str.join('&')
}

async function ajax(url, payload, method) {
    if (!url) {
        return
    }

    let init = {}
    // const Auth = localStorage.getItem('token') ? ('JWT ' + localStorage.getItem('token')) : ''

    if (method === 'GET' || method === 'get') {
        url = url + json2Form(payload)

        init = {
            method: 'GET',
            credentials: 'include',
            headers: {
            },
        }
    } else if (method === 'POST' || method === 'post') {
        init = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'cache-control': 'no-cache',
            },
            body: JSON.stringify(payload)
        }
    } else {
        return
    }

    // url = API_HOST + url

    try {
        const response = await fetch(url, init)
        if (
            response.status === 500 ||
            response.status === 404
        ) {
            return Object.assign({}, {error: response.statusText}, {hasError: true})
        }
        const responseJson = await response.json()

        if (response.status.toString()[0] !== '2') {
            return {...responseJson, hasError: true}
        } else {
            return responseJson
        }
    } catch (error) {
        return error.statusText
    }
}

async function ajaxJson(url, payload, method) {
    if (!url) {
        return
    }

    let init = {}
    // const Auth = localStorage.getItem('token') ? ('JWT ' + localStorage.getItem('token')) : ''

    if (method === 'GET' || method === 'get') {
        url = url + json2Form(payload)

        init = {
            method: 'GET',
            credentials: 'include',
            headers: {
                // 'Authorization': Auth
            },
        }
    } else if (method === 'POST' || method === 'post') {
        init = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': Auth
            },
            body: JSON.stringify(payload)
        }
    } else {
        return
    }

    // url = API_HOST + url

    try {
        const response = await fetch(url, init)
        if (
            response.status === 500 ||
            response.status === 404
        ) {
            return Object.assign({}, {error: response.statusText}, {hasError: true})
        }
        const responseJson = await response.json()

        if (response.status.toString()[0] !== '2') {
            return {...responseJson, hasError: true}
        } else {
            return responseJson
        }
    } catch (error) {
        return error.statusText
    }
}

function filterPromptData  (data, filterType){
    data = data.result
    let str = []
    for(let i =0; i < data.length; i++){
        str[i] = ''
        for(let j=0; j<data[i].length; j++){
            const end = data[i][j].length
            let temp = ''
            if(data[i][j].indexOf('product_name') >= 0  && filterType.name){
                const start = data[i][j].indexOf('product_name') - 12
                temp = data[i][j].slice(0,start) + filterType.name + data[i][j].slice(12,end)
            }
            if(data[i][j].indexOf('category') >= 0  && filterType.category){
                const start = data[i][j].indexOf('product_name') -8
                temp = data[i][j].slice(0,start) + filterType.category + data[i][j].slice(8,end)
            }
            if(data[i][j].indexOf('expense') >= 0  && filterType.expense){
                const start = data[i][j].indexOf('product_name') -7
                temp = data[i][j].slice(0,start) + filterType.category + data[i][j].slice(7,end)
            }
            if(data[i][j] === 'paragraph'){
                data[i][j] = '\n'
            }
            str[i] += temp ? temp : data[i][j]
        }
    }
    for(let i = 0; i < str.length; i ++){
        if(!str[i] || str[i] === '\n'){   // todo  改行只有换行符号，就去除
            str.splice(i,1)
        }
    }
    return str
}


/* detecting wechat */
function isWechat() {
    if (UA.includes('micromessenger')) {
        return true
    }
    return false
}

function cutString(s, n) {
    if (s.length > n) {
        return s.substring(0, n) + '...'
    } else {
        return s
    }
}


function toInt(num) {
    if (typeof num === 'number') {
        num = num.toString()
    }

    if (num) {
        return parseInt(num, 10)
    }

    return 0
}

function getCookies() {
    let cookies = {
        token: ''
    }
    for (let cookie of document.cookie.split('; ')) {
        let [name, value] = cookie.split('=')
        cookies[name] = decodeURIComponent(value)
    }
    return cookies
}

function createCookie(name, value, days) {
    let expires
    if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; expires=' + date.toUTCString()
    } else {
        expires = ''
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
}

function clearCookieByName(name) {
    createCookie(name, '', -1)
}

function checkRegex(regex, s) {
    const re = new RegExp(regex)
    return re.test(s)
}

function toLogin(backUrl) {
    if (!backUrl) {
        backUrl = window.location.href
    }

    localStorage.setItem('BackUrl', backUrl)

    history.push('/login')
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

function dateFormat(date) {
    let temp = date.replace(/-/g, '/')
    return new Date(temp)
}

function compare(property) {
    let value1, value2
    return function (obj1, obj2) {
        if (property === 'created_at') {
            const temp = '_source'
            value1 = Date.parse(obj1[temp][property]);
            value2 = Date.parse(obj2[temp][property]);
        } else {
            value1 = obj1[property];
            value2 = obj2[property];
        }
        return value1 - value2;     // 升序 、2 - 1 降序
    }
}

function sortReports(index, data) {
    switch (index) {
        case '_score':
            return data.sort(compare('_score'));
        case 'created_at':
            return data.sort(compare('created_at'));
        default:
            break
    }
}

function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return (r[2])
    }
    return null;
}

function objToArray(obj) {
    let arr = []
    for (let i in obj) {
        if (i) {
            arr.push(obj[i])
        }
    }
    // console.log(arr)
    return arr
}

function getRandom(n) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = '';
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}




export {
    ajax,
    ajaxJson,
    filterPromptData,
    UA,
    isWechat,
    cutString,
    toInt,
    getCookies,
    createCookie,
    clearCookieByName,
    checkRegex,
    toLogin,
    isEmpty,
    dateFormat,
    sortReports,
    GetQueryString,
    objToArray,
    getRandom,
}