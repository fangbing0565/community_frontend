/**
 * Created by xiajing on 2016/9/22.
 */
import React from 'react';
import './page.css'
class PageComponent extends React.Component {

    constructor(props) {
        super(props)
        this.toggleSwitchChange = this.toggleSwitchChange.bind(this)
        this.togglePageClick = this.togglePageClick.bind(this)
    }

    toggleSwitchChange(event) {
        const {switchChange} = this.props
        switchChange(event.target.value)
    }

    toggleGoNext() {
        const {goNext} = this.props
        goNext()
    }

    toggleGoPrev() {
        const {goPrev} = this.props
        goPrev()
    }

    togglePageClick(index) {
        const {pageClick} = this.props
        pageClick(index)
    }

    render() {
        const {total, totalPage, current} = this.props
        //  当前页码
        //  显示分页按钮
        let pageNum = [];
        let begin;
        let len;
        if (totalPage > 5) {
            len = 5;
            if (current >= (totalPage - 2)) {
                begin = totalPage - 4;
            } else if (current <= 3) {
                begin = 1;
            } else {
                begin = current - 2;
            }
        } else {
            len = totalPage;
            begin = 1;
        }
        //  根据返回的总记录数计算当前页显示的数据
        for (let i = 0; i < len; i++) {
            let showI = begin + i;
            if (current === showI) {
                pageNum.push({num: showI, current: true});
            } else {
                pageNum.push({num: showI, current: false});
            }
        }
        return (
                <div className="paginationDiv">
                    <a className={current === 1 ? 'prev disable' : 'prev'} onClick={() => this.toggleGoPrev()}/>
                        {
                            pageNum && pageNum.map((currentPageNum, index) =>
                                <span key={index}>
                                    { currentPageNum.current ?
                                <a className="num current">{currentPageNum.num}</a>
                                    :
                                <a  onClick={() => this.togglePageClick(currentPageNum.num)} className="num">{currentPageNum.num}</a>
                                    }
                                    </span>
                            )
                        }
                    <a className={current === total ? 'next disable' : 'next'} onClick={() => this.toggleGoNext()}/>
                    <div className="rightDiv">
                        总共<span className="num-total">{total}</span>条，
                        共
                        <span className="num-total">{totalPage}</span>
                        页，到第
                        <input type="text"  onChange={(event) => this.toggleSwitchChange(event)}/>
                        页
                    </div>
                </div>
        )
    }
}

export default PageComponent