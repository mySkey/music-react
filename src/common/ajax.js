global.ajax = {
  get(url = '', parames = '') {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      if (parames) {
        url = url + '?'
        for (let i in parames) {
          url += `${i}=${parames[i]}&`
        }
        url = url.slice(0, url.length - 1)
      }
      xhr.open("GET", url, true)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          try {
            //let response = JSON.parse(xhr.responseText)
            resolve(xhr.responseText)
          } catch (err) {
            reject(err)
          }
        }
      }
    })
  },
  post(url = '', parames = '') {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open("POST", url, true)
      parames ? xhr.send(parames) : xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          try {
            let response = JSON.parse(xhr.responseText)
            resolve(response)
          } catch (err) {
            reject(err)
          }
        }
      }
    })
  }
}