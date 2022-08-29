<p align="center">
  <img width="120" src="https://user-images.githubusercontent.com/59645426/180124002-9ae887a0-124e-419d-bb8c-c796baf02d52.png">
</p>

# uui [![npm version](https://badge.fury.io/js/da-uui.svg)](https://badge.fury.io/js/da-uui)

🖖 A vue-cli 3.0 + vue + typeScript + babel + eslint + unit-mocha + scss + chai + karma。

我的工作：

- 写什么样的代码：技术分享
- 思考如何写代码：技术思考
- 熟悉业务：业务思考
- 熟悉工作流程：优化工作流程（从需求-开发-联调-测试-上线）
- 提升效率
- 加班

我的学习：

- 明确学习目标，找到适合的学习方式（看书，视频，文档，社区，Github）
- 站在巨人的肩膀上
- 不断积累，技术分享

# Install

```js
npm install da-uui -S

or

yarn add da-uui
```

## Gitlab-ci:从零开始的前端自动化部署

- 在项目根目录下配置.gitlab-ci.yml文件 - .gitlab-ci的所有流程都是可视化的
- intall => eslint检查 => 编译 => 部署服务器的流程
- GitLab CI/CD 是一个内置在GitLab中的工具
- Continuous Integration (CI)  持续集成
- Continuous Delivery (CD)     持续交付
Continuous Deployment (CD)     持续部署

## 说明

### Carousel Attributes

| 参数               | 说明                                  | 类型    | 可选值              | 默认值     |
| ------------------ | ------------------------------------- | ------- | ------------------- | ---------- |
| height             | 走马灯的高度                          | string  | —                   | —          |
| initial-index      | 初始状态激活的幻灯片的索引，从 0 开始 | number  | —                   | 0          |
| autoplay           | 是否自动切换                          | boolean | —                   | true       |
| interval           | 自动切换的时间间隔，单位为毫秒        | number  | —                   | 3000       |
| arrow              | 切换箭头的显示时机                    | string  | always/hover/never  | hover      |
| type               | 走马灯的类型                          | string  | card                | —          |
| loop               | 是否循环显示                          | boolean | -                   | true       |

### Carousel Events

| 事件名称 | 说明             | 回调参数                               |
| -------- | ---------------- | -------------------------------------- |
| change   | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |


### pagination Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| small | 是否使用小型分页样式 | boolean | — | false |
| background | 是否为分页按钮添加背景色 | boolean | — | false |
| page-size | 每页显示条目个数，支持 .sync 修饰符 | number | — | 10 |
| total | 总条目数 | number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number | — | — |
| pager-count | 页码按钮的数量，当总页数超过该值时会折叠 | number | 大于等于 5 且小于等于 21 的奇数 | 7 |
| current-page | 当前页数，支持 .sync 修饰符 | number | — | 1 |
| page-sizes | 每页显示个数选择器的选项设置 | number[] | — |  [10, 20, 30, 40, 50, 100] |
| disabled | 是否禁用 | boolean | — | false |
| hide-on-single-page | 只有一页时是否隐藏 | boolean | — | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| size-change | pageSize 改变时会触发 | 每页条数 |
| current-change | currentPage 改变时会触发 | 当前页 |

### Slot
| name | 说明 |
|------|--------|
| — | 自定义内容，需要在 `layout` 中列出 `slot` |


### Popover Attributes

| 参数            | 说明                                                                                                    | 类型           | 可选值                                                                                                    | 默认值                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| trigger         | 触发方式                                                                                                | String         | click/focus/hover/manual                                                                                  | click                                                   |
| title           | 标题                                                                                                    | String         | —                                                                                                         | —                                                       |
| content         | 显示的内容，也可以通过 `slot` 传入 DOM                                                                  | String         | —                                                                                                         | —                                                       |
| width           | 宽度                                                                                                    | String, Number | —                                                                                                         | 最小宽度 150px                                          |
| placement       | 出现位置                                                                                                | String         | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| disabled        | Popover 是否可用                                                                                        | Boolean        | —                                                                                                         | false                                                   |
| value / v-model | 状态是否可见                                                                                            | Boolean        | —                                                                                                         | false                                             |

### Slot

| 参数      | 说明                          |
| --------- | ----------------------------- |
| —         | Popover 内嵌 HTML 文本        |
| reference | 触发 Popover 显示的 HTML 元素 |

### Events

| 事件名称    | 说明                   | 回调参数 |
| ----------- | ---------------------- | -------- |
| show        | 显示时触发             | —        |
| after-enter | 显示动画播放完毕后触发 | —        |
| hide        | 隐藏时触发             | —        |
| after-leave | 隐藏动画播放完毕后触发 | —        |


### date Attributes

| 参数            | 说明   | 类型                                      | 可选值 | 默认值 |
| --------------- | ------ | ----------------------------------------- | ------ | ------ |
| value / v-model | 绑定值 | date(DatePicker) / array(DateRangePicker) | —      | —      |


### percentage Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number         |     0-100          |     0    |
| format          | 进度条文字          | function     | — | — |
| status  | 进度条当前状态 | string | success/exception/warning | — |
| color  | 进度条背景色（会覆盖 status 状态颜色） | string/function/array | — | '' |

### scroll Attributes

| 参数                      | 说明                                                   | 类型    | 可选值 | 默认值 |
| ------------------------- | ------------------------------------------------------ | ------- | ------ | ------ |
| infinite-scroll-disabled  | 是否禁用                                               | boolean | -      | false  |
| infinite-scroll-delay     | 节流时延，单位为 ms                                    | number  | -      | 200    |
| infinite-scroll-distance  | 触发加载的距离阈值，单位为 px                          | number  | -      | 0      |
| infinite-scroll-immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器。 | boolean | -      | true   |


### Row Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | 栅格间隔 | number | — | 0 |
| type | 布局模式，可选 flex，现代浏览器下有效 | string | — | — |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| align | flex 布局下的垂直排列方式 | string | top/middle/bottom | top |
| tag | 自定义元素标签 | string | * | div |

### Col Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | 栅格占据的列数 | number | — | 24 |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push |  栅格向右移动格数 | number | — | 0 |
| pull |  栅格向左移动格数 | number | — | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| tag | 自定义元素标签 | string | * | div |

### Container Attributes

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                                 |
| --------- | ---------------- | ------ | --------------------- | ---------------------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `el-header` 或 `el-footer` 时为 vertical，否则为 horizontal |

### Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |


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

- [ts-element系列之前言](https://github.com/webVueBlog/uui/issues/3)
- [ts-element系列之设计流程](https://github.com/webVueBlog/uui/issues/4)
- [ts-element系列之布局](https://github.com/webVueBlog/uui/issues/5)
- [ts-element系列之Container布局容器](https://github.com/webVueBlog/uui/issues/6)
- [ts-element系列之色彩、字体、边框与图标](https://github.com/webVueBlog/uui/issues/7)
- [ts-element系列之alert警告](https://github.com/webVueBlog/uui/issues/1)
- [ts-element系列之aside](https://github.com/webVueBlog/uui/issues/2)

## License

[MIT License](https://github.com/webVueBlog/uui/blob/master/LICENSE)
