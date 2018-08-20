import React from 'react';
import RemoteSubmitForm from './remote-submit'
import RemoteSubmitButton from './submit-button'

// 演示如何通过SUBMIT从不相关的组件或中间件调度操作来提交表单。
class RemoteSumbitForm extends React.Component {
    render(){
        return (
            <div>
                <RemoteSubmitForm></RemoteSubmitForm>
                <RemoteSubmitButton></RemoteSubmitButton>
            </div>
        )
    }
} 
export default RemoteSumbitForm;