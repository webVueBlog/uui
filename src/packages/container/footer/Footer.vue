<template>
  <footer class="da-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'DaFooter'
})
export default class DaFooter extends Vue {
  public static comName = 'DaFooter';
  @Prop({
    default: '60px'
  })
  private height!: string;
}
</script>
<style lang="scss" scoped></style>
