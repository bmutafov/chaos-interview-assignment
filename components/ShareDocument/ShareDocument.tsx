import { AccessRight } from "@/types/access-rights";
import { Document } from "@/types/document";
import { Button, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons";
import React from "react";
import {
  emailValidator,
  lengthValidator,
} from "../AddDocuments/AddDocument.utils";
import { insertDocumentAccessRight } from "./ShareDocument.api";

export type ShareDocumentForm = {
  userEmail: string;
  accessRights: string;
};

type AddDocumentProps = {
  document: Document;
  onSuccess: () => void;
};

export default function ShareDocument({
  document,
  onSuccess,
}: AddDocumentProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ShareDocumentForm>({
    initialValues: {
      userEmail: "",
      accessRights: AccessRight.Read.toString(),
    },
    validate: {
      userEmail: emailValidator,
    },
  });

  const handleSubmit = async (formData: ShareDocumentForm) => {
    setIsLoading(true);

    const { id: documentId } = document;

    try {
      await insertDocumentAccessRight({ ...formData, documentId });
      onSuccess();
    } catch (err) {
      const error = err as Error;

      form.setFieldError("userEmail", error.message);
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap="sm">
        <TextInput
          label="User"
          placeholder="Enter user email..."
          icon={<IconAt size={14} />}
          {...form.getInputProps("userEmail")}
        />
        <Select
          label="Access right"
          placeholder="Select access rights"
          data={[
            { value: AccessRight.Read.toString(), label: "Read" },
            { value: AccessRight.Comment.toString(), label: "Read & comment" },
          ]}
          {...form.getInputProps("accessRights")}
        />
        <Button
          sx={{ alignSelf: "flex-end" }}
          type="submit"
          loading={isLoading}
        >
          Share
        </Button>
      </Flex>
    </form>
  );
}
