import { createApp } from "vue";
import App from "./App.vue";
import MyUI from "./modules/my-ui";

createApp(App).use(MyUI).mount("#app");
