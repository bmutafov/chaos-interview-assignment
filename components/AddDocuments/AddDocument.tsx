import { Document } from "@/types/document";
import { Button, Textarea, Title, Flex, TextInput, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { insertDocument } from "./AddDocument.api";
import { lengthValidator } from "./AddDocument.utils";

export type DocumentForm = {
  document: string;
  title: string;
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
      title: "",
    },
    validate: {
      document: lengthValidator(3),
      title: lengthValidator(3),
    },
  });

  const handleSubmit = async (formData: DocumentForm) => {
    setIsLoading(true);
    const document = await insertDocument({ ...formData, userId: user!.id });
    if (document) {
      onDocumentAdded(document);
      form.reset();
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Paper my="xl" p="md" withBorder>
        <Title order={3}>New document</Title>
        <TextInput
          placeholder="Enter title..."
          label="Document title"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <Textarea
          mt="lg"
          placeholder="Type your document here..."
          radius="md"
          size="md"
          withAsterisk
          styles={{ input: { height: "500px" } }}
          {...form.getInputProps("document")}
        />
        <Flex
          gap="sm"
          justify="flex-end"
          align="center"
          direction="row"
          wrap="wrap"
          mt="md"
        >
          <Button type="submit" loading={isLoading}>
            Add document
          </Button>
        </Flex>
      </Paper>
    </form>
  );
}
