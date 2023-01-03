import { newChange } from "./changeService";
import {
  getAllBooksShelfCount,
  updateAllBooksShelfCount,
} from "./shelfService";

export const bookSchema = () => {
  return {
    author: "",
    author_last_to_first: "",
    average_rating: null,
    cover: "",
    description: "",
    isbn: "",
    isbn_13: "",
    published: null,
    published_original: null,
    publisher: "",
    title: "",
    total_pages: null,
  };
};

export const userBookSchema = () => {
  return {
    author: "",
    base: "",
    changes: [],
    cover: "",
    current_page: null,
    description: "",
    finished: false,
    goal: {
      startDate: "",
      targetDate: "",
      targetPage: null,
    },
    in_progress: false,
    minutes_per_page: null,
    shelves: [],
    title: "",
    total_pages: null,
    user_id: "",
  };
};

export const addNewBook = async (book) => {
  const supabase = useSupabaseClient();
  try {
    const { data: newBook, error } = await supabase
      .from("books")
      .insert([book]);
    if (error) throw error;
    return newBook[0];
  } catch (error) {
    console.log("🚀 ~ error", error);
    throw error;
  }
};

export const addBookToLibrary = async (book) => {
  const supabase = useSupabaseClient();
  const userAuth = useSupabaseUser();
  const change = newChange("addBookToLibrary", book);
  let newBook = userBookSchema();
  newBook.author = book.author;
  newBook.base = book.id;
  newBook.changes = [change];
  newBook.cover = book.cover;
  newBook.description = book.description;
  newBook.title = book.title;
  newBook.total_pages = book.total_pages;
  newBook.user_id = userAuth.value.id;
  try {
    const { data: userBook, error: userBookError } = await supabase
      .from("user_books")
      .insert([newBook]);

    const allBooksShelfCount = await getAllBooksShelfCount();
    await updateAllBooksShelfCount(allBooksShelfCount);

    return userBook[0];
  } catch (error) {
    console.log("🚀 ~ error", error);
    throw error;
  }
};

export const fetchUserBooks = async () => {
  const supabase = useSupabaseClient();
  try {
    const { data: books, error } = await supabase.from("user_books").select();
    if (error) throw error;
    return books;
  } catch (error) {
    throw error;
  }
};

export const fetchInProgressBooks = async () => {
  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase
      .from("user_books")
      .select()
      .eq("in_progress", true);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchBook = async (book_id) => {
  const supabase = useSupabaseClient();
  try {
    const { data: book, error: bookError } = await supabase
      .from("books")
      .select()
      .eq("id", book_id);
    if (bookError) throw bookError;
    const { data: userBook, error: userBookError } = await supabase
      .from("user_books")
      .select()
      .eq("base", book_id);
    if (userBookError) throw userBookError;
    return { book: book[0], userBook: userBook[0] };
  } catch (error) {
    throw error;
  }
};

export const startReadingBook = async (user_book) => {
  const supabase = useSupabaseClient();
  const change = newChange("startReadingBook", user_book);
  const bookUpdates = {
    in_progress: true,
    current_page: 0,
    changes: [...user_book.changes, change],
  };
  bookUpdates.changes.sort((a, b) => {
    return a.created > b.created ? -1 : 1;
  });
  let updatedBook;
  try {
    const { data } = await supabase
      .from("user_books")
      .update(bookUpdates)
      .match({ id: user_book.id });
    updatedBook = data[0];
  } catch (error) {
    throw error;
  }
  return updatedBook;
};

export const updateProgress = async (user_book_id, book_updates) => {
  const supabase = useSupabaseClient();
  try {
    const { data: updatedBook, error } = await supabase
      .from("user_books")
      .update(book_updates)
      .match({ id: user_book_id });
    if (error) throw error;
    return updatedBook[0];
  } catch (error) {
    throw error;
  }
};

export const finishReadingBook = async (user_book_id, book_updates) => {
  const supabase = useSupabaseClient();
  try {
    const { data: updatedBook, error } = await supabase
      .from("user_books")
      .update(book_updates)
      .match({ id: user_book_id });
    if (error) throw error;
    return updatedBook[0];
  } catch (error) {
    throw error;
  }
};

export const updateUserBook = async (user_book_id, book_updates) => {
  const supabase = useSupabaseClient();
  try {
    const { data: updatedBook, error } = await supabase
      .from("user_books")
      .update(book_updates)
      .match({ id: user_book_id });
    if (error) throw error;
    return updatedBook[0];
  } catch (error) {
    throw error;
  }
};

export const removeBookFromLibrary = async (book_id) => {
  const supabase = useSupabaseClient();
  try {
    const { data, error } = await supabase
      .from("user_books")
      .delete()
      .match({ id: book_id });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchBooks = async (query) => {
  const supabase = useSupabaseClient();
  const params = query.toLowerCase().split(" ");
  let paramString = "";
  params.forEach((term, index) => {
    if (term.length > 0 && index !== 0) paramString += " | ";
    if (term.length > 0) paramString += `'${term.toLowerCase()}'`;
  });
  try {
    const { data, error } = await supabase
      .from("books")
      .select()
      .textSearch("fts", paramString, {
        type: "websearch",
        config: "english",
      });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchGoogleBooks = async (query, quantity) => {
  const searchResults = await $fetch("/api/google-books", {
    method: "post",
    body: { query, quantity },
  });
  return searchResults;
};
