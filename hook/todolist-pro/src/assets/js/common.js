import FastClick from './fastclick';

// 根据设备判断字体大小
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 4 + 'px';

window.addEventListener(
  'load',
  function () {
    FastClick.attach(document.body);
  },
  false
);

document.documentElement.addEventListener(
  'touchmove',
  function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  false
);
