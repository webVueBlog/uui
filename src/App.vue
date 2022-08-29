<template>
  <div id="app">
    <div class="item">Carousel 走马灯</div>
    <da-carousel
      height="200px"
      :autoplay="true"
      :delay="2000"
      :initial-index="0"
      :loop="true"
      @change="change"
    >
      <da-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </da-carousel-item>
    </da-carousel>

    <div class="item">Pagination 分页</div>
    <span class="demonstration">页数较少时的效果</span>
    <da-pagination
      :page-size="10"
      :total="5"
      :current-page.sync="currentPage"
    ></da-pagination>
    <span class="demonstration">大于 7 页时的效果</span>
    <da-pagination
      :page-size="10"
      :total="10"
      :current-page.sync="currentPage1"
    ></da-pagination>

    <div class="item">Pagination 设置最大页码按钮数</div>
    <da-pagination
      :page-size="10"
      :pager-count="11"
      :total="50"
      :current-page.sync="currentPage"
    ></da-pagination>

    <div class="item">Pagination 带有背景色的分页</div>
    <da-pagination
      :page-size="10"
      :pager-count="5"
      :total="10"
      background
      :current-page.sync="currentPage"
    ></da-pagination>

    <div class="item">Pagination 禁用分页</div>
    <da-pagination
      :page-size="10"
      :pager-count="5"
      :total="10"
      disabled
    ></da-pagination>
    <da-pagination
      :page-size="10"
      :pager-count="5"
      :total="10"
      background
      disabled
    ></da-pagination>

    <div class="item">日期选择器</div>
    <da-date-picker v-model="value1"></da-date-picker>
    <!-- <template>
      <da-date-picker v-model="value1"></da-date-picker>
    </template> -->

    <div class="item">线形进度条</div>
    <da-progress :percentage="50"></da-progress>
    <da-progress :percentage="100" :format="format"></da-progress>
    <da-progress :percentage="100" status="success"></da-progress>
    <da-progress :percentage="100" status="warning"></da-progress>
    <da-progress :percentage="50" status="exception"></da-progress>

    <div class="item">自定义颜色</div>
    <da-progress :percentage="percentage" :color="customColor"></da-progress>

    <da-progress
      :percentage="percentage"
      :color="customColorMethod"
    ></da-progress>

    <da-progress :percentage="percentage" :color="customColors"></da-progress>
    <div>
      <da-button-group>
        <da-button @click="decrease"> 减10% </da-button>
        <da-button @click="increase"> 加10% </da-button>
      </da-button-group>
    </div>

    <div class="item">输入框</div>
    <da-input v-model="input" placeholder="请输入内容"></da-input>
    <da-input
      v-model="input"
      placeholder="请输入内容"
      :disabled="true"
    ></da-input>

    <div class="item">无限滚动</div>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
        class="infinite-list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="hasMore"
        infinite-scroll-delay="delay"
        infinite-scroll-distance="distance"
        infinite-scroll-immediate="immediate"
        style="overflow: auto"
      >
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
      </ul>
    </div>

    <div class="item">禁用加载</div>

    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
        class="list"
        v-infinite-scroll="load1"
        infinite-scroll-disabled="disabled"
      >
        <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>

    <div class="item">布局容器</div>

    <da-container>
      <da-header>Header</da-header>
      <da-main>Main</da-main>
    </da-container>

    <div class="item">布局容器</div>

    <da-container>
      <da-header>Header</da-header>
      <da-main>Main</da-main>
      <da-footer>Footer</da-footer>
    </da-container>

    <div class="item">布局容器</div>

    <da-container>
      <da-aside width="200px">Aside</da-aside>
      <da-main>Main</da-main>
    </da-container>

    <div class="item">布局容器</div>

    <da-container>
      <da-header>Header</da-header>
      <da-container>
        <da-aside width="200px">Aside</da-aside>
        <da-main>Main</da-main>
      </da-container>
    </da-container>

    <div class="item">布局容器</div>

    <da-container>
      <da-header>Header</da-header>
      <da-container>
        <da-aside width="200px">Aside</da-aside>
        <da-container>
          <da-main>Main</da-main>
          <da-footer>Footer</da-footer>
        </da-container>
      </da-container>
    </da-container>

    <div class="item">布局容器</div>

    <da-container>
      <da-aside width="200px">Aside</da-aside>
      <da-container>
        <da-header>Header</da-header>
        <da-main>Main</da-main>
      </da-container>
    </da-container>

    <div class="item">布局容器</div>

    <da-container>
      <da-aside width="200px">Aside</da-aside>
      <da-container>
        <da-header>Header</da-header>
        <da-main>Main</da-main>
        <da-footer>Footer</da-footer>
      </da-container>
    </da-container>

    <div class="item">图标</div>
    <da-icon class="da-icon-edit"></da-icon>
    <da-icon class="da-icon-share"></da-icon>
    <da-icon class="da-icon-delete"></da-icon>
    <da-button type="primary" icon="da-icon-search">搜索</da-button>

    <div class="item">按钮</div>
    <da-button>默认按钮</da-button>
    <da-button type="info">默认按钮</da-button>
    <da-button type="success">默认按钮</da-button>
    <da-button type="primary">默认按钮</da-button>
    <da-button type="warning">默认按钮</da-button>

    <div class="item">按钮组</div>
    <da-button-group>
      <da-button type="primary" icon="da-icon-arrow-left" icon-position="left"
        >上一页</da-button
      >
      <da-button type="primary" icon="da-icon-arrow-right" icon-position="right"
        >下一页</da-button
      >
    </da-button-group>
    <da-button-group>
      <da-button
        type="primary"
        icon="da-icon-edit"
        icon-position="left"
      ></da-button>
      <da-button
        type="primary"
        icon="da-icon-share"
        icon-position="right"
      ></da-button>
      <da-button
        type="primary"
        icon="da-icon-setting"
        icon-position="right"
      ></da-button>
    </da-button-group>

    <div class="item">基础布局</div>
    <da-row>
      <da-col :span="24"
        ><div class="grid-content bg-purple-dark"></div
      ></da-col>
    </da-row>

    <div class="item">分栏间隔</div>

    <da-row :gutter="20">
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">混合布局</div>
    <da-row :gutter="20">
      <da-col :span="16"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="8"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">混合布局</div>
    <da-row :gutter="20">
      <da-col :span="8"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="8"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="4"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="4"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">混合布局</div>
    <da-row :gutter="20">
      <da-col :span="4"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="16"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="4"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">分栏偏移</div>

    <da-row :gutter="20">
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></da-col>
    </da-row>

    <div class="item">分栏偏移</div>

    <da-row :gutter="20">
      <da-col :span="6" :offset="6">
        <div class="grid-content bg-purple"></div
      ></da-col>
      <da-col :span="6" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></da-col>
    </da-row>

    <div class="item">分栏偏移</div>

    <da-row :gutter="20">
      <da-col :span="12" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></da-col>
    </da-row>

    <div class="item">对齐方式</div>

    <da-row type="flex" class="row-bg">
      <da-col :span="6">
        <div class="grid-content bg-purple"></div>
      </da-col>
      <da-col :span="6"
        ><div class="grid-content bg-purple-light"></div
      ></da-col>
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">对齐方式</div>

    <da-row type="flex" class="row-bg" justify="center">
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6"
        ><div class="grid-content bg-purple-light"></div
      ></da-col>
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">对齐方式</div>

    <da-row type="flex" class="row-bg" justify="end">
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </da-col>
      <da-col :span="6">
        <div class="grid-content bg-purple"></div>
      </da-col>
    </da-row>

    <div class="item">对齐方式</div>

    <da-row type="flex" class="row-bg" justify="space-between">
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6"
        ><div class="grid-content bg-purple-light"></div
      ></da-col>
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">对齐方式</div>

    <da-row type="flex" class="row-bg" justify="space-around">
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
      <da-col :span="6"
        ><div class="grid-content bg-purple-light"></div
      ></da-col>
      <da-col :span="6"><div class="grid-content bg-purple"></div></da-col>
    </da-row>

    <div class="item">响应式布局</div>

    <da-row :gutter="10">
      <da-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple"></div
      ></da-col>
      <da-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light"></div
      ></da-col>
      <da-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple"></div
      ></da-col>
      <da-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple-light"></div
      ></da-col>
    </da-row>

    <div class="item">表格</div>
    <!-- <da-table :columns="columns2" :data="data2"></da-table> -->

    <div class="item">弹出框</div>
    <da-popover
      placement="left"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">hover 激活</da-button>
    </da-popover>
    <da-popover
      placement="top"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">hover 激活</da-button>
    </da-popover>
    <da-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">hover 激活</da-button>
    </da-popover>
    <da-popover
      placement="right"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">hover 激活</da-button>
    </da-popover>
    <da-popover
      placement="left"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">click 激活</da-button>
    </da-popover>
    <da-popover
      placement="top"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">click 激活</da-button>
    </da-popover>
    <da-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">click 激活</da-button>
    </da-popover>
    <da-popover
      placement="right"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容。"
    >
      <da-button slot="reference">click 激活</da-button>
    </da-popover>

    <div class="item">弹出框 嵌套信息</div>

    <da-popover placement="top" width="500">
      <da-table :columns="columns1" :data="data1" height="200px">
        <template slot="name" slot-scope="{ row, col }">
          <h1>{{ row[col.key] }}</h1>
        </template>
        <template slot="action" slot-scope="{ row, col }">
          <da-button type="text">删除</da-button>
        </template>
      </da-table>
      <da-button slot="reference">点击删除</da-button>
    </da-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  components: {}
})
export default class extends Vue {
  private currentPage: number = 4;
  private currentPage1: number = 4;
  private count: number = 10;
  private hasMore: Boolean = false;
  private delay: number = 300;
  private distance: number = 30;
  private immediate: Boolean = false;
  private loading: Boolean = false;
  private input: string = '';
  private percentage: number = 20;
  private customColor: string = '#409eff';
  private customColors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 }
  ];
  private value1: Date = new Date();
  private columns1 = [
    {
      title: 'Name',
      key: 'name',
      slot: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'operator',
      slot: 'action',
      key: 'operator'
    }
  ];
  private data1 = [
    {
      name: 'John Brown',
      age: 18,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03'
    },
    {
      name: 'Jim Green',
      age: 24,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01'
    },
    {
      name: 'Joe Black',
      age: 22,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02'
    },
    {
      name: 'Jon Snow',
      age: 46,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04'
    }
  ];
  private columns2 = [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'date',
      key: 'date'
    }
  ];
  private data2 = [
    {
      name: 'John Brown',
      age: 18,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03'
    },
    {
      name: 'Jim Green',
      age: 24,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01'
    },
    {
      name: 'Joe Black',
      age: 30,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02'
    },
    {
      name: 'Jon Snow',
      age: 26,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04'
    }
  ];

  fromat(percentage: number) {
    return percentage === 100 ? '满' : `${percentage}%`;
  }

  customColorMethod(percentage: number) {
    if (percentage < 30) {
      return '#909399';
    } else if (percentage < 70) {
      return '#e6a23c';
    } else {
      return '#67c23a';
    }
  }
  increase() {
    this.percentage += 10;
    if (this.percentage > 100) {
      this.percentage = 100;
    }
  }
  decrease() {
    this.percentage -= 10;
    if (this.percentage < 0) {
      this.percentage = 0;
    }
  }

  load() {
    if (this.count < 30) {
      this.count += 2;
    }
  }

  load1() {
    this.loading = true;
    setTimeout(() => {
      this.count += 2;
      this.loading = false;
    }, 2000);
  }

  disabled() {
    return this.loading || this.noMore;
  }

  noMore() {
    return this.count >= 20;
  }
}
</script>

<style lang="scss">
#app {
  margin: 10px;
  .item {
    margin: 10px;
  }
}

.da-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.da-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.da-header,
.da-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.da-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.da-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.da-container {
  line-height: 260px;
}

.infinite-list-wrapper {
  height: 300px;
  text-align: center;
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    .list-item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #fff6f6;
      color: #ff8484;
    }
  }
  p {
    margin: 10px;
  }
}

.small {
  color: #fff;
}
.da-carousel-item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.da-carousel-item:nth-child(2n) {
  background-color: #99a9bf;
}

.da-carousel-item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
