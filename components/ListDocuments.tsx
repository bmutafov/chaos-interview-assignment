import { Document } from "@/types/document";
import { ActionIcon, Button, Table } from "@mantine/core";
import { IconFileSearch } from "@tabler/icons";

type ListDocumentProps = {
  documents: Document[];
};

export default function ListDocuments(props: ListDocumentProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Content...</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.documents.map((doc) => (
          <tr key={doc.id}>
            <td width="90%">{doc.content}</td>
            <td
              style={{
                display: "flex",
                "justifyContent": "flex-end",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ActionIcon variant="light" size="sm">
                <IconFileSearch />
              </ActionIcon>
              <Button color="cyan" variant="light" size="xs" uppercase compact>
                Preview
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
