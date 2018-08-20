import React from 'react'
import { Field, reduxForm } from 'redux-form'

// 当您需要在用户输入和 store 中的数据之间施加某些控制，你可以使用 normalizer。
// normalizer 就是一个每当值改变是，可以在保存到 store 之前进行某些转换的一个函数。

//Normalizers 传递了4个参数:
//  value - 你设置了 normalizer 字段的值(当前值)
//  previousValue - 这个值最近一次变化之前的一个值(没改之前的值)
//  allValues - 表单中，所有字段当前的值(当前列表中已有的所有值)
//  previousAllValues - 表单中，所有字段在最近一次变化前的值(列表没改之前已有的所有值)

const normalizePhone = value => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}
const upper = value => value && value.toUpperCase()
const lower = value => value && value.toLowerCase()
const lessThan = otherField => (value, previousValue, allValues,previousAllValues) =>
    parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue
const greaterThan = otherField => (value, previousValue, allValues) =>
    parseFloat(value) > parseFloat(allValues[otherField]) ? value : previousValue

const FieldNormalizingForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <div>
                    <Field
                        name="username"
                        component="input"
                        type="text"
                        placeholder="Username"
                        normalize={lower}
                    />
                </div>
            </div>
            <div>
                <label>Shout</label>
                <div>
                    <Field
                        name="shout"
                        component="input"
                        type="text"
                        placeholder="Shout something!"
                        normalize={upper}
                    />
                </div>
            </div>
            <div>
                <label>Phone</label>
                <div>
                    <Field
                        name="phone"
                        component="input"
                        type="text"
                        placeholder="Phone Number"
                        normalize={normalizePhone}
                    />
                </div>
            </div>
            <div>
                <label>Min</label>
                <div>
                    <Field
                        name="min"
                        component="input"
                        type="number"
                        normalize={lessThan('max')}
                    />
                </div>
            </div>
            <div>
                <label>Max</label>
                <div>
                    <Field
                        name="max"
                        component="input"
                        type="number"
                        normalize={greaterThan('min')}
                    />
                </div>
            </div>
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
        </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'normalizing',
    initialValues: { min: '1', max: '10' },
    onSubmit:v => console.log(v)
})(FieldNormalizingForm)