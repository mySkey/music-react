let musics = {
  list: [],
  current_misic: 0,
  music_num: 0,
  playing: {
    cover: '',
    singer: '',
    current_time: '',
    duration_time: ''
  }
}

let player = (state, action)=>{
  if (typeof state === 'undefined') {
    return musics
  }
  switch (action) {
    case 'list':
      
      break;
  
    default:
      break;
  }
}

export default player