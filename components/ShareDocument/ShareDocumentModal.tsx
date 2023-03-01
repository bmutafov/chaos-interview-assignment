import { Document } from "@/types/document";
import { ActionIcon, Modal } from "@mantine/core";
import { IconLink } from "@tabler/icons";
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
        title="Share document"
        centered
      >
        <ShareDocument document={document} onSuccess={() => setOpened(false)} />
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
