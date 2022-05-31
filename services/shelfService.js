export const fetchShelves = async () => {
  const supabase = useSupabaseClient();
  try {
    const { data: shelves } = await supabase
      .from("shelves")
      .select(
        "name, id, in_progress_shelf, all_books_shelf, finished_shelf, sort"
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
