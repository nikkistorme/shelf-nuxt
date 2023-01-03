<template>
  <div class="bp-shelves d-flex flex-wrap">
    <div class="bp-shelves__button d-flex">
      <IconAddBook class="bp-shelves__button-icon cursor-pointer h-100" />
      <ButtonInline
        class="bp-shelves__button-inline"
        :text="!userBook?.shelves?.length ? 'Add to shelf' : ''"
        underline
        color="blue"
      />
      <select
        id="add-book-to-shelf"
        name="add-book-to-shelf"
        class="bp-shelves__button-select h-100 w-100 cursor-pointer"
      ></select>
    </div>
    <div
      v-for="(shelf, i) in userBook.shelves"
      :key="i"
      class="bp-shelves__shelf d-flex ai-center"
    >
      <p>
        {{ getShelfById(shelf).name }}
      </p>
      <button
        class="bp-shelves__remove button-is-container d-flex cursor-pointer"
        type="button"
        @click="removeFromShelf(shelf)"
      >
        <IconClose class="w-100 h-100" color="red" />
      </button>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBookStore } from "~/store/BookStore";
import { useShelfStore } from "~/store/ShelfStore";

export default {
  setup() {
    const bookStore = useBookStore();
    const ShelfStore = useShelfStore();

    const { userBook } = storeToRefs(bookStore);
    const { shelves } = storeToRefs(ShelfStore);

    function getShelfById(id) {
      const shelfFromStore = shelves.value.find(
        (shelf) => parseInt(shelf.id) === parseInt(id)
      );
      return shelfFromStore ? shelfFromStore : "";
    }

    return {
      userBook,
      getShelfById,
    };
  },
};
</script>

<style>
.bp-shelves {
  gap: var(--spacing-size-half);
}
.bp-shelves__button {
  position: relative;
  gap: var(--spacing-size-half);
  height: 30px;
}
.bp-shelves__button-icon {
  width: fit-content;
}
.bp-shelves__button-inline {
  min-width: fit-content;
}
.bp-shelves__button-select {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.bp-shelves__shelf {
  gap: var(--spacing-size-half);
  padding: 0 calc((var(--spacing-size-half)));
  border-radius: var(--border-radius-2);
  border: 2px solid var(--color-primary);
}
.bp-shelves__remove {
  height: 13px;
  width: 13px;
}
</style>
