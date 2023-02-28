import { Database } from "@/types/supabase";
import {
  createServerSupabaseClient,
  Session,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

type Props = {
  initialSession: Session;
  user: User;
};

//TODO: FIX Types any
export default function Profile({ user }: { user: User }) {
  console.log("🚩 ~ user:", user);
  return <div>Logged in!, {user.email}</div>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient<Database>(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    } as Props,
  };
};
