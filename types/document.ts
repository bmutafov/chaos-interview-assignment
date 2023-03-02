import { Database } from "./supabase";

export type Document = Database["public"]["Tables"]["document"]["Row"];
export type Comment = Database["public"]["Tables"]["comment"]["Row"];
export type DocumentAccessRights =
  Database["public"]["Tables"]["document_access_rights"]["Row"];
