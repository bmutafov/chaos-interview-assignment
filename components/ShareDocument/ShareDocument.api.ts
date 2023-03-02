import { ANONYMOUS_USER_ID } from "@/constants/user.consts";
import { DocumentAccessRights } from "@/types/document";
import { supabaseClient } from "@/utils/supabase.client";
import { ShareDocumentForm } from "./ShareDocument";

type ShareDocumentFormWithDocumentId = ShareDocumentForm & {
  documentId: number;
};

async function upsertDocumentAccessRights(
  formData: Omit<DocumentAccessRights, "created_at">
) {
  const { documentId, userId, accessType } = formData;

  const { status, data, error } = await supabaseClient
    .from("document_access_rights")
    .upsert({
      accessType,
      userId,
      documentId,
    })
    .select()
    .single();

  if (status === 201) return data;
  else throw new Error(error?.message);
}

async function getUserData(userEmail: string) {
  const { data, error } = await supabaseClient
    .from("users")
    .select("id")
    .eq("email", userEmail)
    .single();

  if (!data) throw new Error(error.message);
  return data;
}

export async function insertDocumentAccessRight(
  formData: ShareDocumentFormWithDocumentId
) {
  const { accessRights, documentId, userEmail } = formData;
  const accessType = Number(accessRights);

  if (formData.anyone) {
    return upsertDocumentAccessRights({
      accessType,
      documentId: documentId,
      userId: ANONYMOUS_USER_ID,
    });
  }

  const { id: userId } = await getUserData(userEmail);
  return upsertDocumentAccessRights({
    documentId,
    accessType,
    userId,
  });
}
