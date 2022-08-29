<template>
  <section class="da-container" :class="{ isVertical: isVertical }">
    <slot></slot>
  </section>
</template>
<script lang="ts" >
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DaContainer'
})
export default class DaContainer extends Vue {
  public static comName = 'DaContainer';
  private isVertical: boolean = true;
  private mounted() {
    this.isVertical = this.$children.some((child) =>
      ['DaFooter', 'DaHeader'].includes(child.$options.name as string)
    );
  }
}
</script>
<style lang="scss" scoped >
.da-container {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.isVertical {
  flex-direction: column;
}
</style>
