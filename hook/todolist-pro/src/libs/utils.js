// 格式化时间戳
function addZero(value) {
  return value < 10 ? '0' + value : value
}

function formatDateTime(timeStamp) {
  const date = new Date(timeStamp);

  const y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = addZero(date.getHours()),
    i = addZero(date.getMinutes()),
    s = addZero(date.getSeconds());
  return `${y}年${m}月${d}日 ${h}:${i}:${s}`
}

export {
  formatDateTime
}