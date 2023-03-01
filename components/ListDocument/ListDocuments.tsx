import { Document } from "@/types/document";
import { ActionIcon, Alert, Button, Table } from "@mantine/core";
import { IconAlertCircle, IconLink } from "@tabler/icons";
import ShareDocumentModal from "../ShareDocument/ShareDocumentModal";

type ListDocumentProps = {
  documents: Document[];
};

export default function ListDocuments(props: ListDocumentProps) {
  if (!props.documents.length) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="No documents yet"
        color="gray"
      >
        You have not uploaded documents yet. Please use the form above.
      </Alert>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Document title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.documents.map((doc) => (
          <tr key={doc.id}>
            <td width="90%">{doc.title}</td>
            <td
              style={{
                display: "flex",
                "justifyContent": "flex-end",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ShareDocumentModal document={doc} />
              <Button
                color="cyan"
                variant="light"
                size="xs"
                uppercase
                compact
                title="Preview document"
              >
                Preview
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
