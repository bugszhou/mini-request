# applets-request

基于`Promise` API 的接口请求组合库，对外接口和用法与`axios`类似；

> Note: 该库没有实现`adapter`，开发者需要自行实现

***如果不想实现`adapter`的，可以直接使用[applets-request-all](https://github.com/bugszhou/applets-request-all#readme)，该库支持大部分小程序请求，weapp、wechat、alipay、百度小程序、抖音/头条小程序。[点击查看`applets-request-all`](https://github.com/bugszhou/applets-request-all#readme)***

## Features

- 支持 Promise API
- Interceptor request and response
- Transform request and response data
- Transform Config
- Cancel requests
- Automatic transforms for JSON data

## Installing

Using npm:

```shell
npm install applets-request
```

Using yarn:

```shell
yarn add applets-request
```

## Example

`GET` Request：

```javascript
import appletsRequest from "applets-request-all";

// 获取一篇博客文章：
appletsRequest
  .get("/article?articleId=1")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// 使用可选参数发送请求
appletsRequest
  .get("/article", {
    params: {
      articleId: 1,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// 使用async/await
async function queryArticle() {
  try {
    const response = await appletsRequest.get("/article?articleId=1");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

`POST` Request:

```javascript
import appletsRequest from "applets-request-all";

appletsRequest
  .post("/user", {
    username: "tom",
    password: "********",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// 同时执行多个请求
function queryUser() {
  return appletsRequest.get("/user/12345");
}

function queryArticle() {
  return appletsRequest.get("/article/1");
}

Promise.all([queryUser(), queryArticle()]).then(function (results) {
  const user = results[0];
  const article = results[1];
});
```

## appletsRequest API

`appletsRequest`本身是`function`，可以直接调用，发送请求：

### `appletsRequest(config)`

```javascript
// Send a POST request
appletsRequest({
  method: "post",
  url: "/user/12345",
  data: {
    username: "tom",
    password: "********",
  },
});

// Send a GET request
appletsRequest({
  method: "get",
  url: "/article",
  params: {
    articleId: 1,
  },
  responseType: "json",
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```

### appletsRequest(url[,config])`

```javascript
// Send a GET request (default method)
appletsRequest("/user/12345");
```

## Request method aliases

可以使用别名直接发送请求；

- appletsRequest.request(config);
- appletsRequest.get(url[, config]);
- appletsRequest.delete(url[, config]);
- appletsRequest.head(url[, config]);
- appletsRequest.options(url[, config]);
- appletsRequest.post(url[, data[, config]);
- appletsRequest.put(url[, data[, config]);

**_特别注意：使用别名方法时，不要在`config`中重新配置`url` `method`和`data`属性值。_**

## Request Config

下面列举的是`config`中所有有效的配置，其中只有`url`属性是必传的，如果`method`不传，默认为`get`

```javascript
{
  // `url` is the server URL that will be used for the request
  // 可以是绝对路径
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of appletsRequest to pass relative URLs
  // to methods of that instance.
  // 如果url是绝对路径，该值将被忽略
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // syntax alternative to send data into the body
  // method post
  // only the value is sent, not the key
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `10000`

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  }),
}
```

## Response Schema

响应数据包含的内容：

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `appletsRequest` for the request
  config: {},

  // `originalRes` 是不同小程序request接口success中原始的返回值
  originalRes: {}
}
```

When using then, you will receive the response as follows:

```javascript
appletsRequest.get("/user/12345").then(function (response) {
  console.log(response.data);
  console.log(response.status);
  console.log(response.headers);
  console.log(response.config);
  console.log(response.originalRes);
});
```

## Handling Errors

### Error Schema

`catch`或`reject`中的错误数据

```javascript
{
  // `errMsg` String
  errMsg: "Network Error",

  // `status` is the HTTP status code from the server response
  // 或者值为`NETWORK_ERROR`和`TIMEOUT`
  status: 500,

  // 小程序接口返回的响应数据信息
  response: {},

  // `config` is the config that was provided to `appletsRequest` for the request
  config: {},

  // `extra` adapter开发者自定义数据，默认为`fail(err)`中返回的`err`
  extra: {}
}
```

```javascript
appletsRequest.get("/user/12345").catch(function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.errMsg);
  }
  console.log(error.config);
});
```

## Config Defaults

修改默认配置，将会在当前的`appletsRequest`实例中的所有请求生效，`defaults`中的配置优先级最低。

```javascript
appletsRequest.defaults.baseURL = "https://api.example.com";
appletsRequest.defaults.headers.common["Authorization"] = AUTH_TOKEN;
appletsRequest.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
```

### Create New Instance

```javascript
// Set config defaults when creating the instance
const instance = appletsRequest.create({
  baseURL: "https://api.example.com",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

### Override Defaults

`defaults`中的配置优先级最低，单个请求的`config`将会覆盖`defaults`中的值

```javascript
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = appletsRequest.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get("/longRequest", {
  timeout: 5000,
});
```

## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch`.

```javascript
// Add a request interceptor
appletsRequest.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
appletsRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
```

If you need to remove an interceptor later you can.

```javascript
const myInterceptor = appletsRequest.interceptors.request.use(function () {
  /*...*/
});
appletsRequest.interceptors.request.eject(myInterceptor);
```

You can add interceptors to a custom instance of appletsRequest.

```javascript
const instance = appletsRequest.create();
instance.interceptors.request.use(function () {
  /*...*/
});
```

## Cancellation

You can cancel a request using a _cancel token_.

> The appletsRequest cancel token API is based on the withdrawn [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises).

You can create a cancel token using the `CancelToken.source` factory as shown below:

```js
const CancelToken = appletsRequest.CancelToken;
const source = CancelToken.source();

appletsRequest
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (appletsRequest.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

appletsRequest.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  },
);

// cancel the request (the message parameter is optional)
source.cancel("Operation canceled by the user.");
```

You can create a cancel token using `new CancelToken` as shown below:

```js
const cancelToken = new appletsRequest.CancelToken();

appletsRequest
  .get("/user/12345", {
    cancelToken: cancelToken,
  })
  .catch(function (thrown) {
    if (appletsRequest.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

// cancel the request (the message parameter is optional)
cancelToken.cancel("Operation canceled by the user.");
```

You can also create a cancel token by passing an executor function to the `CancelToken` constructor:

```js
const CancelToken = appletsRequest.CancelToken;
let cancel;

appletsRequest.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  }),
});

// cancel the request
cancel();
```

> Note: you can cancel several requests with the same cancel token.
> Note: 同一 cancelToken 只能使用一次，也就是执行了`cancelToken.cancel(message)`,`cancelToken`就处于`cancel`状态。需要重新创建`cancelToken`对象

## 实现Adapter

未完待续

## License

[MIT](LICENSE)
