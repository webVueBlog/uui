<template>
 <div class="da-row" :style="rowStyle">
     <slot></slot>
 </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'DaRow'
})
export default class DaRow extends Vue {
  public static comName = 'DaRow';
  @Prop({ default: 0 }) private gutter!: number;
  @Prop({
    validator(type) {
      if (
        type &&
        !['start', 'end', 'center', 'space-around', 'space-between'].includes(
          type as any
        )
      ) {
        console.error(
          '类型必须是:' +
            ['start', 'end', 'center', 'space-around', 'space-between'].join(
              '、'
            )
        );
      }
      return true;
    }
  })
  private justify!: string;

  get rowStyle() {
    let style = {};
    if (this.gutter) {
      style = {
        ...style,
        marginLeft: -this.gutter / 2 + 'px',
        marginRight: -this.gutter / 2 + 'px' // 通过外层的margin 负值 解决内部padding的问题
      };
    }
    if (this.justify) {
      let key = ['start', 'end'].includes(this.justify)
        ? 'flex-' + this.justify
        : this.justify;
      style = {
        ...style,
        justifyContent: key
      };
    }
    return style;
  }
  private mounted() {
    this.$children.forEach((child: any) => {
      child.gutter = this.gutter;
    });
  }
}

</script>
<style lang="scss" scoped>
.da-row{
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;  
} 
</style>