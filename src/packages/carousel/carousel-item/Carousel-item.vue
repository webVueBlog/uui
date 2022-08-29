<template>
  <!-- 
 v-enter-active  进入
 v-leave-active 离开激活
 v-enter 进入之前
 v-leave-to 移动到哪去
-->
  <transition>
    <div class="da-carousel-item" v-if="isShow" :class="{ reverse }">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'DaCarouselItem'
})
export default class DaCarouselItem extends Vue {
  public static comName = 'DaCarouselItem';
  private index!: number;
  private reverse: boolean = false;
  private created() {
    let children = this.$parent.$children.filter(
      (child) => child.$options.name === 'DaCarouselItem'
    );
    this.index = children.length - 1;
  }
  private get isShow() {
    // console.log(this.$parent.currentSelected, this.index);
    return this.$parent.currentSelected === this.index;
  }
}
</script>

<style lang="scss" scoped >
.da-carousel-item {
  height: 100%;
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}

.v-enter {
  transform: translateX(100%);
}

.v-leave-to {
  transform: translateX(-100%);
}

.v-enter.reverse {
  transform: translateX(-100%);
}

.v-leave-to.reverse {
  transform: translateX(100%);
}

.v-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>