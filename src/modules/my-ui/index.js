import { MyTable } from "./MyTable";

const components = {
  MyTable,
};

export { MyTable };
export default {
  install(app) {
    for (const component in components) {
      if (Object.hasOwnProperty.call(components, component)) {
        app.component(component, components[component]);
      }
    }
  },
};
