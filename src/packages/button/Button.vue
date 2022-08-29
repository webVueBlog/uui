<template>
  <button
    class="da-btn"
    :class="btnClass"
    :disabled="disabled"
    :plain="plain"
    @click="onClickBtn"
  >
    <da-icon v-if="icon" :icon="icon" class="icon"></da-icon>
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" scoped>
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'DaButton'
})
export default class DaButton extends Vue {
  public static comName = 'DaButton';
  @Prop({
    default: '',
    validator(type: any) {
      if (
        type &&
        !['warning', 'success', 'danger', 'info', 'primary', 'text'].includes(
          type
        )
      ) {
        console.error(
          'type类型必须为：' +
            ['warning', 'success', 'danger', 'info', 'primary', 'text'].join(
              '、'
            )
        );
      }
      return true;
    }
  })
  private readonly type!: string;
  @Prop(String)
  private readonly icon!: string;
  @Prop({
    default: 'left',
    validator(type: any) {
      if (!['left', 'right'].includes(type)) {
        throw new Error('iconPosition属性必须为：' + 'left | right');
      }
      return true;
    }
  })
  private readonly iconPosition!: string;
  @Prop(Boolean)
  private disabled!: boolean; // 禁用
  @Prop(Boolean)
  private plain!: boolean; // 朴素
  // 禁用
  get btnClass() {
    let classes = [];
    if (this.type) {
      classes.push(`da-btn-${this.type}`);
    }
    if (this.iconPosition) {
      classes.push(`da-btn-${this.iconPosition}`);
    }
    return classes;
  }
  // tslint:disable-next-line: no-empty
  @Emit('click') private emitClickEvent(event: MouseEvent) {}
  private onClickBtn(event: MouseEvent) {
    // tslint:disable-next-line: no-unused-expression
    this.disabled ? '' : this.emitClickEvent(event);
  }
}
</script>
<style lang="scss" scoped>
$height: 42px;
$font-size: 16px;
$color: #606266;
$background: #ecf5ff;
$active-color: #3a8ee6;

.da-btn {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  padding: 0 14px;
  height: $height;
  font-size: $font-size;
  cursor: pointer;
  letter-spacing: 0.09em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  // 静止元素的文字被选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    border-color: $border-color;
    background: $background;
  }

  &:focus,
  &:active {
    color: $active-color;
    border: 1px solid $active-color;
    background: $background;
    outline: none;
  }

  @each $type,
    $color
      in (
        primary: $primary,
        success: $success,
        info: $info,
        warning: $warning,
        danger: $danger
      )
  {
    &-#{$type} {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }

  @each $type,
    $color
      in (
        primary: $primary-disable,
        success: $success-disable,
        info: $info-disable,
        warning: $warning-disable,
        danger: $danger-disable
      )
  {
    &-#{$type} {
      &[disabled] {
        cursor: not-allowed;
        background: #{$color};
        border: 1px solid #{$color};
        color: #fff;
      }

      &[disabled]:hover {
        cursor: not-allowed;
        background: #{$color};
        border: 1px solid #{$color};
        color: #fff;
      }
    }
  }

  @each $type,
    $color
      in (
        primary: $primary-hover,
        success: $success-hover,
        info: $info-hover,
        warning: $warning-hover,
        danger: $danger-hover
      )
  {
    &-#{$type}:hover {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }

  @each $type,
    $color
      in (
        primary: $primary-active,
        success: $success-active,
        info: $info-active,
        warning: $warning-active,
        danger: $danger-active
      )
  {
    &-#{$type}:focus {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }

  .icon {
    font-size: 16px;
  }

  .icon + span {
    margin: 0px;
    margin-left: 4px;
  }

  &-left {
    i {
      order: 1;
    }

    span {
      order: 2;
    }
  }

  &-right {
    span {
      order: 1;
    }

    i {
      order: 2;
    }

    .icon + span {
      margin: 0px;
      margin-right: 4px;
    }
  }

  &-text {
    border: 0 solid transparent;
    background: transparent;

    &[disabled] {
      cursor: not-allowed;
      border: 0 solid transparent;
      background: transparent;
      color: #ccc;
    }

    &[disabled]:hover {
      cursor: not-allowed;
      border: 0 solid transparent;
      background: transparent;
      color: #ccc;
    }
  }

  &-text:hover,
  &-text:focus {
    border: 0 solid transparent;
    background: transparent;
    color: $primary-active;
  }
}
</style>
