global.common = {
  analysis(str){
    //去除空格
    let s = str.replace(/[\r\n]/g, "").split('[');
    let lrcArr = s.slice(5);
    return {
      time: lrcArr.map(v => v.slice(0, 8)),
      lrc: lrcArr.map(v => v.slice(9, v.length))
    }
  }
}