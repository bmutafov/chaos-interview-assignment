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

type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type NonNullableSelection = NonNullableProperties<
  NonNullable<CommentSimpleProps["selection"]>
>;

const hasSelection = (
  selection: CommentSimpleProps["selection"]
): selection is NonNullableSelection => {
  if (!selection) return false;

  const { document, start, end } = selection;
  return Boolean(document && start && end);
};

export default function ViewComment({
  postedAt,
  body,
  author,
  selection,
}: CommentSimpleProps) {
  const { classes } = useStyles();

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
        {hasSelection(selection) && (
          <Paper withBorder p="sm">
            <Highlight
              highlight={selection.document.substring(
                selection.start,
                selection.end
              )}
            >
              {selection.document}
            </Highlight>
          </Paper>
        )}
        {body}
      </Text>
    </Paper>
  );
}
