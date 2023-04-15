<template>
  <table border="1" class="my-table">
    <thead>
      <tr>
        <th v-for="item of tHead" :key="item.key">
          {{ item.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) of tBody" :key="item.id">
        <td
          v-for="(value, key) in item"
          :key="key"
          @click.stop="showEditInput($event, key, idx)"
        >
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, createApp, reactive } from "vue";
import EditInput from "./EditInput.vue";

let editInputApp = null;

const state = reactive({
  key: "",
  value: "",
  idx: -1,
  text: "",
});

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      tHead: [],
      tBody: [],
    }),
  },
});

const emit = defineEmits(["submit"]);

const { tHead, tBody } = toRefs(props.data);

function showEditInput(evt, key, idx) {
  editInputApp && removeEditInputApp();

  if (!checkEditable(key)) return;

  const target = evt.target;
  const oFrag = document.createDocumentFragment();

  editInputApp = createApp(EditInput, {
    value: target.textContent,
    setValue,
  });

  if (editInputApp) {
    editInputApp.mount(oFrag);
    target.appendChild(oFrag);
    target.querySelector(".edit-input").select();
  }

  setData({ key, idx, text: findText(key) });
}

function findText(key) {
  const { text } = tHead.value.find((item) => item.key === key);
  return text;
}

function setData({ key, value = "", idx, text }) {
  state.key = key;
  state.idx = idx;
  state.value = value;
  state.text = text;
}

function setValue(value) {
  state.value = value;
  emit("submit", { ...state }, removeEditInputApp);
}

function checkEditable(key) {
  const { editable } = tHead.value.find((item) => item.key === key);
  return editable;
}

window.addEventListener("click", removeEditInputApp, false);

function removeEditInputApp() {
  editInputApp && editInputApp.unmount();
  editInputApp = null;
  setData({
    key: "",
    value: "",
    idx: -1,
    text: "",
  });
}
</script>

<style lang="scss" scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;

  tr {
    height: 44px;

    th,
    td {
      text-align: center;
      cursor: pointer;
      position: relative;
    }
  }
}
</style>
