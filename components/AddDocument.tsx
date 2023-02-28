import { Document } from "@/types/document";
import { supabaseClient } from "@/utils/supabase.client";
import { Button, Textarea, Title, Container, Paper, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import styles from "./AddDocument.module.scss";

type DocumentForm = {
  document: string;
};

type AddDocumentProps = {
  onDocumentAdded: (document: Document) => void;
};

export default function AddDocument({ onDocumentAdded }: AddDocumentProps) {
  const user = useUser();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<DocumentForm>({
    initialValues: {
      document: "",
    },
    validate: {
      document: (value) =>
        value.length > 3
          ? null
          : "Documents must be at least 3 characters long",
    },
  });

  const handleSubmit = async (formData: DocumentForm) => {
    setIsLoading(true);
    const documentsResponse = await supabaseClient
      .from("document")
      .insert({ content: formData.document })
      .select();

    if (!documentsResponse.data) {
      console.error("No documentId returned upon insertion");
      return;
    }
    const document = documentsResponse.data[0];

    const accessRightsResponse = await supabaseClient
      .from("document_access_rights")
      .insert({ userId: user!.id, accessTypeId: 0, documentId: document.id });

    if (
      documentsResponse.status === 201 &&
      accessRightsResponse.status === 201
    ) {
      onDocumentAdded(document);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={3}>New document</Title>
      <Textarea
        mt="lg"
        placeholder="Type your document here..."
        radius="md"
        size="md"
        withAsterisk
        classNames={{ wrapper: styles.shadow }}
        {...form.getInputProps("document")}
      />
      <Flex
        gap="sm"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
        mt="lg"
      >
        <Button type="submit" loading={isLoading}>
          Add document
        </Button>
      </Flex>
    </form>
  );
}
