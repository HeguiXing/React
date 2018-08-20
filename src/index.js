import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import init from './redux-form/reducer';

// import SimpleForm from './App';

//redux-form 的简单示例
// import Simple from './redux-form/simple'

//redux-form的同步验证
// import SyncValidation from './redux-form/sync-validation';

//redux-form的服务器验证
// import SubmitValidation from './redux-form/submit-validation';

//redux-form的异步验证
// import AsyncValidation from './redux-form/async-validation';

//初始化表单
// import InitializeFromStateForm from './redux-form/init-state';

// 访问表单的某些值
// import SelectingFormValuesForm from './redux-form/selecting-values';

//FieldArray的使用
// import FieldArraysForm from './redux-form/field-array';

//演示如何通过SUBMIT从不相关的组件或中间件调度操作来提交表单。
// import RemoteSumbitForm from './redux-form/remote-submit/index'

// import FieldNormalizingForm from './redux-form/normalizing'

import WizardForm from './redux-form/wizard/index'

const reducers = {
    // ... your other reducers here ...
    form: formReducer,// <---- Mounted at 'form'
    init     
}
const reducer = combineReducers(reducers)
const store = createStore(
    reducer,
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

ReactDOM.render(
    <Provider store={store}>
        <WizardForm/>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
