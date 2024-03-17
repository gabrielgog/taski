/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { getTasks, addTasks } from "@/services/taskService";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import ProfileImage from "../../public/images/profile-image.avif";
import PlusIcon from "../../public/icons/plus-icon.svg";
import Avatar from "@/common/Avatar";
import Input from "@/common/Input";
import TaskList, { TaskListItem } from "@/components/TaskList";
import Modal from "@/common/Modal";

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

  const handleAddTasks = async () => {
    const data = {
        "title": "holla",
        "completed": false,
        "description": "some description"
    }

    await addTasks(data).then(() => {
        alert('success')
    
    }).catch((error: string) => {
        console.log(error, 'err');
        
    
    })
    

}

  //   console.log(tasks, "--tasks");

  //   console.log(process.env.NEXT_URL, "--env");

  console.log(search, "--search");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      !task.completed,
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
            You've got {filteredTasks.length} tasks to do.
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
        <TaskList tasks={filteredTasks} openModal={handleOpenModal}/>
      </div>

      <Modal isOpen={opnModal} onClose={handleCloseModal}>
        <div className="flex flex-col justify-center mx-4 gap-5 w-80">
          <Input value={""} placeholder="Task title"/>
          <textarea
            className="border-2 border-gray-300 bg-white h-20 px-5 py-5 rounded-lg text-sm focus:outline-none"
            placeholder="Description"
          />

          <select className="border-2 border-gray-300 bg-white h-10 px-5  pr-16 rounded-lg text-sm select select-bordered w-full max-w-xs">
            <option disabled selected>
              Who shot first?
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <button className="group relative h-12 overflow-hidden rounded-2xl bg-primary text-lg font-bold text-white" onClick={handleAddTasks}>
            Add task
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-10"></div>
          </button>
        </div>
      </Modal>
    </main>
  );
}
