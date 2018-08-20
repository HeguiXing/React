import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'


// 有时候您希望访问表单组件中某些字段的值，你需要在 store 中直接 connect() 表单的值。
// 在一般的使用情况下，redux-form 通过 formValueSelector 提供了一个方便的选择器。
// 需要用到的属性是formValueSelector。

//使用场景-如当用户选择有邮箱时邮箱输入框出现


let SelectingFormValuesForm = props => {
    const {
        favoriteColorValue,
        fullName,
        handleSubmit,
        hasEmailValue,
        pristine,
        reset,
        submitting
    } = props
    return (
        <form onSubmit={handleSubmit(v => console.log(v))}>
            <div>
                <label>First Name</label>
                <div>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                    />
                </div>
            </div>
            <div>
                <label>Last Name</label>
                <div>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="hasEmail">Has Email?</label>
                <div>
                    <Field
                        name="hasEmail"
                        id="hasEmail"
                        component="input"
                        type="checkbox"
                    />
                </div>
            </div>
            {hasEmailValue &&
                <div>
                    <label>Email</label>
                    <div>
                        <Field
                            name="email"
                            component="input"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                </div>}
            <div>
                <label>Favorite Color</label>
                <div>
                    <Field name="favoriteColor" component="select">
                        <option />
                        <option value="#ff0000">Red</option>
                        <option value="#00ff00">Green</option>
                        <option value="#0000ff">Blue</option>
                    </Field>
                </div>
            </div>
            {favoriteColorValue &&
                <div
                    style={{
                        height: 80,
                        width: 200,
                        margin: '10px auto',
                        backgroundColor: favoriteColorValue
                    }}
                />}
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit {fullName}
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
          </button>
            </div>
        </form>
    )
}
SelectingFormValuesForm = reduxForm({
    form: 'selectingFormValues'
})(SelectingFormValuesForm)
const selector = formValueSelector('selectingFormValues') //属性是该表单的标示
SelectingFormValuesForm = connect(state => {
    const hasEmailValue = selector(state, 'hasEmail')
    const favoriteColorValue = selector(state, 'favoriteColor')
    const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    return {
        hasEmailValue,
        favoriteColorValue,
        fullName: `${firstName || ''} ${lastName || ''}`
    }
})(SelectingFormValuesForm)
export default SelectingFormValuesForm

