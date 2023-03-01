import {
  createStyles,
  Text,
  Avatar,
  Group,
  Paper,
  Highlight,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
}));

interface CommentSimpleProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    initials: string;
  };
  selection: {
    document: string | null;
    start: number | null;
    end: number | null;
  } | null;
}

export function ViewComment({
  postedAt,
  body,
  author,
  selection,
}: CommentSimpleProps) {
  const { classes } = useStyles();

  const showQuotedText =
    selection && selection.document && selection.start && selection.end;

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar alt={author.name} radius="xl">
          {author.initials}
        </Avatar>
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {showQuotedText && (
          <Paper withBorder p="sm">
            <Highlight
              highlight={selection.document!.substring(
                selection.start!,
                selection.end!
              )}
            >
              {selection.document!}
            </Highlight>
          </Paper>
        )}
        {body}
      </Text>
    </Paper>
  );
}
