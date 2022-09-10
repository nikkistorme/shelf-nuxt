<template>
  <div class="modal-shelf-change generic-modal flex-column">
    <div class="modal-shelf-change__wrapper d-flex flex-column ai-end p-1 pt-2">
      <ul class="modal-shelf-change__list w-100 px-1">
        <li
          v-for="(shelf, i) in sortedShelves"
          :key="i"
          class="modal-shelf-change__shelf d-flex jc-space-between ai-center"
          :class="{ 'mb-1': i !== sortedShelves.length - 1 }"
        >
          <div class="d-flex">
            <p
              v-if="shelf.id === activeShelf.id"
              class="modal-shelf-change__active-shelf-name"
            >
              {{ shelf.name }}
            </p>
            <ButtonInline
              v-else
              :text="shelf.name"
              color="blue"
              @click="setActiveShelf(shelf)"
            />
            <div>
              <p>&nbsp;({{ shelf.book_count }})</p>
            </div>
          </div>
          <!-- <CloseIcon
            v-if="canDeleteShelf(shelf)"
            class="shelves-list__delete"
            color="red"
            @click="removeShelf(shelf)"
          /> -->
        </li>
      </ul>
      <!-- <hr class="my-2" />
      <DefaultButton
        :text="createShelfFormOpen ? 'Cancel' : 'New shelf'"
        flavor="tiny"
        :color="createShelfFormOpen ? 'red' : 'blue'"
        class="w-fit-content"
        @click="toggleCreateShelfForm"
      />
      <form
        class="create-shelf d-flex flex-column ai-end w-100"
        :class="{ open: createShelfFormOpen }"
        @submit.prevent="createShelf"
      >
        <DefaultInput
          id="create-shelf-name"
          v-model="newShelfName"
          label="Name"
          class="create-shelf__name w-100 mb-1"
        />
        <DefaultButton
          type="submit"
          text="Create"
          flavor="tiny"
          color="blue"
        />
      </form> -->
    </div>
  </div>
</template>

<script>
import { useShelfStore } from "~~/store/ShelfStore";
import { useModalStore } from "~~/store/ModalStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const shelfStore = useShelfStore();
    const { shelves, activeShelf } = storeToRefs(shelfStore);

    const sortedShelves = computed(() => {
      const allBooksShelf = shelves.value.find((shelf) => shelf.allBooksShelf);
      const finishedShelf = shelves.value.find((shelf) => shelf.finishedShelf);
      const inProgressShelf = shelves.value.find(
        (shelf) => shelf.inProgressShelf
      );
      const unreadShelf = shelves.value.find((shelf) => shelf.unreadShelf);
      const sorted = shelves.value.filter(
        (shelf) =>
          !shelf.allBooksShelf &&
          !shelf.finishedShelf &&
          !shelf.inProgressShelf &&
          !shelf.unreadShelf
      );
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      if (unreadShelf) sorted.unshift(unreadShelf);
      if (inProgressShelf) sorted.unshift(inProgressShelf);
      if (finishedShelf) sorted.unshift(finishedShelf);
      if (allBooksShelf) sorted.unshift(allBooksShelf);
      return sorted;
    });

    const modalStore = useModalStore();
    async function setActiveShelf(shelf) {
      await shelfStore.setActiveShelf(shelf);
      modalStore.closeModal();
    }

    return {
      sortedShelves,
      activeShelf,
      setActiveShelf,
    };
  },
};
</script>

<style>
.modal-shelf-change {
  height: auto;
  width: auto;
  visibility: visible;
}
.modal-shelf-change__active-shelf-name {
  font-weight: bold;
  text-decoration: underline;
}
.modal-shelf-change__delete {
  height: 16px;
  width: 16px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.1s ease-in-out;
}
.modal-shelf-change__shelf .modal-shelf-change__delete {
  pointer-events: all;
  cursor: pointer;
  opacity: 1;
}
</style>
