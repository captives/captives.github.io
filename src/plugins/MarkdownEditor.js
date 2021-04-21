//必须全局注册
import MavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import markdownItContainer from "markdown-it-container";
const markdownIt = MavonEditor.markdownIt;

["success", "info", "warning", "error"].forEach((type) => {
    const reg = eval("/^" + type + "\\s+(.*)|" + type + "$/");
    markdownIt.use(markdownItContainer, type, {
        validate: function(params) {
            return params.trim().match(reg);
        },
        render: function(tokens, idx) {
            var m = tokens[idx].info.trim().match(reg);
            if (tokens[idx].nesting === 1) {
                if (markdownIt.utils.escapeHtml(m[1])) {
                    return `<div class='tip-block ${type}'><span class='title'> ${markdownIt.utils.escapeHtml(m[1])} </span>`;
                } else {
                    return `<div class='tip-block ${type}'>`;
                }
            } else {
                return "</div>";
            }
        },
    });
});

markdownIt.use(markdownItContainer, "more", {
    validate: function(params) {
        return params.trim().match(/^more\s+(.*)$/);
    },
    render: function(tokens, idx) {
        var m = tokens[idx].info.trim().match(/^more\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
            // opening tag
            return "<div class='more-block'><details><summary>" + markdownIt.utils.escapeHtml(m[1]) + "</summary>\n";
        } else {
            // closing tag
            return "</details></div>";
        }
    },
})

//覆盖编辑器的逻辑，a连接打开新页面跳转
// markdownIt.renderer.rules.link_open = function(tokens, idx, options, env, self) {
//     const item = tokens[idx].attrs.find(item => item.includes('href'));
//     if (item && item[1].startsWith('#')) {
//         return self.renderToken(tokens, idx, options);
//     }

//     if (!tokens[idx].attrs.some(item => item.includes('target'))) {
//         tokens[idx].attrs.push(['target', '_blank']);
//     }
//     return self.renderToken(tokens, idx, options);
// };

//官网1.1.0有修改
markdownIt.use(require('./libs/markdown-it-toc'), { resetIds: false });
export default MavonEditor;