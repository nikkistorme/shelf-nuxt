<template>
  <div class="shelf-title">
    <div
      class="shelf-title__select-wrapper d-flex ai-center"
      @click="openShelfSelectModal"
    >
      <div
        class="shelf-title__select-icon d-flex flex-column jc-space-around mr-1"
      >
        <IconArrowDown class="up" />
        <IconArrowDown class="down" />
      </div>
      <h2 class="shelf-title__name">{{ activeShelf.name }}</h2>
    </div>
    <ModalShelfChange v-if="selectingShelf" />
  </div>
</template>

<script>
import { useShelfStore } from "~~/store/ShelfStore";
import { useModalStore } from "~~/store/ModalStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const shelfStore = useShelfStore();
    const { activeShelf } = storeToRefs(shelfStore);

    const selectingShelf = ref(false);
    const modalStore = useModalStore();
    function openShelfSelectModal() {
      selectingShelf.value = true;
      modalStore.openModal();
    }

    const { modal } = storeToRefs(modalStore);
    watch(modal, (newValue) => {
      if (!newValue) {
        selectingShelf.value = false;
      }
    });

    return {
      activeShelf,
      selectingShelf,
      openShelfSelectModal,
    };
  },
};
// const addHeightForNewShelf = () => {
//   const outerDropdown = document.querySelector(".shelf-title__shelf-dropdown");
//   const shelfList = document.querySelector(".shelf-title__dropdown-list");
//   console.log("🚀 ~ shelfList", shelfList);
//   if (shelfList.clientHeight < 450) {
//     outerDropdown.style.height = outerDropdown.clientHeight + 41.88 + "px";
//   }
// };

// export default {
//   components: {
//     ArrowDown,
//     DefaultButton,
//     DefaultInput,
//     ShelvesList,
//     EditPencil,
//     CloseIcon,
//     CheckmarkIcon,
//   },
//   data() {
//     return {
//       createShelfFormOpen: false,
//       newShelfName: "",
//       editName: false,
//     };
//   },
//   methods: {
//     toggleEditName() {
//       this.editName = !this.editName;
//       this.newShelfName = this.activeShelf.name;
//     },
//     async updateShelfName() {
//       await this.updateActiveShelfName(this.newShelfName);
//       this.newShelfName = this.activeShelf.name;
//       this.editName = false;
//     },
//     toggleShelfSelect() {
//       this.toggleModal();
//       this.toggleLibraryShelfSelectOpen();
//       if (this.createShelfFormOpen) {
//         this.createShelfFormOpen = false;
//       }
//     },
//     toggleCreateShelfForm() {
//       this.newShelfName = "";
//       this.createShelfFormOpen = !this.createShelfFormOpen;
//     },
//     async createShelf() {
//       const newShelf = await this.addShelf(this.newShelfName);
//       this.setActiveShelf(newShelf);
//       this.newShelfName = "";
//     },
//   },
// };
</script>

<style>
.shelf-title {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-size-1);
}
.shelf-title__select-wrapper {
  width: fit-content;
  cursor: pointer;
}
.shelf-title__select-icon .up,
.shelf-title__select-icon .down {
  width: var(--spacing-size-1);
  height: var(--spacing-size-1);
}
.shelf-title__select-icon .up {
  transform: rotate(180deg);
}
/* .shelf-title__shelf-dropdown {
  left: var(--spacing-size-1);
  top: 40px;
  width: calc(240px + (var(--spacing-size-1) * 2));
} */
.shelf-title__dropdown-list {
  max-height: 450px;
  overflow-y: auto;
}
.create-shelf {
  height: 0;
  visibility: hidden;
  overflow: hidden;
  transition: all 0.25s ease-in-out;
}
.create-shelf.open {
  height: 132px;
  visibility: visible;
}
</style>
