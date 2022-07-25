// 所有组件的入口
import DaButton from './button/Button.vue';
import DaIcon from './icon/Icon.vue';

let components = [
 DaButton,
 DaIcon
];

const install = (Vue: any) => {
  components.forEach((_: any) => {
    console.log('组件名', _.comName);
    Vue.component(_.comName, _);
  });
};

// 有可能组件会通过script标签的方式引入
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}

export default {
  install
};
