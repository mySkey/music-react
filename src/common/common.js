global.common = {
  analysis(str) {
    let s = str.replace(/[\r\n]/g, "").split('[');
    let lrcDataArr = s.slice(5);
    let timeArr = [], lrcArr = [];
    for (let v of lrcDataArr) {
      timeArr.push(v.slice(0, 8))
      lrcArr.push(v.slice(9, v.length))
    }
    return { timeArr, lrcArr }
  },
  getAudioTime(num = 0){
    let minute = Math.floor(num / 60).toString();
    let second = (num % 60).toString();
    return `${minute.padStart(2, '0')} : ${second.padStart(2, '0')}`
  }

}