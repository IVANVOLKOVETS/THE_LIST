import { defineStore } from "pinia";
import { ref, onBeforeMount, computed } from "vue";
import { OPTIONS } from "/src/constants/api";
import { DEFAULT_HEADING, FETCH_HEADING } from "/src/constants/messages";

const DEFAULT_PAGE = 1;

export const useListStore = defineStore("list", () => {
  const message = ref(DEFAULT_HEADING);
  const theList = ref([]);
  const page = ref(DEFAULT_PAGE);
  const isNextPage = ref(false);

  const url = computed(
    () => `https://my.api.mockaroo.com/numbers2.json?&page=${page.value}`
  );

  const fetchList = () => {
    message.value = FETCH_HEADING;

    fetch(url.value, OPTIONS)
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          throw data.error;
        }

        data?.array && theList.value.push(...data.array);
        isNextPage.value = data?.nextPage;
        message.value = DEFAULT_HEADING;
      })
      .catch((error) => (message.value = error));
  };

  const incrementPage = () => {
    page.value += 1;
  };

  return { message, isNextPage, theList, fetchList, incrementPage };
});
