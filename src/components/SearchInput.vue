<template>
  <div class="search-input">
    <icon-search class="search-input__icon" />
    <input ref="inputRef" v-model.trim="input" :placeholder="$t('search')" autofocus>
    <button v-show="input" class="search-input__clear" @click="input = ''">
      <icon-x />
    </button>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, type InputHTMLAttributes } from "vue";
import { useFocus, useVModel } from "@vueuse/core";
import { IconSearch, IconX } from "@tabler/icons-vue";

interface Props {
  modelValue: InputHTMLAttributes["value"]
}
const props = defineProps<Props>();
const emit = defineEmits<{ "update:modelValue": [value: Props["modelValue"]] }>();
const input = useVModel(props, "modelValue", emit);

const inputRef = useTemplateRef("inputRef");
useFocus(inputRef, { initialValue: true });
</script>
<style lang="scss">
.search-input {
  position: relative;
  width: 100%;
  &__icon {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-beige-dark-medium);
    transform: translateY(-50%);
  }
  &__clear {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    display: grid;
    place-items: center;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    color: var(--color-beige-dark);
    cursor: pointer;
    background-color: #1f170c2e;
    border: none;
    border-radius: 50%;
    outline: none;
    transform: translateY(-50%);
    svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  input {
    width: 100%;
    padding: 0.425rem 0.75rem 0.425rem 1.9rem;
    font-size: 0.875rem;
    color: var(--color-beige-dark);
    background-color: #1f170c0f;
    border: none;
    border-radius: 0.625rem;
    outline: none;
    &::placeholder {
      color: var(--color-beige-dark-medium);
    }
  }
}
</style>
