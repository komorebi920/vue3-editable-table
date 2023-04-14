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
          @click="showEditInput($event, key, idx)"
        >
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits, toRefs } from "vue";

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

defineEmits(["submit"]);

const { tHead, tBody } = toRefs(props.data);

function showEditInput(evt, key, idx) {
  console.log(evt, key, idx);
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
    }
  }
}
</style>
