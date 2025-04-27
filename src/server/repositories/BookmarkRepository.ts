import "server-only";
import { createAuthClient } from "~/libs/supabase/supabaseAuthInit";
import { Bookmark } from "~/types/Bookmark";
import {
  type TablesInsert,
  type TablesUpdate,
} from "~/../supabase/database.types";

export async function BookmarkRepository() {
  const supabase = await createAuthClient();

  async function createBookmark(values: TablesInsert<"bookmarks">) {
    const { data, error } = await supabase
      .from("bookmarks")
      .insert(values)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      url: data.url,
      title: data.title,
      content: data.content ?? "",
      audioPath: data.audio_path ?? "",
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as Bookmark;
  }

  async function updateBookmark(id: string, values: TablesUpdate<"bookmarks">) {
    const supabase = await createAuthClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .update(values)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      url: data.url,
      title: data.title,
      content: data.content ?? "",
      audioPath: data.audio_path ?? "",
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as Bookmark;
  }

  async function deleteBookmark(id: string) {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) throw error;

    return { isSuccess: true };
  }

  async function getBookmarks(page: number = 1, perPage: number = 10) {
    const supabase = await createAuthClient();
    const start = (page - 1) * perPage;

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .range(start, start + perPage - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  async function getBookmarkById(id: string) {
    const supabase = await createAuthClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) return null;
    if (error) throw error;

    return data;
  }

  return {
    createBookmark,
    updateBookmark,
    deleteBookmark,
    getBookmarks,
    getBookmarkById,
  };
}
