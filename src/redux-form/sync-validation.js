import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'

// 同步验证

const validate = (value) => {
    const errors = {};
    const reg = /^[A-Z0-9-_*.%]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(value.firstName && value.firstName.length > 10){
        errors.firstName = 'Must be 10 characters or less'
    }
    if(!reg.test(value.email)){
        errors.email = 'Invalid email address';
    }
    return errors;
}
const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const required = value => (value ? undefined : 'Required');

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

const SyncValidation = (props) => {
    const {pristine, submitting, reset, handleSubmit} = props;
    return (
        <form onSubmit= {props.handleSubmit(v=> console.log(v))}>
            <div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    {/* validate={[required]}--局部验证 */}
                    <Field name="firstName" id="firstName" component={Ads} placeholder="First Name" type="text" validate={[required]}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" id="lastName" component={Ads} placeholder="Last Name" type="text"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" id="email" component={Ads} placeholder="Email" type="email"/>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <Field name="age" id="age" component={Ads} placeholder="Age" type="number"/>
                </div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'syncValidation',
    validate,//全局验证
    warn
})(SyncValidation);