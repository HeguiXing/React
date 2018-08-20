import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { load } from './reducer'

//初始化表单

const data = {
    firstName: 'Jane',
    lastName: 'Doe',
    age: '42',
    sex: 'female',
    employed: true,
    favoriteColor: 'Blue',
    bio: 'Born to write amazing Redux code.'
}
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

let InitializeFromStateForm = props => {
    const { handleSubmit, load, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit(v => console.log(v))}>
            <div>
                <button type="button" onClick={() => load(data)}>Load Account</button>
            </div>
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
                <label>Age</label>
                <div>
                    <Field name="age" component="input" type="number" placeholder="Age" />
                </div>
            </div>
            <div>
                <label>Sex</label>
                <div>
                    <label>
                        <Field name="sex" component="input" type="radio" value="male" />
                        {' '}
                        Male
            </label>
                    <label>
                        <Field name="sex" component="input" type="radio" value="female" />
                        {' '}
                        Female
            </label>
                </div>
            </div>
            <div>
                <label>Favorite Color</label>
                <div>
                    <Field name="favoriteColor" component="select">
                        <option value="">Select a color...</option>
                        {colors.map(colorOption => (
                            <option value={colorOption} key={colorOption}>
                                {colorOption}
                            </option>
                        ))}
                    </Field>
                </div>
            </div>
            <div>
                <label htmlFor="employed">Employed</label>
                <div>
                    <Field
                        name="employed"
                        id="employed"
                        component="input"
                        type="checkbox"
                    />
                </div>
            </div>
            <div>
                <label>Bio</label>
                <div>
                    <Field name="bio" component="textarea" />
                </div>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Undo Changes
                </button>
            </div>
        </form>
    )
}

InitializeFromStateForm = reduxForm({
    form: 'initializeFromState',
    // enableReinitialize:true,
    // keepDirtyOnReinitialize:true
})(InitializeFromStateForm)

InitializeFromStateForm = connect(
    state => ({
        initialValues: state.init.data//initialValues--redux-form的初始状态
    }),
    { load }
)(InitializeFromStateForm)

export default InitializeFromStateForm
