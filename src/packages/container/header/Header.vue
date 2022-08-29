<template>
  <header class="da-header" :style="{ height }">
    <slot></slot>
  </header>
</template>
<script lang="ts" >
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'DaHeader'
})
export default class DaHeader extends Vue {
  public static comName = 'DaHeader';
  @Prop({
    default: '60px'
  })
  private height!: string;
}
</script>
<style lang="scss" scoped ></style>
