<template>
  <div class="home-shelf d-flex flex-column jc-end w-100">
    <div class="home-shelf__books d-flex jc-start gap-1 w-100">
      <BookShelved
        v-for="(book, i) in booksOnThisShelf"
        :key="i"
        :book="book"
        class="home-shelf__book"
      />
    </div>
    <div class="home-shelf__floor d-flex jc-space-between w-100">
      <h5 class="home-shelf__name" @click="shelfStore.setActiveShelf(shelf.id)">
        <NuxtLink to="/library">{{ shelf.name }}</NuxtLink>
      </h5>
      <div v-if="shelf.sort" class="home-shelf__sort d-flex ai-center">
        <FormsSelectInput
          :id="`shelf-sort__${shelf.id}`"
          v-model="shelf.sort.method"
          class="home-shelf__sort-method"
          :options="sortOptions"
          inline
          no-carrot
          align="right"
        />
        <div
          class="home-shelf__sort-direction d-flex jc-center ai-center"
          :class="{ ascending: !shelf.sort.descending }"
          @click="changeSortDirection"
        >
          <IconArrowDown />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useShelfStore } from "~~/store/ShelfStore";
import { useBookStore } from "~~/store/BookStore";

export default {
  setup() {
    const shelfStore = useShelfStore();
    const bookStore = useBookStore();

    const booksOnThisShelf = computed(() => {
      return bookStore.inProgressBooks;
    });

    const sortOptions = ref([
      {
        value: "date-added-to-library",
        label: "Date added",
      },
      {
        value: "percent-complete",
        label: "Progress",
      },
      {
        value: "last-updated-progress",
        label: "Last updated progress",
      },
      {
        value: "date-added-to-shelf",
        label: "Date started",
      },
    ]);

    const shelf = ref({ ...shelfStore.inProgressShelf });

    function changeSortDirection() {
      shelf.value.sort.descending = !shelf.value.sort.descending;
    }

    watch(
      shelf,
      (newValue) => {
        shelfStore.updateShelfSort(newValue);
      },
      { deep: true }
    );

    return {
      shelfStore,
      booksOnThisShelf,
      sortOptions,
      shelf,
      changeSortDirection,
    };
  },
};
</script>

<style>
@media (min-width: 768px) and (max-width: 1023px) {
  .home-shelf {
    grid-column: 1 / -1;
  }
}
.home-shelf__books {
  padding: calc(var(--spacing-size-1) / 4);
  overflow-x: auto;
  overflow-y: hidden;
}
.home-shelf__floor {
  position: relative;
  padding: calc(var(--spacing-size-1) / 4) var(--spacing-size-1);
  border: 2px solid var(--color-gray);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.home-shelf__sort-method {
  margin-right: 20px;
  border: none;
  background: none;
  text-align: right;
}
.home-shelf__sort-direction {
  position: absolute;
  right: 0;
  height: 100%;
  width: 40px;
  cursor: pointer;
}
.home-shelf__sort-direction svg {
  height: 10px;
  width: 10px;
}
.home-shelf__sort-direction.ascending svg {
  transform: rotate(180deg);
}
</style>
