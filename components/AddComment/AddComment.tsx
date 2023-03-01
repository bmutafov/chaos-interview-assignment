import { Comment, Document } from "@/types/document";
import {
  Paper,
  Title,
  TextInput,
  Textarea,
  Flex,
  Button,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTextSelection } from "@mantine/hooks";
import { useUser } from "@supabase/auth-helpers-react";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";
import { insertDocument } from "../AddDocuments/AddDocument.api";
import { lengthValidator } from "../AddDocuments/AddDocument.utils";
import { insertComment } from "./AddComment.api";

export type CommentForm = {
  comment: string;
};

type AddCommentProps = {
  canAdd: boolean;
  document: Document;
  onCommentAdded: (comment: Comment) => void;
};

export default function AddComment({
  canAdd,
  document,
  onCommentAdded,
}: AddCommentProps) {
  const user = useUser();
  const selection = useTextSelection();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<CommentForm>({
    initialValues: {
      comment: "",
    },
    validate: {
      comment: lengthValidator(3),
    },
  });

  const getSelectedText = () => {
    const selectedText = selection?.toString();
    if (selectedText && document.content?.includes(selectedText)) {
      const selectionStart = document.content.indexOf(selectedText);
      const selectionEnd = selectionStart + selectedText.length;
      return {
        selectionStart,
        selectionEnd,
      };
    }
    return {
      selectionStart: null,
      selectionEnd: null,
    };
  };

  const handleSubmit = async (formData: CommentForm) => {
    setIsLoading(true);
    const newComment = await insertComment({
      userId: user!.id,
      documentId: document.id,
      comment: formData.comment,
      ...getSelectedText(),
    });
    if (newComment) {
      onCommentAdded(newComment as Comment);
      form.reset();
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Paper my="xl" p="md" withBorder>
        <Title order={3}>Add Comment</Title>
        {!canAdd ? (
          <Alert
            mt="md"
            icon={<IconAlertCircle size={16} />}
            title="Restricted"
            color="orange"
          >
            Unfortunately, the document owner has not given you access to add
            new comments.
          </Alert>
        ) : (
          <>
            <Textarea
              mt="md"
              placeholder="Type your comment here..."
              radius="md"
              size="md"
              withAsterisk
              styles={{ input: { height: "200px" } }}
              {...form.getInputProps("comment")}
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
                Add comment
              </Button>
            </Flex>
          </>
        )}
      </Paper>
    </form>
  );
}
