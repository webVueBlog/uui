<template>
  <aside class="da-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'DaAside'
})
export default class DaAside extends Vue {
  public static comName = 'DaAside';
  @Prop({
    default: '300px'
  })
  private width!: string;
}
</script>
<style lang="scss" scoped></style>
