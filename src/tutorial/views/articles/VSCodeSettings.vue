<template>
  <el-main>
    <h3>VSCode Setting</h3>

    <vue-code>
      <pre lang="json5">
{
    // 换行
    "editor.wordWrap": "on",
    // 是否允许自定义的snippet片段提示
    "editor.snippetSuggestions": "top",
    // #每次保存的时候自动格式化
    "editor.formatOnSave": false,
    // #每次保存的时候将代码按eslint格式进行修复 使用eslint 風格使用standard 進行代碼規則限制
    // "editor.fontWeight": "200",
    "editor.formatOnType": false,
    "git.confirmSync": false,
    "window.zoomLevel": 1,
    "editor.renderWhitespace": "boundary",
    "editor.cursorBlinking": "smooth",
    "editor.minimap.enabled": true,
    "editor.minimap.renderCharacters": false,
    "editor.codeLens": true,
    "eslint.run": "onType",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue"
    ],
    //  #让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "vetur.format.options.tabSize": 4,
    "explorer.confirmDelete": false,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "auto", //force-aligned
            "end_with_newline": false
        },
        "prettier": {
            "semi": true, //要不要分号
            "printWidth": 1024, //超长换行
            "sortAttributes": true
        }
    },
    // 格式化stylus, 需安装Manta's Stylus Supremacy插件
    "stylusSupremacy.insertColons": false, // 是否插入冒号
    "stylusSupremacy.insertSemicolons": false, // 是否插入分好
    "stylusSupremacy.insertBraces": false, // 是否插入大括号
    "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
    "stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    // 設置行高
    "editor.lineHeight": 22,
    "search.followSymlinks": false,
    "zenMode.restore": true,
    "breadcrumbs.enabled": true,
    "[wxml]": {
        "editor.defaultFormatter": "qiu8310.minapp-vscode"
    },
    "javascript.format.placeOpenBraceOnNewLineForControlBlocks": true,
    "editor.formatOnPaste": false,
    "editor.cursorStyle": "line-thin",
    "editor.suggestSelection": "first",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.fontSize": 14,
    "vetur.grammar.customBlocks": {
        "docs": "md",
        "i18n": "json"
    }
}
            </pre
      >
    </vue-code>
  </el-main>
</template>
