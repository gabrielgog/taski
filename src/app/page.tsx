/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { getTasks } from "@/services/taskService";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import ProfileImage from "../../public/images/profile-image.avif";
import PlusIcon from "../../public/icons/plus-icon.svg";
import Avatar from "@/common/Avatar";
import Input from "@/common/Input";
import TaskList, { TaskListItem } from "@/components/TaskList";

export default function Home() {
  const [opnModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(!opnModal);
  };

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTasks();
      setTasks(fetchedTodos);
    };
    fetchTodos();
  }, []);

//   console.log(tasks, "--tasks");

  //   console.log(process.env.NEXT_URL, "--env");

  console.log(search, '--search');

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <main className="m-10 md:m-20">
      <div className="flex justify-between">
        <Image src={Logo} alt="taski-logo" />
        <Avatar name="John" image={ProfileImage.src} />
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <h1 className="text-2xl font-semibold text-dark">
            Welcome, <span className="text-primary">John.</span>
          </h1>
          <span className="text-slate-400 text-sm">
            You've got 7 tasks to do.
          </span>
        </div>
        <Input
          type="search"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center gap-2 mt-10">
        <button onClick={handleOpenModal}>
          <Image src={PlusIcon} alt="plus-icon" />
        </button>
        <span className="text-gray-600">Add a new task...</span>
      </div>

      <div className="mt-5">
        <TaskList tasks={filteredTasks} />
      </div>
    </main>
  );
}
