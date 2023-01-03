<template>
  <div class="book-page__pages pencil-hover-container d-flex flex-column">
    <div class="d-flex gap-1">
      <p>{{ book.total_pages }} pages</p>
    </div>
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
