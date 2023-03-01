import { Document } from "@/types/document";
import { ActionIcon, Button, Group, Modal, TextInput } from "@mantine/core";
import { IconAt, IconLink } from "@tabler/icons";
import { useState } from "react";
import ShareDocument from "./ShareDocument";

type ShareDocumentModalProps = {
  document: Document;
};

export default function ShareDocumentModal({
  document,
}: ShareDocumentModalProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        centered
      >
        <ShareDocument document={document} />
      </Modal>

      <ActionIcon
        variant="light"
        size="sm"
        title="Share"
        onClick={() => setOpened(true)}
      >
        <IconLink />
      </ActionIcon>
    </>
  );
}
