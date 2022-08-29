// 所有组件的入口
import DaButton from './button/Button.vue';
import DaIcon from './icon/Icon.vue';
import DaButtonGroup from './buttonGroup/ButtonGroup.vue';
import DaCol from './layout/col/Col.vue';
import DaRow from './layout/row/Row.vue';

import DaAside from './container/aside/Aside.vue';
import DaContainer from './container/container/Container.vue';
import DaFooter from './container/footer/Footer.vue';
import DaHeader from './container/header/Header.vue';
import DaMain from './container/main/Main.vue';

import DaInput from './input/Input.vue';
import DaProgress from './progress/Progress.vue';
import DaDatePicker from './date-picker/date-pick/DatePicker.vue';
import DaDateRangePicker from './date-picker/date-range-picker/DateRangePicker.vue';

import DaPopover from './popover/Popover.vue';
import DaTable from './table/Table.vue';
import DaPagination from './pagination/Pagination.vue';

import DaCarousel from './carousel/carousel/Carousel.vue';
import DaCarouselItem from './carousel/carousel-item/Carousel-item.vue';
import infiniteScroll from './infiniteScroll';

let components = [
 DaButton,
 DaIcon,
 DaButtonGroup,
 DaCol,
 DaRow,

 DaAside,
 DaContainer,
 DaFooter,
 DaHeader,
 DaMain,

 DaInput,
 DaProgress,
 DaDatePicker,
 DaDateRangePicker,

 DaPopover,
 DaTable,
 DaPagination,
 DaCarousel,
 DaCarouselItem,
];

const install = (Vue: any) => {
  components.forEach((_: any) => {
    console.log('组件名', _.comName);
    Vue.component(_.comName, _);
  });
  Vue.directive(infiniteScroll.comName, infiniteScroll);
};

// 有可能组件会通过script标签的方式引入
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}

export default {
  install
};
