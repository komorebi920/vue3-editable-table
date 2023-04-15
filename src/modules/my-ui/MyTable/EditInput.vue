<template>
  <input
    type="text"
    class="edit-input"
    :value="value"
    @input="onInput"
    @blur="onBlur"
    @click.stop="onClick"
  />
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
    default: "",
  },
  setValue: {
    type: Function,
    required: true,
    default: () => {},
  },
});

const inputValue = ref(props.value);

const onInput = (evt) => {
  inputValue.value = evt.target.value.trim();
};

const onBlur = () => {
  props.setValue(inputValue.value);
};

const onClick = () => {};
</script>

<style lang="scss" scoped>
.edit-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid orange;
  text-align: center;
  outline: none;
}
</style>
