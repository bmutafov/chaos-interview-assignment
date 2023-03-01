import { supabaseClient } from "@/utils/supabase.client";
import { DocumentForm } from "./AddDocument";

export async function insertDocument(
  formData: DocumentForm & { userId: string }
) {
  const documentsResponse = await supabaseClient
    .from("document")
    .insert({ content: formData.document, title: formData.title })
    .select()
    .single();

  if (!documentsResponse.data) {
    console.error("No documentId returned upon insertion");
    return;
  }
  const document = documentsResponse.data;
  const accessRightsResponse = await supabaseClient
    .from("document_access_rights")
    .insert({
      userId: formData.userId,
      accessTypeId: 0,
      documentId: document.id,
    });

  if (documentsResponse.status === 201 && accessRightsResponse.status === 201) {
    return document;
  }

  return null;
}
