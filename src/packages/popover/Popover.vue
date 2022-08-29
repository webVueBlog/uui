<template>
  <div class="da-popover">
    <div
      class="da-popover-content"
      ref="content"
      v-if="visible"
      :style="{ width: width + 'px' }"
      :class="`content-${placement}`"
      @click.stop
    >
      <h3 v-if="title">{{ title }}</h3>
      <slot>{{ content }}</slot>
      <div class="arrow"></div>
    </div>
    <slot name="reference"></slot>
  </div>
</template>

<script lang="ts" scoped >
 import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const on = (element: any, event: string, handler: any) => {
  element.addEventListener(event, handler, false);
};
const off = (element: any, event: string, handler: any) => {
  element.removeEventListener(event, handler, false);
};
@Component({
  name: 'DaPopover'
})
export default class DaPopover extends Vue {
  public static comName = 'DaPopover';
  @Prop({ default: 'click' })
  private trigger!: string;
  @Prop({
    validator(type) {
      if (!['top', 'bottom', 'left', 'right'].includes(type)) {
        throw new Error(
          '属性必须是' + ['top', 'bottom', 'left', 'right'].join('、')
        );
      }
      return true;
    }
  })
  private placement!: string;
  @Prop()
  private title!: string;
  @Prop()
  private content!: string;
  @Prop({
    default: '200',
    validator(type) {
      return parseInt(type, 0) >= 150;
    }
  })
  private width!: string;
  @Prop({ default: false })
  private disabled!: boolean;
  private visible: boolean = false;
  @Watch('value', { immediate: true })
  private changeValue(value: boolean) {
    this.visible = value;
    if (value) {
      // 显示
      this.$nextTick(() => {
        let content: any = this.$refs.content;
        document.body.appendChild(content);
        if (this.trigger === 'hover') {
          on(this.$el, 'mouseenter', this.handleMouseEnter);
          on(this.$el, 'mouseleave', this.handleMouseLeave);
        }
      });
    }
  }
  private mounted() {
    let reference = this.$slots.reference;
    if (reference) {
      this.reference = reference[0].elm;
    }
    if (this.trigger === 'hover') {
      console.log(this.trigger, this.$el);
      on(this.$el, 'mouseenter', this.handleMouseEnter);
      on(this.$el, 'mouseleave', this.handleMouseLeave);
    } else if (this.trigger === 'click') {
      on(this.reference, 'click', this.toggle);
      on(document, 'click', this.handleDocumentClick);
    }
  }
  private toggle() {
    this.visible = !this.visible;
  }
  private handleDocumentClick(e: any) {
    if (this.$el.contains(e.target)) {
      return false;
    }
    this.visible = false;
  }
  private handleMouseEnter() {
    clearTimeout(this.timer);
    this.visible = true;
  }
  private handleMouseLeave() {
    this.timer = setTimeout(() => {
      this.visible = false;
    }, 200);
  }
  private beforeDestroy() {
    off(this.$el, 'mouseenter', this.handleMouseEnter);
    off(this.$el, 'mouseleave', this.handleMouseLeave);
    off(this.reference, 'click', this.toggle);
    off(document, 'click', this.handleDocumentClick);
  }
}

</script>
<style lang="scss" scoped >
.da-popover {
  display: inline-block;
  position: relative;
}

.da-popover-content {
  position: absolute;
  min-width: 150px;
  top: 0;
  left: 0;
  padding: 10px;
  border-radius: 4px;
  z-index: 10;
  box-shadow: -1px -1px 3px #ccc, 1px 1px 3px #ccc;
  background: #ffffff;
}

.arrow {
  position: absolute;
}

.arrow::before,
.arrow::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ccc;
  position: absolute;
}

.arrow::after {
  border-bottom-color: #ffffff;
  transform: translateY(1px);
  filter: drop-shadow(0 -2px 1px #ccc);
}

.content-top {
  left: calc(-50% + 6px);
  top: calc(-100% - 40px);
  margin-bottom: 12px;

  .arrow {
    left: 50%;
    margin-left: -6px;
    bottom: 0;

    &::after,
    &::before {
      transform: rotate(180deg);
    }
  }
}

.content-bottom {
  left: calc(-50% + 6px);
  top: 40px;
  margin-top: 12px;

  .arrow {
    left: 50%;
    margin-left: -6px;
    top: -12px;
  }
}

.content-left {
  top: calc(-50% + 6px - 20px);
  left: calc(-100% - 110px);
  margin-right: 12px;

  .arrow {
    top: 50%;
    margin-top: -6px;
    right: 0;

    &::after,
    &::before {
      transform: rotate(90deg);
    }
  }
}

.content-right {
  top: calc(-50% + 6px - 20px);
  left: 110px;
  margin-left: 12px;

  .arrow {
    top: 50%;
    margin-right: -6px;
    left: -12px;

    &::after,
    &::before {
      transform: rotate(-90deg);
    }
  }
}
</style>