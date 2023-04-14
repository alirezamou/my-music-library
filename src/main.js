import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
  faPlus,
  faTimes,
  faTrashAlt,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faChevronUp,
  faChevronDown,
  faCheck,
  faPlus,
  faTimes,
  faTrashAlt,
  faPenSquare
);

const app = createApp(App);

app.component("fa-icon", FontAwesomeIcon);

app.use(router);

app.use(store);

app.mount("#app");
