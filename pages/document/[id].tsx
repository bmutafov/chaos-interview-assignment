import AddComment from "@/components/AddComment";
import NoCommentsAlert from "@/components/NoCommentsAlert";
import ViewComment from "@/components/ViewComment";
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
    const newComment = {
      ...comment,
      user: {
        email: user!.email as string,
      },
    } as CommentWithUser;

    setComments((prev) => [newComment, ...prev]);
  };

  const getTimeLabel = (createdAt: string | null) =>
    createdAt ? getTimeBetween(new Date(createdAt), new Date()) : "unknown";

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
        {!comments.length && <NoCommentsAlert />}
        {comments.map((comment) => (
          <ViewComment
            key={comment.id}
            author={{
              name: comment.user.email,
              initials: comment.user.email.charAt(0).toUpperCase(),
            }}
            body={comment.content || ""}
            postedAt={getTimeLabel(comment.created_at)}
            selection={{
              document: document.content,
              start: comment.selectionStart,
              end: comment.selectionEnd,
            }}
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
      comments: comments?.reverse(),
      accessRight: documentData.accessType,
    } as DocumentPreviewProps,
  };
};
