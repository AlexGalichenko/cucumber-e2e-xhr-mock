# xhr-mock
xhr mock is the lib that allow to intercept and change XMLHttpRequest responses according to testing needs instead of
injecting test data.

```javascript
const { XMLHttpRequestMock, Rule } = require("xhr-mock");

const mock = new XMLHttpRequestMock([
    new Rule({
        condition: function (xhr) {
            return xhr.responseURL.includes("api/endpointtomock")
        },
        response: function () {
            return JSON.stringify({
                data: "yourData"
            })
        }
    })
]);

//browser - is protractor browser global
await mock.mock(browser);

```

Also it is possible to modify original response
```javascript
const { XMLHttpRequestMock, Rule } = require("xhr-mock");

const mock = new XMLHttpRequestMock([
    new Rule({
        condition: function (xhr) {
            return xhr.responseURL.includes("api/endpointtomock")
        },
        responseText: function (originalResponseText) {
            return originalResponseText.replace("A", "B")
        }
    })
]);

//browser - is protractor browser global
await mock.mock(browser);

```
