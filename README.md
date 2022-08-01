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

## TS Element

- [ts-element系列之alert警告]()

<details>
<summary>展开查看</summary>

```js
// 导入ElementUIComponent组件类型
import { ElementUIComponent } from './component'

// 警告类型
// 主题type
export type AlertType = 'success' | 'warning' | 'info' | 'error'
// effect选择提供的主题
export type AlertEffect = 'dark' | 'light'

/** 警告组件 */
export declare class ElAlert extends ElementUIComponent {
  /** 标题 */
  title: string

  /** 组件主题 */
  type: AlertType

  /** 描述性文本，也可以通过默认槽 */
  description: string

  /** 是否可关闭 */
  closable: boolean

  /** 是否将文本居中 */
  center: boolean

  /** 自定义关闭按钮文本 */
  closeText: string

  /** 显示类型图标 */
  showIcon: boolean

  /** 选择提供的主题 */
  effect: AlertEffect
}
```

<details>

## License

[MIT License](https://github.com/webVueBlog/uui/blob/master/LICENSE)
