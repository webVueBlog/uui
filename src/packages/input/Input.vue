<template>
  <div class="da-input" :class="inputClass">
    <da-icon :icon="prefixIcon" v-if="prefixIcon"></da-icon>
    <da-icon :icon="suffixIcon" v-if="suffixIcon"></da-icon>
    <input
      ref="input"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :value="value"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :showPassword="showPassword"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      @change="$emit('change', $event)"
    />
    <da-icon
      icon="da-icon-close"
      v-if="clearable && value"
      @click.native="$emit('input', '')"
      @mousedown.native.prevent
    >
    </da-icon>
    <da-icon
      :icon="showIcon"
      v-if="showPassword && value"
      @click.native="changeStatus"
    >
    </da-icon>

    <span class="da-input__suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </span>
    <span class="da-input__prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'DaInput'
})
export default class DaInput extends Vue {
  public static comName = 'DaInput';
  @Prop({
    default: 'text'
  })
  private type!: string;
  @Prop({
    default: ''
  })
  private value!: string | number;
  @Prop(String) private placeholder!: string;
  @Prop(String) private name!: string;
  @Prop({
    default: false
  })
  private disabled!: boolean;
  @Prop({
    default: false
  })
  private clearable!: boolean;
  @Prop({
    default: false
  })
  private showPassword!: boolean;
  @Prop({
    default: ''
  })
  private prefixIcon!: string;
  @Prop({
    default: ''
  })
  private suffixIcon!: string;

  private passwordVisible: boolean = false;
  private showIcon: string = 'da-icon-view-off';
  get inputClass() {
    let classes = [];
    if (this.clearable || this.showPassword || this.suffixIcon) {
      classes.push(`da-input-suffix-icon`);
    }
    if (this.$slots.suffix) {
      classes.push(`da-input-suffix-icon`);
    }
    if (this.$slots.prefix) {
      classes.push(`da-input-prefix-icon`);
    }
    if (this.prefixIcon) {
      classes.push(`da-input-prefix-icon`);
    }
    return classes;
  }
  private changeStatus() {
    this.passwordVisible = !this.passwordVisible;
    console.log(this.passwordVisible);
    this.$nextTick(() => {
      (this.$refs.input as HTMLElement).focus();
      this.showIcon = this.passwordVisible
        ? 'da-icon-view'
        : 'da-icon-view-off';
    });
  }
}
</script>
<style lang="scss" scoped>
$height: 42px;
$width: 150px;
.da-input {
  display: inline-flex;
  position: relative;

  input {
    padding: 8px;
    width: $width;
    height: $height;
    border-radius: $border-radius;
    border: 1px solid $border-color;

    &:focus {
      border: 1px solid $primary;
      outline: none;
      box-shadow: inset -1px $primary, inset 1px 1px 1px $primary;
    }

    &[disabled] {
      cursor: not-allowed;
      background-color: #eeeeee;
    }
  }
}

.da-input-suffix-icon {
  input {
    padding-right: 25px;
  }

  .da-icon {
    right: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
  }
}

.da-input-prefix-icon {
  input {
    padding-left: 25px;
  }

  .da-icon {
    left: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
  }
}
</style>
