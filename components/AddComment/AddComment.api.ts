import { AccessRight } from "@/types/access-rights";
import { supabaseClient } from "@/utils/supabase.client";
import { CommentForm } from "./AddComment";

export async function insertComment(
  formData: CommentForm & {
    documentId: number;
    userId: string;
    selectionEnd: number | null;
    selectionStart: number | null;
  }
) {
  const documentsResponse = await supabaseClient
    .from("comment")
    .insert({
      documentId: formData.documentId,
      userId: formData.userId,
      content: formData.comment,
      selectionEnd: formData.selectionEnd,
      selectionStart: formData.selectionStart,
    })
    .select()
    .single();

  if (!documentsResponse.data) {
    console.error("No documentId returned upon insertion");
    return;
  }

  if (documentsResponse.status === 201) {
    return documentsResponse.data;
  }

  return null;
}
