import { shallowMount } from '@vue/test-utils'; // vue提供的快速测试的方法
import { expect } from 'chai';
import Button from '@/packages/button/Button.vue';

 it('测试button能否正常显示', () => {    // 测试当前组件运行在浏览器的情况
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'da-ui'
            }
        });
        expect(wrapper.text()).to.eq('da-ui');
    });