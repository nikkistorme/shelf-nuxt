export const fetchShelves = async () => {
  const supabase = useSupabaseClient();
  try {
    const { data: shelves } = await supabase
      .from("shelves")
      .select(
        "name, id, in_progress_shelf, all_books_shelf, finished_shelf, sort, book_count"
      );
    return shelves;
  } catch (error) {
    throw error;
  }
};

export const fetchShelf = async (shelf_id) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase.from("shelves").select().eq("id", shelf_id);
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const fetchBooksForShelf = async (shelf) => {
  const supabase = useSupabaseClient();
  try {
    if (shelf?.all_books_shelf) {
      const { data, error } = await supabase.from("user_books").select();
      if (error) {
        throw error;
      }
      return data;
    } else if (shelf?.in_progress_shelf) {
      const { data, error } = await supabase
        .from("user_books")
        .select()
        .eq("in_progress", true);
      if (error) {
        throw error;
      }
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateShelfSort = async (shelf) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase
      .from("shelves")
      .update({ sort: shelf.sort })
      .match({ id: shelf.id });
    return data[0];
  } catch (error) {
    throw error;
  }
};
