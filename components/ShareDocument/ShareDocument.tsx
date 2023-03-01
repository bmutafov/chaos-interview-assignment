import { Document } from "@/types/document";
import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons";
import {
  emailValidator,
  lengthValidator,
} from "../AddDocuments/AddDocument.utils";
import { insertDocumentAccessRight } from "./ShareDocument.api";

export type ShareDocumentForm = {
  userEmail: string;
};

type AddDocumentProps = {
  document: Document;
};

export default function ShareDocument({ document }: AddDocumentProps) {
  const form = useForm<ShareDocumentForm>({
    initialValues: {
      userEmail: "",
    },
    validate: {
      userEmail: emailValidator,
    },
  });

  const handleSubmit = async (formData: ShareDocumentForm) => {
    console.log(formData);
    try {
      await insertDocumentAccessRight({ ...formData, documentId: document.id });
    } catch (err) {
      form.setFieldError("userEmail", (err as Error).message);
      console.error("ERROR", err);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap="sm">
        <TextInput
          label="Share with"
          placeholder="Enter user email..."
          icon={<IconAt size={14} />}
          {...form.getInputProps("userEmail")}
        />
        <Button sx={{ alignSelf: "flex-end" }} type="submit">
          Share
        </Button>
      </Flex>
    </form>
  );
}
