import { Database } from "./supabase";

export type Document = Database["public"]["Tables"]["document"]["Row"];
export type Comment = Database["public"]["Tables"]["comment"]["Row"];
