<template>
  <main class="da-main">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DaMain'
})
export default class DaMain extends Vue {
  public static comName = 'DaMain';
}
</script>
<style lang="scss" scoped >
.da-main {
  flex: 1;
  padding: 20px;
}
</style>
