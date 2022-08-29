<template>
  <div class="da-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'DaButtonGroup'
})
export default class DaButtonGroup extends Vue {
  public static comName = 'DaButtonGroup';
  private mounted() {
    // 校验内部子节点是否是button组件，如果不是报错
    let children = this.$el.children;
    // console.log(children);
    for (let i = 0; i < children.length; i++) {
      console.assert(children[i].tagName === 'BUTTON', '子元素必须为button');
    }
  }
}
</script>

<style lang="scss" scoped>
.da-button-group {
  display: inline-flex;
  vertical-align: middle;

  button {
    border-radius: 0;
    position: relative;

    &:not(first-child) {
      margin-left: 1px;
    }

    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }

    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>