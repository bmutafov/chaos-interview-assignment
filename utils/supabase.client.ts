import { AccessRight } from "@/types/access-rights";
import { Database } from "@/types/supabase";
import {
  createBrowserSupabaseClient,
  createServerSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export const supabaseClient = createBrowserSupabaseClient<Database>();

export class SupabaseServerClient {
  private readonly serverClient: SupabaseClient<Database>;

  constructor(private readonly context: GetServerSidePropsContext) {
    this.serverClient = createServerSupabaseClient<Database>(context);
  }

  getSession = async () => {
    const {
      data: { session },
    } = await this.serverClient.auth.getSession();
    return session;
  };

  getUserDocuments = async (userId: string) => {
    const { data } = await this.serverClient
      .from("document_access_rights")
      .select(
        `
        documentId (
          *
        )
        `
      )
      .eq("userId", userId)
      .eq("accessType", AccessRight.Owner);

    return data;
  };
}
