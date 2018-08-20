import React, {Component} from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  console.log(111)
  return sleep(1000).then(() => {
    // simulate server latency
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

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}
const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}
const required = value => (value ? undefined : 'Required');
class App extends Component{
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
      const {input, type, placeholder, meta:{ error, warning, submitFailed}} = this.props;
      const boole = this.state.boole;
      return (
        <div>
          <input type={type} placeholder={placeholder} {...this.props.input} onFocus={this.focus} onBlur={this.blur}/>
          {(submitFailed && boole) && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      )
    }
}

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  // console.log(props.pristine,props.submitting,props.valid)
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label>First Name</label>
        <div>
          <Field name="firstName" component={App} type="text" placeholder="first Name" validate={[required]}/>
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component={App} type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component={App} type="email" placeholder="email"/>
        </div>
      </div>
      <div>
        <label>Age</label>
        <div>
          <Field name="age" component={App} type="number" placeholder="age"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'simple1',
  validate,
  warn
})(SimpleForm)
