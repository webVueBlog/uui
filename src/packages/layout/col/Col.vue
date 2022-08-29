<template>
  <div class="da-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script lang="ts"  scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
declare module 'vue/types/vue' {
  interface Vue {
    [key: string]: any;
  }
}
@Component({
  name: 'DaCol'
})
export default class DaCol extends Vue {
  public static comName = 'DaCol';
  @Prop({ default: 24 }) private readonly span!: number;
  @Prop({ default: 0 }) private readonly offset!: number;
  @Prop([Number, Object])
  private xs!: number | object;
  @Prop([Number, Object])
  private sm!: number | object;
  @Prop([Number, Object])
  private md!: number | object;
  @Prop([Number, Object])
  private lg!: number | object;
  @Prop([Number, Object])
  private xl!: number | object;
  private gutter = 0;
  get colClass() {
    let classes: string[] = [];
    classes.push(`da-col-${this.span}`);
    if (this.offset) {
      classes.push(`da-col-offset-${this.offset}`);
    }
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach((type: string) => {
      // console.log(this, type);
      if (typeof this[type] === 'object') {
        let { span, offset } = this[type];
        // tslint:disable-next-line: no-unused-expression
        span && classes.push(`da-col-${type}-${span}`);
        // tslint:disable-next-line: no-unused-expression
        offset && classes.push(`da-col-${type}-${offset}`);
      } else {
        // tslint:disable-next-line: no-unused-expression
        this[type] && classes.push(`da-col-${type}-${this[type]}`);
      }
    });
    return classes;
  }
  get colStyle() {
    let style = {};
    if (this.gutter) {
      style = {
        ...style,
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px'
      };
    }
    return style;
  }
}
</script>
<style lang="scss"  scoped>
.da-col-0 {
  display: none;
}
@for $i from 1 through 24 {
  .da-col-#{$i} {
    width: $i / 24 * 100%;
  }

  .da-col-offset-#{$i} {
    margin-left: $i / 24 * 100%;
  }

  .da-col-pull-#{$i} {
    position: relative;
    right: (1 / 24 * $i * 100) * 1%;
  }

  .da-col-push-#{$i} {
    position: relative;
    left: (1 / 24 * $i * 100) * 1%;
  }
}

@include res(xs) {
  .da-col-xs-0 {
    display: none;
  }
  @for $i from 1 through 24 {
    .da-col-xs-#{$i} {
      width: $i / 24 * 100%;
    }

    .da-col-xs-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }

    .da-col-xs-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .da-col-xs-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(sm) {
  .da-col-sm-0 {
    display: none;
  }
  @for $i from 1 through 24 {
    .da-col-sm-#{$i} {
      width: $i / 24 * 100%;
    }

    .da-col-sm-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }

    .da-col-sm-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .da-col-sm-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(md) {
  .da-col-md-0 {
    display: none;
  }
  @for $i from 1 through 24 {
    .da-col-md-#{$i} {
      width: $i / 24 * 100%;
    }

    .da-col-md-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }

    .da-col-md-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .da-col-md-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(lg) {
  .da-col-lg-0 {
    display: none;
  }
  @for $i from 1 through 24 {
    .da-col-lg-#{$i} {
      width: $i / 24 * 100%;
    }

    .da-col-lg-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }

    .da-col-lg-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .da-col-lg-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(xl) {
  .da-col-xl-0 {
    display: none;
  }
  @for $i from 1 through 24 {
    .da-col-xl-#{$i} {
      width: $i / 24 * 100%;
    }

    .da-col-xl-offset-#{$i} {
      margin-left: $i / 24 * 100%;
    }

    .da-col-xl-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .da-col-xl-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
</style>