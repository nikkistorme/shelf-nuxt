<template>
  <div class="book-page__pages pencil-hover-container d-flex flex-column mb-1">
    <div class="d-flex gap-1">
      <p>{{ book.pages }} pages</p>
      <!-- <EditPencil
        v-show="editingField !== 'totalPages'"
        @click="editField('totalPages')"
      /> -->
    </div>
    <!-- <div
      v-if="editingField === 'totalPages'"
      class="book-page__pages-edit d-flex ai-center gap-1"
    >
      <NumberInput v-model="editingFieldValue" />
      <CloseIcon color="red" class="cursor-pointer" @click="editField('')" />
      <CheckmarkIcon
        class="book-page__pages-edit-confirm cursor-pointer"
        @click="updateField"
      />
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
  },
  setup() {},
};
</script>

<style>
.book-page__pages-edit-confirm {
  height: 30px;
  width: 30px;
}
</style>
