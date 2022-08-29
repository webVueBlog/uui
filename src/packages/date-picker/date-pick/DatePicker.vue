<template>
  <div class="da-date-picker" v-clickOutSide="handleBlur">
    <da-input
      suffix-icon="da-icon-rili"
      @focus="handleFocus"
      :value="formateDate"
      @change="handleChange"
    ></da-input>
    <div class="da-date-content" v-if="isVisible">
      <div class="da-date-picker-content">
        <template v-if="mode === 'dates'">
          <div class="da-date-picker-header">
            <da-icon
              icon="da-icon-doubleleft"
              @click="changeYear(-1)"
            ></da-icon>
            <da-icon
              icon="da-icon-arrow-left"
              @click="changeMonth(-1)"
            ></da-icon>
            <span>
              <b @click="mode = 'years'">{{ tempTime.year }}</b> 年
              <b @click="mode = 'months'">{{ tempTime.month + 1 }}</b> 月</span
            >
            <da-icon
              icon="da-icon-arrow-right"
              @click="changeMonth(1)"
            ></da-icon>
            <da-icon
              icon="da-icon-doubleright"
              @click="changeYear(1)"
            ></da-icon>
          </div>
          <div>
            <span class="cell" v-for="week in weeks" :key="week">{{
              week
            }}</span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span
              class="cell cell-dates"
              v-for="j in 7"
              :key="`col_${j}`"
              @click="selectDate(getCurrentDate(i, j))"
              :class="{
                isNotCurrentMonth: !isCurrentMonth(getCurrentDate(i, j)),
                isToday: isToday(getCurrentDate(i, j)),
                isSelect: isSelect(getCurrentDate(i, j))
              }"
            >
              {{ getCurrentDate(i, j).getDate() }}
            </span>
          </div>
        </template>
        <template v-if="mode === 'years'">
          <div class="da-date-picker-header">
            <da-icon
              icon="da-icon-doubleleft"
              @click="changeYear(-10)"
            ></da-icon>
            <span>
              <b>{{ startYear }}</b> 年 - <b>{{ startYear + 9 }}</b> 年</span
            >
            <da-icon
              icon="da-icon-doubleright"
              @click="changeYear(10)"
            ></da-icon>
          </div>
          <span
            class="cell cell-year"
            v-for="y in 10"
            :key="y"
            :class="{
              isYear: isYear(startYear + y - 1)
            }"
            @click="yearToMonth(startYear + y - 1)"
          >
            {{ startYear + y - 1 }}
          </span>
        </template>
        <template v-if="mode === 'months'">
          <div class="da-date-picker-header">
            <da-icon
              icon="da-icon-doubleleft"
              @click="changeYear(-10)"
            ></da-icon>
            <span>
              <b @click="mode = 'years'">{{ this.tempTime.year }}</b> 年</span
            >
            <da-icon
              icon="da-icon-doubleright"
              @click="changeYear(10)"
            ></da-icon>
          </div>
          <span
            class="cell cell-year"
            v-for="m in 12"
            :key="m"
            @click="monthToDate(m - 1)"
          >
            {{ m }} 月
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped >
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// 判断点击是否时自己内部的元素
import clickOutSide from 'v-click-outside';
@Component({
  name: 'DaDatePicker',
  directives: {
    clickOutSide: clickOutSide.directive
  }
})
export default class DaDatePicker extends Vue {
  public static comName = 'DaDatePicker';
  @Prop({ default: () => new Date() })
  private value!: string | Date;
  @Prop({ default: 'date' })
  private type!: string;

  private isVisible: boolean = false;
  private mode: string = 'dates'; // dates years months
  private time: Time = {
    year: '',
    month: '',
    day: ''
  };
  private tempTime: Time = {
    year: '',
    month: '',
    day: ''
  };
  private weeks: string[] = ['日', '一', '二', '三', '四', '五', '六'];
  private months: string[] = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ];
  // 监听时间变化
  @Watch('value')
  private onChangeValue(val: Date) {
    let [year, month, day] = this.getYearMonthDay(val);
    this.time = {
      year,
      month,
      day
    };
    this.tempTime = { ...this.time }; // 拷贝用于后续更改
  }

  // 计算属性
  get formateDate() {
    if (this.value) {
      let { year, month, day } = this.time;
      return `${year}-${(month + 1 + '').padStart(2, '0')}-${(
        day + ''
      ).padStart(2, '0')}`;
    }
  }
  // <!-- 直接将自己向前移动多少天后 开始循环42天 -->
  get visibleData() {
    let firstDay: any = new Date(
      parseInt(this.tempTime.year, 0),
      parseInt(this.tempTime.month, 0),
      1
    ); // 当月一号
    let weekDay = firstDay.getDay(); // 周日 0  周六 6
    weekDay = weekDay === 0 ? 7 : weekDay;
    // 毫秒戳 运算
    let start = firstDay - weekDay * 60 * 60 * 24 * 1000; // 开始部分
    let arr = [];
    for (let i = 0; i < 42; i++) {
      // 转回成时间
      arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
    }
    return arr;
  }
  get startYear() {
    // tslint:disable-next-line
    return parseInt(this.tempTime.year) - (parseInt(this.tempTime.year) % 10);
  }
  private mounted() {
    let [year, month, day] = this.getYearMonthDay(this.value || new Date());
    this.time = {
      year,
      month,
      day
    };
    this.tempTime = {
      year,
      month,
      day
    };
    console.log(this.mode);
  }
  private handleChange(e: any) {
    // 失去焦点时更新用户输入
    let newValue = e.target.value;
    let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (newValue.match(regExp)) {
      this.$emit(
        'input',
        new Date(
          parseInt(RegExp.$1, 0),
          parseInt(RegExp.$2, 0),
          parseInt(RegExp.$3, 0)
        )
      );
    } else {
      e.target.value = this.formateDate; // 将原来的值附回去
    }
    this.handleBlur();
  }
  private handleBlur() {
    this.isVisible = false;
    this.mode = 'dates';
  }
  private handleFocus() {
    this.isVisible = true;
  }
  private getCurrentDate(i: number, j: number) {
    return this.visibleData[(i - 1) * 7 + (j - 1)];
  }
  private isYear(date: string) {
    let [year] = this.getYearMonthDay(new Date());
    return year === date;
  }
  // 从月 跳到date面板
  private monthToDate(m: string) {
    console.log(m);
    this.tempTime.month = m;
    this.mode = 'dates';
  }
  private yearToMonth(m: string) {
    console.log(m);
    this.tempTime.year = m;
    this.mode = 'months';
  }

  private isCurrentMonth(date: Date) {
    let { year, month } = this.tempTime;
    let [y, m] = this.getYearMonthDay(date);
    return year === y && month === m;
  }
  private isToday(date: Date) {
    let [y, m, d] = this.getYearMonthDay(date);
    let [year, month, day] = this.getYearMonthDay(new Date());
    return year === y && month === m && day === d;
  }
  private isSelect(date: Date) {
    let { year, month, day } = this.time;
    let [y, m, d] = this.getYearMonthDay(date);
    return year === y && month === m && day === d;
  }
  private selectDate(date: Date) {
    // 选择日期
    this.$emit('input', date); // 更改日期
    this.handleBlur(); // 隐藏面板
  }
  private changeYear(num: number) {
    // 不能直接加减
    const oldDate = new Date(
      parseInt(this.tempTime.year, 0),
      parseInt(this.tempTime.month, 0)
    );
    const newDate = oldDate.setFullYear(oldDate.getFullYear() + num);
    let [year] = this.getYearMonthDay(new Date(newDate));
    this.tempTime.year = year;
  }
  private changeMonth(num: number) {
    const oldDate = new Date(
      parseInt(this.tempTime.year, 0),
      parseInt(this.tempTime.month, 0)
    );
    const newDate = oldDate.setMonth(oldDate.getMonth() + num);
    let [year, month] = this.getYearMonthDay(new Date(newDate));
    this.tempTime.year = year;
    this.tempTime.month = month;
  }

  private getYearMonthDay(date: any) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return [year, month, day];
  }
}
</script>
<style lang="scss" scoped>
.da-date-picker {
  display: inline-block;

  .da-date-content {
    position: absolute;
    z-index: 10;
    user-select: none;
    width: 280px;
    background: #ffffff;
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;

    .da-date-picker-header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        b {
          cursor: pointer;
        }
      }

      .da-icon {
        cursor: pointer;
      }
    }

    .cell {
      width: 40px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      text-align: center;
      color: #606266;
      cursor: pointer;
    }

    .cell-year {
      width: 70px;
      height: 70px;
      line-height: 70px;
    }

    .isNotCurrentMonth {
      color: #c0c4cc;
    }

    .cell-dates:hover:not(.isNotCurrentMonth):not(.isSelect) {
      color: $primary;
    }

    .isToday {
      color: $primary;
      font-weight: 700;
      background: #ffffff;
    }

    .isYear {
      color: $primary;
      font-weight: 700;
      background: #ffffff;
    }

    .isMonth {
      color: $primary;
      font-weight: 700;
      background: #ffffff;
    }

    .isSelect {
      color: #ffffff;
      background: $primary;
      border-radius: 50%;
    }
  }
}
</style>

