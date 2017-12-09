import * as React from 'react'
import './index.css'
import SearchInput from '../../components/SearchInput'
import history from '../../history'

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            search: '',
            focusMask: false
        }
    }

    handleChange = (event: any) => {
        this.setState({
            search: event.target.value 
        })
    }

    goToSearch(input: any) {
        const url = '/search/' + input
        history.push(url)
        this.hideMask()
    }
    setBackgroundMask() {
        this.setState(
            {
                focusMask: true
            }
        )
    }
    hideMask() {
        this.setState(
            {
                focusMask: false
            }
        )
    }
    render () {
        const focusMask = this.state.focusMask
        return (
            <div className="home grow">
                {
                    focusMask ?
                        <div className="focus-background"/>
                        :
                        ''
                }
                <div className="bg bg-left" />
                <div className="bg bg-right" />
                <div className="bg-content">
                    <div className="title">
                        <h1>一站式智能金融研究搜索引擎</h1>
                        <h2>全球首款基于人工智能进行分析师及研报评级的智能分析系统</h2>
                    </div>
                    <div className="search">
                        <SearchInput searchResult={(input: any) => this.goToSearch(input)} setMask={() => this.setBackgroundMask()} hideMask={() => this.hideMask()} definePlaceholder="搜索全球超过100万份金融研究报告" />
                    </div>
                    <div className="bottom">
                        投研通由EditorAI的文本智能分析技术提供支持
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
