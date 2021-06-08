# inquirer.js 

一组常见的交互式命令行用户界面

特色：
- 提供错误回调
- 可以提出问题
- 解析输入的答案
- 验证答案
- 管理分层提示


## 文档

### 安装
```sh
npm install inquirer
```
示例
```js
var inquirer = require('inquirer');
inquirer.prompt([{
    name: 'name',
    type: 'input',
    message: '请输入名称?',
    validate: (input) => {
        if (!input) {
            console.log("\n不能为空，请重新输入" );
            return false;
        } else if (list.includes(input.toLowerCase())) {
            console.log("\n" + input + "已经存在，请重新输入");
            return false;
        } else {
            return true;
        }
    },
  }]).then((answers) => {
    // Use user feedback for... whatever!!
  }).catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
```

### 参数 

- type：表示提问的类型，包括：`input`, `confirm`, `list`, `rawlist`, `expand`, `checkbox`, `password`, `editor`；
- name: 存储当前问题回答的变量；
- message：问题的描述；
- default：默认值；
- choices：列表选项，在某些`type`下可用，并且包含一个分隔符(separator)；
- validate：对用户的回答进行校验；
- filter：对用户的回答进行过滤处理，返回处理后的值；
- transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
- when：根据前面问题的回答，判断当前问题是否需要被回答；
- pageSize：修改某些type类型下的渲染行数；
- prefix：修改`message`默认前缀；
- suffix：修改`message`默认后缀。