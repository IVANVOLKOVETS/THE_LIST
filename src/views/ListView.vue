<script setup>
import { onBeforeMount, computed } from "vue";

import { useListStore } from "/src/stores/list";
import { storeToRefs } from "pinia";

import HorizontalList from "/src/components/HorizontalList.vue";
import VerticalList from "/src/components/VerticalList.vue";

const listStore = useListStore();
const { message, isNextPage, theList } = storeToRefs(listStore);
const { fetchList, incrementPage } = listStore;

const onLastItem = () => {
  if (isNextPage.value) {
    incrementPage();
    fetchList();
  }
};

const checkIsLast = (index) => {
  return index === theList.value.length - 1;
};

onBeforeMount(() => {
  fetchList();
});
</script>

<template>
  <p>{{ message }}</p>
  <VerticalList :items="theList" v-slot="{ list }">
    <HorizontalList
      v-for="item in list"
      :key="item.data.id"
      :id="item.data.id"
      :items="item.data.numbers"
      :is-last-item="checkIsLast(item.data.id)"
      @last-item="onLastItem"
    />
  </VerticalList>
</template>
