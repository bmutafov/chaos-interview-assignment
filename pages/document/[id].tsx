import AddComment from "@/components/AddComment/AddComment";
import { ViewComment } from "@/components/ViewComment/ViewComment";
import { AccessRight } from "@/types/access-rights";
import { Document, Comment } from "@/types/document";
import { getTimeBetween } from "@/utils/date-formatter";
import { REDIRECT_HOME } from "@/utils/next-serverside-utils";
import { SupabaseServerClient } from "@/utils/supabase.client";
import { Alert, Container, Flex, Highlight, Paper, Title } from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { IconAlertCircle } from "@tabler/icons";
import { GetServerSidePropsContext } from "next";
import React from "react";

type CommentWithUser = Comment & { user: { email: string } };
type DocumentPreviewProps = {
  document: Document;
  comments: CommentWithUser[];
  accessRight: AccessRight;
};

export default function DocumentPreview({
  document,
  comments: commentsProps,
  accessRight,
}: DocumentPreviewProps) {
  const user = useUser();

  const [comments, setComments] = React.useState(commentsProps);

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [
      {
        ...comment,
        user: {
          email: user!.email as string,
        },
      },
      ...prev,
    ]);
  };

  return (
    <Container>
      <Title order={1} my="md">
        {document.title}
      </Title>
      <Paper withBorder p="xl">
        {document.content}
      </Paper>
      <AddComment
        canAdd={[AccessRight.Owner, AccessRight.Comment].includes(accessRight)}
        document={document}
        onCommentAdded={handleAddComment}
      />
      <Title order={5} mb="md">
        User comments ({comments.length})
      </Title>
      <Flex direction="column" gap="md" mb="xl">
        {!comments.length && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="No comments yet"
            color="gray"
          >
            Be the first one to leave a comment by using the form above
          </Alert>
        )}
        {comments.reverse().map((comment) => (
          <ViewComment
            key={comment.id}
            author={{
              name: comment.user.email,
              initials: comment.user.email.charAt(0).toUpperCase(),
            }}
            body={comment.content || ""}
            postedAt={
              comment.created_at
                ? getTimeBetween(new Date(comment.created_at), new Date())
                : "unknown"
            }
            selection={
              comment.selectionStart && comment.selectionEnd
                ? {
                    document: document.content,
                    start: comment.selectionStart,
                    end: comment.selectionEnd,
                  }
                : null
            }
          />
        ))}
      </Flex>
    </Container>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const serverClient = new SupabaseServerClient(ctx);
  const session = await serverClient.getSession();
  const userId = session?.user.id;
  const documentId = ctx.params?.id;

  if (!userId || !documentId || Array.isArray(documentId)) {
    return REDIRECT_HOME;
  }

  const documentData = await serverClient.getSingleDocument(userId, documentId);
  if (!documentData) return REDIRECT_HOME;

  const comments = await serverClient.getComments(documentId);

  return {
    props: {
      document: documentData.document,
      comments,
      accessRight: documentData.accessType,
    } as DocumentPreviewProps,
  };
};
