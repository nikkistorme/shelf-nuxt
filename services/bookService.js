export const fetchUserBooks = async () => {
  const supabase = useSupabaseClient();
  try {
    const { data: books } = await supabase
      .from("user_books")
      .select("id, cover, title, author, total_pages, in_progress, finished");
    return books;
  } catch (error) {
    throw error;
  }
};

export const fetchBook = async (book_id) => {
  const supabase = useSupabaseClient();
  try {
    const { data: book } = await supabase
      .from("books")
      .select()
      .eq("id", book_id);
    return book[0];
  } catch (error) {
    throw error;
  }
};
