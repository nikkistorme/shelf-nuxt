import { newChange } from "./changeService";

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
    const { data: userBook, error } = await supabase
      .from("user_books")
      .insert([newBook]);
    if (error) throw error;
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
  try {
    const { data: updatedBook, error } = await supabase
      .from("user_books")
      .update(bookUpdates)
      .match({ id: user_book.id });
    if (error) throw error;
    return updatedBook[0];
  } catch (error) {
    throw error;
  }
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
      .textSearch("fts", paramString);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};
