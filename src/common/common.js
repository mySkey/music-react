global.common = {
  analysis(str) {
    str = str.slice(str.indexOf('00:00.00'))
    let s = str.replace(/[\s\r\n]/g, "").split('[');
    let timeArr = [], lrcArr = [];
    for (let v of s) {
      let lrc = v.split(']')
      timeArr.push(lrc[0])
      lrcArr.push(lrc[1])
    }
    return { timeArr, lrcArr }
  },
  getAudioTime(num = 0){
    let minute = Math.floor(num / 60).toString();
    let second = Math.floor(num % 60).toString();
    return `${minute.padStart(2, '0')} : ${second.padStart(2, '0')}`
  },
  getQuery(str){
    str = str.slice(1)
    let query = {}, strArr = str.split('&')
    strArr.forEach(v=>{
      let arr = v.split('=')
      query[arr[0]] = arr[1]
    })
    return query
  },
  debounce(fn, delay = 200) {
    var timer;
    return () => {
      var th = this;
      var args = arguments;
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;
        fn.apply(th, args);
      }, delay);
    };
  },
  throttle(fn, interval = 200) {
    let last, timer;
    return () => {
      let th = this;
      let args = arguments;
      let now = +new Date();
      if (last && now - last < interval) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          last = now;
          fn.apply(th, args);
        }, interval);
      } else {
        last = now;
        fn.apply(th, args);
      }
    }
  }
}