import { AccessRight } from "@/types/access-rights";
import { supabaseClient } from "@/utils/supabase.client";
import { CommentForm } from "./AddComment";

export async function insertComment(
  formData: CommentForm & { documentId: number; userId: string }
) {
  const documentsResponse = await supabaseClient
    .from("comment")
    .insert({
      documentId: formData.documentId,
      userId: formData.userId,
      content: formData.comment,
    })
    .select()
    .single();

  if (!documentsResponse.data) {
    console.error("No documentId returned upon insertion");
    return;
  }
  const document = documentsResponse.data;
  const accessRightsResponse = await supabaseClient.from("comment").insert({
    userId: formData.userId,
    content: formData.comment,
    documentId: document.id,
  });

  if (documentsResponse.status === 201 && accessRightsResponse.status === 201) {
    return document;
  }

  return null;
}
