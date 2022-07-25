<template>
  <div id="app">
    <da-button type="danger" disabled>禁用</da-button>
    <da-button type="primary" plain>朴素按钮</da-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  components: {
  }
})

export default class extends Vue {
}
</script>

<style lang="scss">

</style>
