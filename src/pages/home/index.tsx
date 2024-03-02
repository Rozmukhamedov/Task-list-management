import classes from "./style.module.css";
import {
  Button,
  Container,
  Group,
  NativeSelect,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreateModalTask, TableTask } from "containers";
import React, { useState } from "react";
import { TaskType } from "types/global";

function Home() {
  const [data, setData] = useState<TaskType[]>([
    {
      id: 1,
      title: "Разработка нового функционала",
      description: "Добавить возможность загрузки файлов на сервер.",
      owner: "Иван Иванов",
      deadline: "2024-03-10",
      status: "взята в работу",
    },
    {
      id: 2,
      title: "Обновление интерфейса",
      description: "Изменить дизайн главной страницы.",
      owner: "Петр Петров",
      deadline: "2024-03-15",
      status: "готова к работе",
    },
    {
      id: 3,
      title: "Тестирование функционала",
      description: "Протестировать все новые функции.",
      owner: "Анна Сидорова",
      deadline: "2024-03-20",
      status: "готова к работе",
    },
    {
      id: 4,
      title: "Оптимизация кода",
      description: "Улучшить производительность приложения.",
      owner: "Михаил Козлов",
      deadline: "2024-03-18",
      status: "взята в работу",
    },
    {
      id: 5,
      title: "Написание документации",
      description: "Составить подробное руководство пользователя.",
      owner: "Елена Николаева",
      deadline: "2024-03-25",
      status: "готова к работе",
    },
  ]);

  const [filteredData, setFilteredData] = useState<TaskType[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // фильтр по статусу
  const filterDataByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (search.length > 0) {
      const filteredTasks = filteredData.filter(
        (task) => task.status === e.target.value
      );
      setStatus(e.target.value);
      setFilteredData(filteredTasks);
    }
    const filteredTasks = data.filter((task) => task.status === e.target.value);
    setStatus(e.target.value);
    setFilteredData(filteredTasks);
  };

  const filterTasksByTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (status.length > 0) {
      let newData = filteredData.filter((task) =>
        task.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredData(newData);
      return;
    }

    let newData = data.filter((task) =>
      task.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredData(newData);
  };

  const clearAllQuery = () => {
    setFilteredData([]);
    setStatus("");
    setSearch("");
  };

  return (
    <>
      <Container my={40} size={"xl"}>
        <Group justify="space-between">
          <Title style={{ fontWeight: 900 }}>My Tasks</Title>
          <Group>
            <TextInput
              value={search}
              placeholder="Search title"
              onChange={filterTasksByTitle}
            />
            <NativeSelect
              value={status}
              data={["", "готова к работе", "взята в работу", "выполнена"]}
              onChange={filterDataByStatus}
            />
            <Button variant="filled" onClick={clearAllQuery}>
              Clear
            </Button>
          </Group>
        </Group>

        {data.length > 0 ? (
          <>
            {status.length > 0 || search.length > 0 ? (
              <>
                {filteredData.length > 0 ? (
                  <TableTask
                    data={filteredData}
                    setData={setData}
                    setFilteredData={setFilteredData}
                  />
                ) : (
                  <Text size={"lg"} mt={"md"}>
                    You have no tasks
                  </Text>
                )}
              </>
            ) : (
              <TableTask
                data={data}
                setData={setData}
                setFilteredData={setFilteredData}
              />
            )}
          </>
        ) : (
          <Text size={"lg"} mt={"md"}>
            You have no tasks
          </Text>
        )}

        <Button onClick={open} fullWidth variant="filled" mt={"md"}>
          New Task
        </Button>
      </Container>

      <CreateModalTask opened={opened} close={close} setData={setData} />
    </>
  );
}

export default Home;
