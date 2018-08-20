import React,{ Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form'

//服务器验证

//在同步验证中有错误时，服务器验证不执行
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
function submit(values) {
    return sleep(1000).then(() => {
        if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
            throw new SubmissionError({
                username: 'User does not exist',
                _error: 'Login failed!'
            })
        } else if (values.password !== 'redux-form') {
            throw new SubmissionError({
                password: 'Wrong password',
                _error: 'Login failed!'
            })
        } else {
            window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        }
    })
}

class Ads extends Component{
    constructor(props){
        super(props);
        this.state = {
            boole: true
        }
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
    }
    focus(e){
        this.setState({
            boole: false
        })
        this.props.input.onFocus(e);
    }
    blur(e){
        this.setState({
            boole: true
        })
        this.props.input.onBlur(e);
    }
    render(){
        const {input, placeholder, id, type, meta:{ error, warning, submitFailed}} = this.props;
        const boole = this.state.boole;
        return (
            <div>
                <input {...input} type={type} placeholder={placeholder} id={id} onFocus={this.focus} onBlur={this.blur}/>
                {(submitFailed && boole) && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        )
    }
}

const SubmitValidation = (props) => {
    const {pristine, submitting, reset, handleSubmit,error} = props;
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <div>
                    用户名，将通过验证：john，paul，george，或ringo。
                </div>
                <div>
                    所有用户的有效密码：redux-form。
                </div>
                <div>
                    <label htmlFor="userName">User Name</label>
                    <Field name="username" id="userName" component={Ads} placeholder="User Name" type="text"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" id="password" component={Ads} placeholder="Password" type="password"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" id="email" component={Ads} placeholder="Email" type="email"/>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <Field name="age" id="age" component={Ads} placeholder="Age" type="number"/>
                </div>
                <div>{error && <strong>{error}</strong>}</div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'submitValidation'
})(SubmitValidation);