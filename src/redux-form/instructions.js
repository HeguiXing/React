// 参数说明

//reduxForm
// 1. form: String ---表单的名称以及表单状态将在redux-formreducer 下安装的关键字
// 2. destroyOnUnmount: boolean ---卸载组件时是否在Redux存储中自动销毁表单的状态。默认为true。
// 3. enableReinitialize: boolean ---表单将在每次initialValues改变时重新初始化。默认为false。
// 4. forceUnregisterOnUnmount: boolean ---是否强制取消注册字段 - 与...一起使用destroyOnUnmount。对于要在卸载时销毁字段但不在表单状态下销毁的向导类型表单很有用。默认为false，因为表单通常在卸载时未注册
// 5. initialValues: Object<String, String> ---用于初始化表单的值。值应该在表单中{ field1: 'value1', field2: 'value2' }。
// 6. onChange: Function
// 7. onSubmit: Function
// 8. validate: Function ---一个同步验证函数，它接受传递给组件的表单值和props。
// 9. warn: Function ---一个同步警告函数，它接受传递给组件的表单值和props。
// API
// 1. reset() ---将表单重置.
// 2. dirty: boolean ---当当前表单值与初始值不同时为true，否则为false。
// 3. invalid: boolean ---当表单无效(存在验证错误)时为true，否则为false。
// 4. valid: boolean ---当表单有效时为true(没有验证错误)，否则为false。
// 5. values: Object ---表单中所有字段的当前值。
// 6. pristine: boolean ---当当前表单值与初始值相同时为true，否则为false。

// 地址：https://redux-form.com/