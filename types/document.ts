import { Database } from "./supabase";

export type Document = Database["public"]["Tables"]["document"]["Row"];
