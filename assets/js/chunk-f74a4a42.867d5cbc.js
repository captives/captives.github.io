(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f74a4a42"],{1967:function(a,t,e){},"431b":function(a,t,e){"use strict";e.r(t);var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("el-main",[e("p",{staticStyle:{"text-align":"left"}}),e("h1",[a._v("MathJax v3 beta: TeX input, HTML output test")]),e("p",[a._v(" When $a \\ne 0$, there are two solutions to \\(ax^2 + bx + c = 0\\) and they are $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$ ")]),e("h2",[a._v("The Lorenz Equations")]),e("p",[a._v(" \\begin{align} \\dot{x} & = \\sigma(y-x) \\\\ \\dot{y} & = \\rho x - y - xz \\\\ \\dot{z} & = -\\beta z + xy \\end{align} ")]),e("h2",[a._v("The Cauchy-Schwarz Inequality")]),e("p",[a._v(" \\[ \\left( \\sum_{k=1}^n a_k b_k \\right)^{\\!\\!2} \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right) \\] ")]),e("h2",[a._v("A Cross Product Formula")]),e("p",[a._v(" \\[ \\mathbf{V}_1 \\times \\mathbf{V}_2 = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\frac{\\partial X}{\\partial u} & \\frac{\\partial Y}{\\partial u} & 0 \\\\ \\frac{\\partial X}{\\partial v} & \\frac{\\partial Y}{\\partial v} & 0 \\\\ \\end{vmatrix} \\] ")]),e("h2",[a._v(" The probability of getting \\(k\\) heads when flipping \\(n\\) coins is: ")]),e("p",[a._v("\\[P(E) = {n \\choose k} p^k (1-p)^{ n-k} \\]")]),e("h2",[a._v("An Identity of Ramanujan")]),e("p",[a._v(" \\[ \\frac{1}{(\\sqrt{\\phi \\sqrt{5}}-\\phi) e^{\\frac25 \\pi}} = 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}} {1+\\frac{e^{-8\\pi}} {1+\\ldots} } } } \\] ")]),e("h2",[a._v("A Rogers-Ramanujan Identity")]),e("p",[a._v(" \\[ 1 + \\frac{q^2}{(1-q)}+\\frac{q^6}{(1-q)(1-q^2)}+\\cdots = \\prod_{j=0}^{\\infty}\\frac{1}{(1-q^{5j+2})(1-q^{5j+3})}, \\quad\\quad \\text{for $|q| < 1$}. \\] ")]),e("h2",[a._v("Maxwell's Equations")]),e("p",[a._v(" \\begin{align} \\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t} & = \\frac{4\\pi}{c}\\vec{\\mathbf{j}} \\\\ \\nabla \\cdot \\vec{\\mathbf{E}} & = 4 \\pi \\rho \\\\ \\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{B}}}{\\partial t} & = \\vec{\\mathbf{0}} \\\\ \\nabla \\cdot \\vec{\\mathbf{B}} & = 0 \\end{align} ")]),e("h2",[a._v("In-line Mathematics")]),e("p",[a._v(" Finally, while display equations look good for a page of samples, the ability to mix math and text in a paragraph is also important. This expression $\\sqrt{3x-1}+(1+x)^2$ is an example of an inline equation. As you see, MathJax equations can be used this way as well, without unduly disturbing the spacing between lines. ")]),e("el-row",[e("vue-code",[e("pre",{attrs:{lang:"bash"}},[a._v("npm install mathjax@3")])]),e("vue-code",[e("pre",{attrs:{lang:"bash"}},[a._v("mv node_modules/mathjax/es5 public/mathjax")])]),e("vue-code",[e("pre",{attrs:{lang:"javascript"}},[a._v("if(!('MathJax' in window)){\n    window.MathJax = {\n        tex: {inlineMath: [['$', '$'], ['\\\\(', '\\\\)']]},\n        svg: {fontCache: 'global'},\n        options: {\n          renderActions: {\n            addMenu: [],//移除右键菜单\n            checkLoading: []\n          }\n        }\n    };\n\n    var script = document.createElement('script');\n        script.type = 'text/javascript';\n        script.src=\"/js/mathjax/tex-chtml.js\";\n        // script.src = \"/js/mathjax/tex-svg.js\";\n        script.async = true;\n        script.setAttribute('id','MathJax-script');\n        document.body.appendChild(script);\n}\n\n//异步渲染\nif ('MathJax' in window) {\n  MathJax.typesetPromise();\n}\n")])])],1)],1)},i=[],r={name:"MathJax",created:function(){if(!("MathJax"in window)){window.MathJax={tex:{inlineMath:[["$","$"],["\\(","\\)"]]},svg:{fontCache:"global"},options:{renderActions:{addMenu:[],checkLoading:[]}}};var a=document.createElement("script");a.type="text/javascript",a.src="/js/mathjax/tex-chtml.js",a.async=!0,a.setAttribute("id","MathJax-script"),document.body.appendChild(a)}},mounted:function(){console.log("MathJax"in window)}},s=r,c=(e("4d0c"),e("2877")),o=function(a){a.options.__source="src/guide/views/web/MathJax.vue"},p=o,h=Object(c["a"])(s,n,i,!1,null,null,null);"function"===typeof p&&p(h);t["default"]=h.exports},"4d0c":function(a,t,e){"use strict";var n=e("1967"),i=e.n(n);i.a}}]);