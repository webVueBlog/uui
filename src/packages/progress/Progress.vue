<template>
  <div
    class="da-progress"
    :class="['el-progress--line', status ? 'is-' + status : '']"
  >
    <div class="da-progress-bar">
      <div
        class="da-progress-bar_outer"
        :style="{ height: strokeWidth + 'px' }"
      >
        <div class="da-progress-bar_inner" :style="barStyle"></div>
      </div>
    </div>
    <div class="da-progress_text">
      <template v-if="!status">{{ content }}</template>
      <da-icon v-else :icon="iconClass"></da-icon>
    </div>
  </div>
</template>
<script lang="ts" scoped>
 import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'DaProgress'
})
export default class DaProgress extends Vue {
  public static comName = 'DaProgress';
  @Prop({ default: 0 })
  // tslint:disable-next-line: ban-types
  private percentage!: number;
  @Prop({ default: 6 }) private strokeWidth!: number;
  // tslint:disable-next-line: ban-types
  @Prop({ default: '' }) private color!: string | Function | colorArrary[];
  @Prop({
    validator: (val) => ['success', 'exception', 'warning'].indexOf(val) > -1
  })
  private status!: string;
  // tslint:disable-next-line: ban-types
  @Prop() private format!: number | Function;
  get content() {
    if (typeof this.format === 'function') {
      return this.format(this.percentage) || '';
    } else {
      return `${this.percentage}%`;
    }
  }
  get barStyle() {
    let styles: any = {};
    styles.width = this.percentage + '%';
    styles.background = this.getCurrentColor(this.percentage);
    return styles;
  }
  get iconClass() {
    if (this.status === 'warning') {
      return 'da-icon-caution';
    }
    return this.status === 'success' ? 'da-icon-check' : 'da-icon-close';
  }
  private getCurrentColor(per: number) {
    if (typeof this.color === 'function') {
      return this.color(per);
    } else if (typeof this.color === 'string') {
      return this.color;
    } else {
      return this.getLevelColor(per);
    }
  }
  private getLevelColor(per: number) {
    let colorArr: colorArrary[] = this.getColorArrary().sort(
      (a: colorArrary, b: colorArrary) => a.percentage - b.percentage
    );
    colorArr.forEach((_: colorArrary) => {
      if (_.percentage > per) {
        return _.color;
      }
    });
    return colorArr[colorArr.length - 1].color;
  }
  private getColorArrary() {
    let color: any = this.color;
    let span = 100 / this.color.length;
    return color.map((c: colorArrary, i: number) =>
      typeof c === 'string' ? { color: c, progress: (i + 1) * span } : c
    );
  }
}

</script>
<style lang="scss" scoped >
.da-progress-bar {
  margin-right: -55px;
  box-sizing: border-box;
  padding-right: 50px;
  width: 100%;
  display: inline-block;
  vertical-align: middle;

  .da-progress-bar_outer {
    border-radius: 100px;
    background-color: $progress-bg-color;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
  }
}

.da-progress-bar_inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  text-align: right;
  border-radius: 100px;
  line-height: 1;
  white-space: nowrap;
  transition: width 0.6s ease;
  background: $primary;
}

.da-progress_text {
  color: #606266;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}
</style>
