import { createClient } from "~/infrastructure/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class StorageRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient();
  }

  public async uploadFile(params: { file: File; userId: string }) {
    const { data, error } = await this.supabase.storage
      .from("bookmark-summary")
      .upload(`${params.userId}/${params.file.name}`, params.file);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
