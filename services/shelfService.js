export const createNewShelf = async (name) => {
  const supabase = useSupabaseClient();
  const userAuth = useSupabaseUser();
  try {
    const { data } = await supabase
      .from("shelves")
      .insert([{ name, user_id: userAuth.value.id }]);
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const fetchShelves = async () => {
  const supabase = useSupabaseClient();
  try {
    const { data: shelves } = await supabase
      .from("shelves")
      .select(
        "inserted_at, name, id, in_progress_shelf, all_books_shelf, finished_shelf, sort, book_count"
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
    console.log("🚀 ~ data", data);
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const fetchBooksForShelf = async (shelf) => {
  const supabase = useSupabaseClient();
  let books;
  try {
    if (shelf?.all_books_shelf) {
      const { data } = await supabase.from("user_books").select();
      books = data;
    } else if (shelf?.in_progress_shelf) {
      const { data } = await supabase
        .from("user_books")
        .select()
        .eq("in_progress", true);
      books = data;
    }
  } catch (error) {
    throw error;
  }
  return books;
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

export const getAllBooksShelfCount = async () => {
  const supabase = useSupabaseClient();
  try {
    const { error, count } = await supabase
      .from("user_books")
      .select("*", { count: "exact" })
      .range(0, 1);
    return count;
  } catch (error) {
    throw error;
  }
};

export const updateAllBooksShelfCount = async (count) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase
      .from("shelves")
      .update({ book_count: count })
      .match({ all_books_shelf: true });
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const getInProgressShelfCount = async () => {
  const supabase = useSupabaseClient();
  try {
    const { count } = await supabase
      .from("user_books")
      .select("*", { count: "exact" })
      .eq("in_progress", true)
      .range(0, 1);
    return count;
  } catch (error) {
    throw error;
  }
};

export const updateInProgressShelfCount = async (count) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase
      .from("shelves")
      .update({ book_count: count })
      .match({ in_progress_shelf: true });
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const updateShelfName = async (shelf_id, newName) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase
      .from("shelves")
      .update({ name: newName })
      .match({ id: shelf_id });
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const deleteShelf = async (shelf_id) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase
      .from("shelves")
      .delete()
      .match({ id: shelf_id });
    return data[0];
  } catch (error) {
    throw error;
  }
};
