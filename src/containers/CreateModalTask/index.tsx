import { FC } from "react";
import {
  Button,
  Group,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import { TaskType } from "types/global";
import moment from "moment";

type CreateModalTaskProps = {
  opened: boolean;
  close: () => void;
  setData: any;
};

type onSubmitType = {
  title: string;
  description: string;
  owner: string;
  deadline: string;
  status: string;
};

const CreateModalTask: FC<CreateModalTaskProps> = ({
  opened,
  close,
  setData,
}) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      owner: "",
      deadline: "",
      status: "",
    },

    validate: {
      title: (value) => (value.length < 2 ? "Invalid title" : null),
      owner: (value) => (value.length < 2 ? "Invalid owner" : null),
      deadline: (value) => (value.length < 2 ? "Invalid deadline" : null),
      status: (value) => (value.length < 2 ? "Invalid status" : null),
    },
  });

  const handleSubmit = (e: onSubmitType) => {
    let uuid1 = uuidv4();

    setData((prev: TaskType[]) => [
      ...prev,
      {
        id: uuid1,
        description: e.description,
        owner: e.owner,
        status: e.status,
        title: e.title,
        deadline: moment(e.deadline).format("YYYY-MM-DD"),
      },
    ]);

    form.reset();
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"md"}
      title={"New Task"}
      withCloseButton={false}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt={"md"}
          placeholder={"Title"}
          label={"Title"}
          {...form.getInputProps("title")}
        />
        <Textarea
          mt={"md"}
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />
        <TextInput
          mt={"md"}
          placeholder={"Onwer Name"}
          label={"Onwer Name"}
          {...form.getInputProps("owner")}
        />
        <DateInput
          mt={"md"}
          valueFormat="YYYY-MM-DD"
          label="Deadline"
          placeholder="Deadline"
          {...form.getInputProps("deadline")}
        />
        <Select
          mt={"md"}
          label="Status"
          placeholder="Status"
          checkIconPosition="right"
          data={["готова к работе", "взята в работу", "выполнена"]}
          {...form.getInputProps("status")}
        />
        <Group mt={"md"} justify="flex-end">
          <Button type="button" onClick={close} variant={"subtle"}>
            Cancel
          </Button>
          <Button type="submit">Create Task</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateModalTask;
