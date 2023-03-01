import { createStyles, Text, Avatar, Group, Paper } from "@mantine/core";

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
}

export function ViewComment({ postedAt, body, author }: CommentSimpleProps) {
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
        {body}
      </Text>
    </Paper>
  );
}
