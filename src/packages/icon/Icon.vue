<template>
  <i :class="`${icon}`" class="da-icon" @click="$emit('click')"></i>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'DaIcon'
})
export default class DaIcon extends Vue {
  public static comName = 'DaIcon';
  @Prop({
    required: true
  })
  private readonly icon!: string;
}
</script>
<style lang="scss" scoped>
@import '../../styles/icon.css';

.da-icon {
    font-size: 16px;
    vertical-align: middle;
}
</style>
