import React, { Component } from 'react'
import WizardFormFirstPage from './wizard-form-first-page'
import WizardFormSecondPage from './wizard-form-second-page'
import WizardFormThirdPage from './wizard-form-third-page'

//该示例为向导表单
// 最简单和最推荐的方式是遵循一下几种指示:
// 1. 把每一个页面都用同一个表单名字连接到 reduxForm()
// 2. 指定 destroyOnUnmount为 false 就可以在表单组件卸载的时候保存表单数据
// 3. 你可以为整个表单指定一个同步验证函数
// 4. 使用 onSubmit 来触发进入下一步，因为它强制运行验证函数
// 5. 在提交成功之后手动调用 props.destory()

class WizardForm extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {
            page: 1
        }
    }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }
    submit(v){
        console.log(v);
    }

    render() {
        // const { onSubmit } = this.props
        const { page } = this.state
        return (
            <div>
                {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
                {page === 2 &&
                    <WizardFormSecondPage
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />}
                {page === 3 &&
                    <WizardFormThirdPage
                        previousPage={this.previousPage}
                        // onSubmit={this.submit}
                    />}
            </div>
        )
    }
}

// WizardForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired
// }

export default WizardForm