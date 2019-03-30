let api_url = process.env.NODE_ENV ==='development' ? 'http://localhost:9000/ph/' : 'http://api.22family.com/ph/'
let ajax = (obj) => {
  let url = obj.url;
  let type = obj.type.toUpperCase() || 'GET';
  let data = obj.data || {};
  let headers = obj.headers || {};

  // GET方法的话，是将data里的参数拼接在url，POST方法的话是将data转成json发送过去
  if(type === 'GET'){
    url += '?';
    for(let i in data){
      url += (i + '=' + data[i]+ '&')
    }
    url = url.slice(0,url.length-1)
  }
  data = JSON.stringify(obj.data) || JSON.stringify({});

  let xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  // 带上请求头
  for(let i in headers){
    xhr.setRequestHeader(i, headers[i]);
  }
  xhr.send(data);
  xhr.onreadystatechange = function(){
    if(xhr.readyState===4 && xhr.status===200){
      try {
        let response = JSON.parse(xhr.responseText); // 后台一般也是返回一个json格式的数据，所以我们一般直接转了再用
        obj.success(response);
      } catch (err) {
        obj.error(err);
      }
    }
  }
}

ajax.get = (url, data)=>{
  return new Promise((resolve, reject)=>{
    ajax({ 
      url: api_url+url,
      type: 'get',
      data,
      headers:{},
      success: res=>{
        resolve(res)
      },
      error: err=>{
        reject(err)
      }
     })
  })
}
ajax.post = (url, data)=>{
  return new Promise((resolve, reject)=>{
    ajax({ 
      url: api_url+url,
      type: 'post',
      data,
      headers:{},
      success: res=>{
        resolve(res)
      },
      error: err=>{
        reject(err)
      }
     })
  })
}

export default ajax