import { AccessRight } from "@/types/access-rights";
import { Document } from "@/types/document";
import { Button, Checkbox, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons";
import React, { useEffect } from "react";
import {
  emailValidator,
  lengthValidator,
} from "../AddDocuments/AddDocument.utils";
import { insertDocumentAccessRight } from "./ShareDocument.api";

export type ShareDocumentForm = {
  userEmail: string;
  accessRights: string;
  anyone: boolean;
};

type AddDocumentProps = {
  document: Document;
  onSuccess: () => void;
};

const getSelectOptions = (isAnonymousShare: boolean) => {
  const readOption = { value: AccessRight.Read.toString(), label: "Read" };
  const commentOption = {
    value: AccessRight.Comment.toString(),
    label: "Read & comment",
  };

  if (isAnonymousShare) return [readOption];
  else return [readOption, commentOption];
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
      anyone: false,
    },
    validate: {
      userEmail: (value, values) =>
        !values.anyone ? emailValidator(value) : null,
    },
  });

  const { anyone: anyoneFormValue } = form.values;

  useEffect(() => {
    if (anyoneFormValue) {
      form.clearFieldError("userEmail");
    }
  }, [anyoneFormValue, form]);

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
          disabled={anyoneFormValue}
          {...form.getInputProps("userEmail")}
        />
        <Select
          label="Access right"
          placeholder="Select access rights"
          data={getSelectOptions(anyoneFormValue)}
          {...form.getInputProps("accessRights")}
        />
        <Flex align="center" justify="space-between">
          <Checkbox
            label="Anyone with the link"
            {...form.getInputProps("anyone")}
          />
          <Button type="submit" loading={isLoading}>
            Share
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
