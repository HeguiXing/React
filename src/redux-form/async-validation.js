import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

//异步验证的使用场景---如注册时当输入name后提示改名字已被使用

//在同步验证中有错误时，异步验证不执行
const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const asyncValidate = (values /*, dispatch */) => {
    console.log(11)
    return sleep(1000).then(() => {
        // simulate server latency
        if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
            throw { username: 'That username is taken' }
        }
    })
}

const renderField = ({
    input,
    label,
    type,
    meta: { asyncValidating, touched, error }
}) => (
        <div>
            <label>{label}</label>
            <div className={asyncValidating ? 'async-validating' : ''}>
                <input {...input} type={type} placeholder={label} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    )

const AsyncValidation = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit(v => console.log(v))}>
            <Field
                name="username"
                type="text"
                component={renderField}
                label="Username"
            />
            <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
            />
            <div>
                <button type="submit" disabled={submitting}>Sign Up</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
          </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'asyncValidation', // a unique identifier for this form
    validate,
    asyncValidate,//异步验证函数
    asyncBlurFields: ['username'] //指定'username'该字段需要在失去焦点的时候触发这个异步验证
})(AsyncValidation)