<template>
  <div class="da-pagination" :class="{ 'is-background': background }">
    <da-button
      type="text"
      icon="da-icon-arrow-left"
      :disabled="currentPage === 1 || disabled"
      @click="select(currentPage - 1)"
    >
    </da-button>
    <ul>
      <!-- <li v-for="item in currentPage">111</li> -->
      <li :class="{ active: currentPage === 1, disabled }" @click="select(1)">
        1
      </li>
      <li v-if="showPrevMore" :class="{ disabled }"><span>...</span></li>
      <li
        v-for="num in pagers"
        :key="num"
        :class="{ active: currentPage === num, disabled }"
        @click="select(num)"
      >
        <span>{{ num }}</span>
      </li>
      <li v-if="showNextMore" :class="{ disabled }"><span>...</span></li>
      <li
        :class="{ active: currentPage === total, disabled }"
        @click="select(total)"
      >
        <span>{{ total }}</span>
      </li>
    </ul>
    <da-button
      type="text"
      icon="da-icon-arrow-right"
      :disabled="currentPage === total || disabled"
      @click="select(currentPage + 1)"
    >
    </da-button>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
// @Component必须要有，是组件初始化渲染 不加则组件传入的参数无法渲染
@Component({
  name: 'DaPagination'
})
export default class DaPagination extends Vue {
  public static comName = 'DaPagination';
  @Prop({ default: 1 }) private total!: number;
  @Prop({ default: 1 })
  private currentPage!: number;
  @Prop({ default: 1 })
  private pageCount!: number;
  @Prop({ default: 7 }) // 按钮数
  private pagerCount!: number;
  @Prop(Boolean)
  private disabled!: boolean;
  @Prop(Boolean) // 父组件调用可以直接使用 background
  private background!: boolean;
  private showPrevMore: boolean = false;
  private showNextMore: boolean = false;
  private get pagers() {
    let arr = [];
    let pagerCount = this.pagerCount; // 显示几个分页按钮
    let total = this.total;
    let currentPage = this.currentPage;
    let showPrevMore = false;
    let showNextMore = false;
    let middleValue = Math.floor(pagerCount / 2);
    // 显示。。。
    if (total > pagerCount) {
      // 左边显示。。。
      if (currentPage > middleValue + 1) {
        showPrevMore = true;
      }
      // 右边显示。。。
      if (currentPage < total - middleValue) {
        showNextMore = true;
      }
    }
    // 分页数从几开始显示
    if (showPrevMore && !showNextMore) {
      // 左边有。。。   1 ... 5 6 7 8 9 10
      let start = total - (pagerCount - 2);
      for (let i = start; i < total; i++) {
        arr.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      // 右边有。。。   1 2 3 4 5 6 ... 10
      for (let i = 2; i < pagerCount; i++) {
        arr.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      // 左右都有 1 ... 3 4 5 6 7 8 ... 10
      let val = Math.floor((pagerCount - 2) / 2); // (中间显示几个) / 2 ==> 左右各几个
      for (let i = currentPage - val; i <= currentPage + val; i++) {
        arr.push(i);
      }
    } else {
      for (let i = 2; i < total; i++) {
        arr.push(i);
      }
    }

    this.showPrevMore = showPrevMore;
    this.showNextMore = showNextMore;
    return arr;
  }
  private select(currentPage: number) {
    if (!this.disabled) {
      if (currentPage < 1) {
        currentPage = 1;
      }
      if (currentPage > this.total) {
        currentPage = this.total;
      }
      if (currentPage !== this.currentPage) {
        this.$emit('update:current-page', currentPage);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.da-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;

  ul {
    list-style: none;
    display: inline-flex;

    li {
      cursor: pointer;
      padding: 0 4px;
      background: #fff;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      margin: 0;
    }
  }

  // li:hover,
  li:focus {
    color: $primary;
  }

  .active {
    color: $primary;
    cursor: default;
  }

  .disabled,
  .disabled:hover {
    cursor: not-allowed;
    color: #c0c4cc;
  }
}

.is-background {
  .da-btn {
    padding: 0 5px;
    height: 28px;

    &[disabled],
    &[disabled]:hover {
      cursor: not-allowed;
      border: 0 solid transparent;
      background: #f4f4f5;
      color: #c0c4cc;
    }
  }

  .da-btn,
  ul > li {
    margin: 0 5px;
    background: #f4f4f5;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
  }

  ul {
    li:focus,
    .active {
      color: #fff;
      background: $primary;
    }

    .active:hover {
      color: #fff;
    }

    .disabled,
    .disabled:hover {
      background: #f4f4f5;
      cursor: not-allowed;
      border: 0 solid transparent;
      color: #c0c4cc;
    }
  }
}
</style>