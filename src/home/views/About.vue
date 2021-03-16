<template>
    <ul>
        <li>
            <a href>postcss-px-to-viewport</a>
            <span>将px单位转换为视口单位的 (vw, vh, vmin, vmax) 的 PostCSS 插件</span>
            <p>
            <pre>
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              require("postcss-px-to-viewport")({
                unitToConvert: "px",
                viewportWidth: 1040,
                unitPrecision: 3,
                propList: [
                  "*"
                ],
                viewportUnit: "vw",
                fontViewportUnit: "vw",
                selectorBlackList: [],
                minPixelValue: 1,
                mediaQuery: false,
                replace: true,
                exclude: /(\/|\\)(node_modules)(\/|\\)/,
              })
            ]
          }
        }
    },
          </pre>
            </p>
        </li>
    </ul>
</template>
<script>
</script>