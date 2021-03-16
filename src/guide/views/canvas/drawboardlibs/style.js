module.exports = `
/** 这是画板组件 */
.canvas-container {
    position: relative;
}

.canvas-container .oriole-container {
    position: absolute !important;
    top: 0px;
    left: 0px;
}

.canvas-container ul {
    list-style: none;
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 0;
    margin: 0;
    transform-origin: left top;
}

.canvas-container ul li {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 1px;
    background: rgba(255,255,255, .75);
    cursor: pointer;
    text-align: center;
    color: #333;
    border-radius: 2px;
}

.canvas-container ul li.active {
    background: rgba(245, 108, 108, .85);

    color: #FFF;
}

.canvas-container .oriole-icon {
    width: 16px;
    height: 30px;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
 }
`;