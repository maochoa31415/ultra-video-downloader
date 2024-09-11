interface Options {
  verb: 'GET' | 'POST';
  url: string;
  headers?: any;
  data?: Object;
}

export function request (options: Options, xhr?: XMLHttpRequest) {
  return new Promise((resolve, reject) => {
    if (!xhr || !(xhr instanceof XMLHttpRequest)) {
      xhr = new XMLHttpRequest()
    }

    xhr.onload = () => {
      try {
        if (xhr?.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(
            JSON.stringify({
              status: xhr?.status,
              statusText: xhr?.statusText,
              data: xhr?.responseText,
            })
          )
        }
      } catch (e) {
        reject(e)
      }
    }

    xhr.onerror = () => {
      const errorMsg =
        'Error executing this action, please check your internet connection.'
      reject(errorMsg)
    }
    xhr.open(options.verb, options.url)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    if (options.headers) {
      for (const header in options.headers) {
        const headerValue = options.headers[header]

        xhr.setRequestHeader(header, headerValue)
      }
    }

    if (options.data) {
      xhr.send(JSON.stringify(options.data))
    } else {
      xhr.send()
    }
  })
}
