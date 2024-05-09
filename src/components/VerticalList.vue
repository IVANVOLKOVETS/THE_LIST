<script setup>
import { ref, computed } from "vue";

import { useVirtualList } from "@vueuse/core";

const props = defineProps({
  items: Array,
});

const theList = ref(props.items);

const listClass = computed(() => {
  return {
    "v-list": true,
    hidden: !theList.value.length,
  };
});

const { list, containerProps, wrapperProps } = useVirtualList(theList, {
  itemHeight: 100,
});

</script>

<template>
  <div v-bind="containerProps" :class="listClass">
    <div v-bind="wrapperProps">
      <slot :list="list"></slot>
    </div>
  </div>
</template>

<style scoped>
.v-list {
  height: 400px;
  max-width: 310px;
  opacity: 1;
  transition: opacity 1s ease;
}

.hidden {
  opacity: 0;
}
</style>
