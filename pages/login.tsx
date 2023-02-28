import { Auth } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { Database } from "@/types/supabase";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("test").select("*");
      setData(data as any);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  if (!user)
    return (
      <div className={styles.loginContainer}>
        <Auth
          redirectTo="http://localhost:3000/"
          supabaseClient={supabaseClient}
          providers={["google", "github"]}
          socialLayout="horizontal"
        />
      </div>
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
