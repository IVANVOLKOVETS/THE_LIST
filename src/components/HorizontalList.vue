<script setup>
import { ref, onMounted } from "vue";
import { useVirtualList } from "@vueuse/core";

const props = defineProps({
  items: Array,
  id: Number,
  isLastItem: Boolean,
});

const emit = defineEmits(["last-item"]);

const theList = ref(props.items || []);

const { list, containerProps, wrapperProps } = useVirtualList(theList, {
  itemWidth: 100,
  overscan: 2,
});

onMounted(() => {
  props.isLastItem && emit("last-item");
});
</script>

<template>
  <div class="h-list">
    {{ props.id }}
    <div v-bind="containerProps" style="height: 100px">
      <div v-bind="wrapperProps">
        <!-- Not a good practice for :key but the doc says that it's ok
        https://vueuse.org/core/useVirtualList/#horizontal-list anyway
        we are not gonna manipulate the list on the client side -->
        <div v-for="item in list" :key="item.index" class="h-list_item">
          {{ item.data }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.h-list_item {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid paleturquoise;
  border-radius: 8px;
  transition: transform 0.5s ease;
}
.h-list_item:hover {
  transform: scale(0.8);
}
</style>
