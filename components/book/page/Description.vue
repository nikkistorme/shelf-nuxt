<template>
  <div v-if="props.book.description" class="book-details__description card">
    <p
      class="book-details__description-text"
      :class="{ expanded: expandDescription }"
    >
      {{ props.book.description }}
    </p>
    <InlineButton
      class="book-details__description-expand"
      :text="expandDescription ? 'show less' : 'show more'"
      underline
      color="blue"
      @click="toggleDescription"
    />
  </div>
</template>

<script>
// TODO: expand and retract description
export default {
  props: {
    book: Object,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
