import { Auth } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  if (!user)
    return (
      <div className={styles.loginContainer}>
        <Auth
          redirectTo="http://localhost:3000/"
          supabaseClient={supabaseClient}
          socialLayout="horizontal"
        />
      </div>
    );

  return null;
};

export default LoginPage;
