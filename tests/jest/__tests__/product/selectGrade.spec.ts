import { shallowMount } from '@vue/test-utils';
import SelectGrade from '@/components/Product/SelectGrade.vue';

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(SelectGrade, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
