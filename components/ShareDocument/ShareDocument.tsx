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
};

export default function ShareDocument({ document }: AddDocumentProps) {
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
    try {
      await insertDocumentAccessRight({ ...formData, documentId: document.id });
    } catch (err) {
      form.setFieldError("userEmail", (err as Error).message);
      console.error("ERROR", err);
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
