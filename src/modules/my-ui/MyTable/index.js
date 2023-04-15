import MyTable from "./MyTable.vue";

export { MyTable };
export default {
  install(app) {
    app.component("MyTable", MyTable);
  },
};
