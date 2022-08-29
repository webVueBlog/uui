<template>
  <div
    class="da-carousel"
    :style="{ height }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        v-for="item in len"
        :key="item"
        :class="{ active: item - 1 === currentSelected }"
        @click="select(item - 1)"
      >
        {{ item - 1 }}
      </span>
    </div>
    <div class="arrow-box">
      <da-button
        icon="da-icon-arrow-left"
        @click="select(currentSelected - 1, true)"
      ></da-button>
      <da-button
        icon="da-icon-arrow-right"
        @click="select(currentSelected + 1, true)"
      ></da-button>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'DaCarousel'
})
export default class DaCarousel extends Vue {
  public static comName = 'DaCarousel';
  @Prop({ default: '200px' })
  private height!: string;
  @Prop({ default: true })
  private autoplay!: boolean;
  @Prop({ default: 3000 })
  private delay!: number;
  @Prop({ default: 0 })
  private initialIndex!: number;
  @Prop({ default: true })
  private loop!: boolean;
  private currentSelected: number = this.initialIndex;
  private len: number = 0;
  private reverse: boolean = false;
  private mounted() {
    this.len = this.$children.filter(
      (child) => child.$options.name === 'DaCarouselItem'
    ).length;
    // 让currentSelected不停增加
    this.run();
  }
  private run() {
    if (this.autoplay) {
      // 是否是自动播放
      this.timer = setInterval(() => {
        let index = this.currentSelected;
        let newIndex = index + 1;
        this.select(newIndex);
      }, this.delay);
    }
  }
  private select(newIndex: number, flag?: boolean) {
    let index = this.currentSelected;
    // 临界问题
    if (newIndex === this.len) {
      newIndex = 0;
    }
    if (newIndex === -1) {
      newIndex = this.len - 1;
    }
    // 0 => 1 正 1=>0 反
    this.reverse = index > newIndex ? true : false;
    // 无缝滚动  0 => 2 反   2=> 0 正
    if ((this.timer || flag) && this.loop) {
      if (index === 0 && newIndex === this.len - 1) {
        this.reverse = true;
      }
      if (index === this.len - 1 && newIndex === 0) {
        this.reverse = false;
      }
    }
    // 控制子组件
    this.$children.forEach((vm: any) => {
      // 用于更改子组件的数据
      vm.reverse = this.reverse;
    });
    this.$nextTick(() => {
      this.currentSelected = newIndex;
    });
  }
  private handleMouseEnter() {
    clearInterval(this.timer);
    this.timer = null;
  }
  private handleMouseLeave() {
    this.run();
  }
  private handleTouchStart(e: any) {
    this.handleMouseEnter();
    // 需要记录拖拽前的位置
    this.startTouch = e.touches[0];
  }
  private handleTouchEnd(e: any) {
    let endTouch = e.changedTouches[0];

    let { clientX: x1, clientY: y1 } = this.startTouch;
    let { clientX: x2, clientY: y2 } = endTouch;
    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    // 是往哪边移动

    let disY = Math.abs(y2 - y1);
    let x = (Math.sqrt(2) / 2) * distance; // 最大角的y长
    if (disY < x) {
      if (x2 > x1) {
        this.select(this.currentSelected - 1, true);
      } else {
        this.select(this.currentSelected + 1, true);
      }
    }
    this.run();
  }
  private beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
</script>

<style lang="scss" scoped>
.da-carousel {
  position: relative;
  overflow: hidden;

  .viewport {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .dots {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .dots span {
    display: inline-block;
    width: 20px;
    height: 6px;
    border-radius: 2px;
    background: #ccc;
    margin: 5px;
    text-indent: -9999px;
    opacity: 0.5;
    cursor: pointer;

    &.active {
      opacity: 1;
    }
  }

  .arrow-box {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>