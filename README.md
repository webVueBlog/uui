<p align="center">
  <img width="120" src="https://user-images.githubusercontent.com/59645426/180124002-9ae887a0-124e-419d-bb8c-c796baf02d52.png">
</p>

# uui

🖖 A vue-cli 3.0 + vue + typeScript + babel + eslint + unit-mocha + scss + chai + karma。

# Install

```js
npm install da-uui -S

or

yarn add da-uui
```

# Quick Start

```js
import Vue from 'vue'
import uui from 'da-uui'

import 'da-uui/dist/da-uui.css'

Vue.use(uui)

// or
import {
  Select,
  Button
  // ...
} from 'da-uui'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```

## License

[MIT License](https://github.com/webVueBlog/uui/blob/master/LICENSE)
