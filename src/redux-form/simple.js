import React from 'react';
import { reduxForm, Field } from 'redux-form'

//简单form示例

const Simple = (props) => {
    const {pristine, submitting, reset} = props;
    return (
        <form>
            <div>
                <label form="firstName">First Name</label>
                <div>
                    <Field name="firstName" component="input" placeholder="First Name"/>
                </div>
                <label form="lastName">Last Name</label>
                <div>
                    <Field name="lastName" component="input" placeholder="Last Name"/>
                </div>
                <label form="email">Email</label>
                <div>
                    <Field name="email" component="input" placeholder="Email"/>
                </div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'simple'
})(Simple);