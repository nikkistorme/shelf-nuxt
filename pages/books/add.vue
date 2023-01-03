<template>
  <div class="add-book d-flex jc-center">
    <form
      class="add-book__form d-flex flex-column gap-1 w-100"
      @submit.prevent="submitForm"
    >
      <div class="add-book__cover d-flex jc-center">
        <img
          v-if="bookToAdd.cover"
          :src="bookToAdd.cover"
          alt="the new book's cover"
        />
        <div
          v-else
          class="add-book__cover-placeholder d-flex flex-column jc-between ai-center p-1"
        ></div>
      </div>
      <div class="d-flex">
        <InputDefault
          id="cover-url"
          v-model="coverURL"
          type="text"
          label="Or upload from a URL"
        />
        <ButtonDefault type="button" @click="uploadImageURL(coverURL)">
          Add book
        </ButtonDefault>
      </div>
      <label class="cover-upload__label" for="cover-upload">
        Upload cover image
      </label>
      <input
        id="cover-upload"
        class="cover-upload__input"
        type="file"
        @change="uploadImage"
      />
      <InputDefault
        id="title"
        v-model="bookToAdd.title"
        type="text"
        label="Title"
        :required="true"
      />
      <InputDefault
        id="author"
        v-model="bookToAdd.author"
        type="text"
        label="Author"
      />
      <InputNumber
        id="total-pages"
        v-model="bookToAdd.total_pages"
        label="Pages"
      />
      <InputTextarea
        id="description"
        v-model="bookToAdd.description"
        label="Description"
      />
      <InputDefault
        id="publisher"
        v-model="bookToAdd.publisher"
        type="text"
        label="Publisher"
      />
      <InputNumber
        id="isbn-10"
        class="add-book__isbn"
        v-model="bookToAdd.isbn"
        label="ISBN 10"
      />
      <InputNumber
        id="isbn-13"
        class="add-book__isbn"
        v-model="bookToAdd.isbn_13"
        label="ISBN 13"
      />
      <ButtonDefault :disabled="disableSubmission" type="submit">
        Add book
      </ButtonDefault>
    </form>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBookStore } from "~~/store/BookStore";
import { bookSchema } from "~~/services/bookService";

export default {
  setup() {
    definePageMeta({
      middleware: ["user-auth"],
    });
    let loading = ref(false);

    const bookStore = useBookStore();
    const { bookToAdd } = storeToRefs(bookStore);

    if (!bookToAdd.value) bookToAdd.value = bookSchema();

    const fileFromEvent = (event) => {
      const file = event.target.files[0];
      return file;
    };

    async function uploadImage(event) {
      loading.value = true;
      const form = new FormData();
      form.append("file", fileFromEvent(event));

      const { id, uploadURL } = await $fetch("/api/image", {
        method: "post",
      });

      const response = await fetch(uploadURL, {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      const imageURL = data.result.variants[0];

      if (imageURL) {
        bookToAdd.value.cover = imageURL;
      }
      loading.value = false;
    }

    const coverURL = ref("");
    async function uploadImageURL(url) {
      console.log("🚀 ~ url", url);
      loading.value = true;
      const response = await $fetch("/api/image-url", {
        method: "post",
        body: url,
      });
    }

    const disableSubmission = computed(() => {
      return (
        loading.value ||
        !bookToAdd.value.cover ||
        !bookToAdd.value.title ||
        !bookToAdd.value.author ||
        !bookToAdd.value.total_pages
      );
    });

    const router = useRouter();
    async function submitForm() {
      if (disableSubmission.value) return;
      await bookStore.addNewBook();
      if (bookStore.book?.id) await router.push(`/books/${bookStore.book.id}`);
    }

    return {
      loading,
      bookToAdd,
      coverURL,
      uploadImage,
      uploadImageURL,
      disableSubmission,
      submitForm,
    };
  },
};
</script>

<style>
.add-book {
  max-width: 700px;
  margin: 0 auto;
}
.add-book__cover {
  max-width: 100%;
  width: 175px;
}
.add-book__cover img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  object-fit: contain;
  object-position: bottom;
  box-shadow: var(--box-shadow-2);
}
.add-book__cover-placeholder {
  height: 250px;
  width: 100%;
  border-radius: 5px;
  background-color: var(--color-grey);
  text-align: center;
}

.add-book__isbn input {
  max-width: 250px;
}
</style>
