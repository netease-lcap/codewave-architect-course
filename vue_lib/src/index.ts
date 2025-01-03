import * as Components from './components';

const LIBRARY_NAME = 'lib_example';
const UtilsLogics = {
  install: (Vue) => {
    Vue.prototype.$library = Vue.prototype.$library || {};
  },
};

const UseComponents = {
  install: (Vue) => {
    Object.keys(Components).forEach((name) => {
      if (Components[name].Component && Components[name].install) {
        Vue.component(name, Components[name].Component);
        return;
      }
      Vue.component(name, Components[name])
    })
  }
};

export {
  UseComponents,
  UtilsLogics,
};
