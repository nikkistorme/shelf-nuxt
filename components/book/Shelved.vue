<template>
  <div class="shelved-book">
    <div
      class="shelved-book__cover"
      :class="router.currentRoute.value.name"
      @click="viewBookDetails"
    >
      <img
        v-if="props?.book?.cover"
        :src="props.book.cover"
        :alt="props.book.title"
      />
      <div
        v-else
        class="shelved-book__cover-placeholder d-flex flex-column jc-space-between ai-center p-1"
      >
        <h5>{{ props.book.title }}</h5>
        <p>{{ props.book.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
  },
  setup(props) {
    const router = useRouter();

    async function viewBookDetails() {
      await router.push(`/books/${props.book.base}`);
    }
    return {
      router,
      props,
      viewBookDetails,
    };
  },
};
</script>

<style>
.shelved-book__cover img {
  border-radius: 5px;
  object-fit: contain;
  object-position: bottom;
  box-shadow: var(--box-shadow-2);
}
.home.shelved-book__cover {
  height: 250px;
  max-width: 400px;
  /* overflow: hidden; */
}
.home.shelved-book__cover img {
  height: 100%;
  object-fit: contain;
  object-position: bottom;
}
.library.shelved-book__cover {
  display: flex;
  align-items: flex-end;
  height: 100%;
}
.library.shelved-book__cover img {
  width: 100%;
}
.shelved-book__cover-placeholder {
  height: 100%;
  border-radius: 5px;
  background-color: var(--color-grey);
  text-align: center;
}
.home .shelved-book__cover-placeholder {
  height: 250px;
  width: 175px;
}
</style>
