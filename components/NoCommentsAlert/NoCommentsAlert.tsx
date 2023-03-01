import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";

const NoCommentsAlert: React.FC = () => {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      title="No comments yet"
      color="gray"
    >
      Be the first one to leave a comment by using the form above
    </Alert>
  );
};

export default NoCommentsAlert;
