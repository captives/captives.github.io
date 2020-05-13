var CoverJson = {
  jsonData: '课件数据列表加载中...',
  jsonDataEnd: '课件数据列表加载完成',
  manifest: '脚本文件列表加载中...',
  manifestEnd: '脚本文件列表加载完成',
  js: '脚本加载中',
  jsEnd: '脚本加载完成',
  preload: '预加载数据加载中...',
  preloadEnd: '预加载数据加载完成',
  loading: '资源文件预加载中...',
  loadingEnd: '资源文件预加载完成...'
}

function MsgCover (name) {
  return CoverJson[name]
}

function ShowLoadMsg(dom, msg) {
  if(!dom) return
  dom.innerText = msg
}