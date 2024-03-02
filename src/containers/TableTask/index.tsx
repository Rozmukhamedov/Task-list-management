import { Button, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EditModalTask } from "containers";
import { useState } from "react";
import { TaskType } from "types/global";

type TableTask = {
  data: TaskType[];
  setData: any;
  setFilteredData: any;
};

export default function TableTask({
  data,
  setData,
  setFilteredData,
}: TableTask) {
  const [opened, { open, close }] = useDisclosure(false);
  const [choose, setChoose] = useState<TaskType>({
    id: 0,
    title: "",
    description: "",
    owner: "",
    deadline: "",
    status: "",
  });

  function deleteTaskById(id: number | string) {
    setData((values: TaskType[]) => values.filter((task) => task.id !== id));
    setFilteredData((values: TaskType[]) =>
      values.filter((task) => task.id !== id)
    );
  }

  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Text fz="sm">{row.title}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{row.description || "No description"}</Text>
        </Table.Td>
        <Table.Td>{row.deadline}</Table.Td>
        <Table.Td>
          <Text fz="sm">{row.owner}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{row.status}</Text>
        </Table.Td>
        <Table.Td>
          <Button
            variant="filled"
            color="orange"
            onClick={() => {
              open();
              setChoose(row);
            }}
          >
            Edit
          </Button>
        </Table.Td>
        <Table.Td>
          <Button
            variant="filled"
            color="red"
            onClick={() => deleteTaskById(row.id)}
          >
            Delete
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Deadline</Table.Th>
              <Table.Th>Owner</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <EditModalTask
        opened={opened}
        setData={setData}
        close={close}
        choose={choose}
        setChoose={setChoose}
      />
    </>
  );
}
