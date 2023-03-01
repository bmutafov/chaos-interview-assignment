import { supabaseClient } from "@/utils/supabase.client";
import { ShareDocumentForm } from "./ShareDocument";

export async function insertDocumentAccessRight(
  formData: ShareDocumentForm & {
    documentId: number;
  }
) {
  const { data: userData } = await supabaseClient
    .from("users")
    .select("id")
    .eq("email", formData.userEmail)
    .single();

  if (!userData) {
    throw new Error("User is not registered");
  }

  const accessRightResponse = await supabaseClient
    .from("document_access_rights")
    .upsert({
      documentId: formData.documentId,
      userId: userData.id,
      accessType: Number(formData.accessRights),
    })
    .select()
    .single();

  if (accessRightResponse.status === 201) {
    return accessRightResponse.data;
  }

  throw new Error("User was already invited");
}
