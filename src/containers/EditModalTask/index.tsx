import { FC, useEffect } from "react";
import {
  Button,
  Group,
  Modal,
  NativeSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { TaskType } from "types/global";
import moment from "moment";
import dayjs from "dayjs";

type EditModalTaskProps = {
  opened: boolean;
  close: () => void;
  setData: any;
  choose: any;
  setChoose: any;
};

type onSubmitType = {
  id: number;
  title: string;
  description: string;
  owner: string;
  deadline: any;
  status: string;
};

let statuses = ["готова к работе", "взята в работу", "выполнена"];

const EditModalTask: FC<EditModalTaskProps> = ({
  opened,
  close,
  setData,
  choose,
  setChoose,
}) => {
  const form: any = useForm({
    initialValues: {
      title: "",
      description: "",
      owner: "",
      deadline: null,
      status: "",
    },

    validate: {
      title: (value) => (value.length < 2 ? "Invalid title" : null),
      owner: (value) => (value.length < 2 ? "Invalid owner" : null),
      status: (value) => (value.length < 2 ? "Invalid status" : null),
    },
  });

  // save in form values
  useEffect(() => {
    if (choose.id != 0) {
      form.setFieldValue("id", choose.id);
      form.setFieldValue("title", choose.title);
      form.setFieldValue("description", choose.description);
      form.setFieldValue("owner", choose.owner);
      form.setFieldValue("deadline", dayjs(choose.deadline));

      let newStatus: any = statuses.filter((status) => status == choose.status);
      form.setFieldValue("status", newStatus[0]);
    }
  }, [choose.id]);

  const handleSubmit = (e: onSubmitType) => {
    setData((prev: TaskType[]) => {
      // нахожу по id и меняю
      let filteredList = prev.filter((item) => item.id != e.id);
      return [
        ...filteredList,
        {
          id: choose.id,
          description: e.description,
          owner: e.owner,
          status: e.status,
          title: e.title,
          deadline: moment(e.deadline).format("YYYY-MM-DD"),
        },
      ];
    });

    form.reset();
    close();
    setChoose({
      id: 0,
      title: "",
      description: "",
      owner: "",
      deadline: "",
      status: "",
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"md"}
      title={"Edit Task"}
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
        <DatePickerInput
          mt={"md"}
          defaultValue={form.values.deadline}
          label="Deadline"
          placeholder="Deadline"
          valueFormat="YYYY-MM-DD"
          {...form.getInputProps("deadline")}
        />
        <NativeSelect
          mt={"md"}
          label="Status"
          placeholder="Status"
          checkIconPosition="right"
          data={statuses}
          defaultValue={form.values.status}
          {...form.getInputProps("status")}
        />
        <Group mt={"md"} justify="flex-end">
          <Button type="button" onClick={close} variant={"subtle"}>
            Cancel
          </Button>
          <Button type="submit">Save Task</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditModalTask;
