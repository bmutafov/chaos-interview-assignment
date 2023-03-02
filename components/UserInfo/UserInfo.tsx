import { Database } from "@/types/supabase";
import { Flex, Button } from "@mantine/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <Flex justify="space-between" mt="xl">
      <div>
        Logged in as <b>{user.email}</b>
      </div>
      <Button variant="outline" color="red" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default UserInfo;
