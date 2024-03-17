/* eslint-disable react/no-unescaped-entities */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { getTasks, addTasks } from "@/services/taskService";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import ProfileImage from "../../public/images/profile-image.avif";
import PlusIcon from "../../public/icons/plus-icon.svg";
import Avatar from "@/common/Avatar";
import Input from "@/common/Input";
import TaskList, { TaskListItem } from "@/components/TaskList";
import Modal from "@/common/Modal";
import SelectDropdown from "@/common/Select";
import { checkCompletion } from "@/utils/checkBoolean";

interface AddTaskType {
  title: string;
  description: string;
  status: string;
}

export default function Home() {
  const [opnModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [search, setSearch] = useState<string>("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddTaskType>();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(!opnModal);
    reset()
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

  const handleAddTasks = async (data: AddTaskType) => {
    const payload = {
      title: data.title,
      completed: checkCompletion(data.status),
      description: data.description,
    };
  
    setLoading(true);
    await addTasks(payload)
      .then((newTask) => {
        toast.success("Successfully added a task");
        setLoading(false);
        reset()
        setTasks((prevTasks) => [newTask, ...prevTasks]);
        handleCloseModal();
      })
      .catch((error: string) => {
        console.log(error, "err");
      });
  };
  

  //   console.log(tasks, "--tasks");

  //   console.log(process.env.NEXT_URL, "--env");

  console.log(search, "--search");

  const filteredTasks = tasks.filter(
    (task) =>
      task?.title.toLowerCase().includes(search.toLowerCase()) &&
      !task.completed,
  );

  return (
    <main className="m-10 md:m-20">
      <ToastContainer />
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
        <TaskList tasks={filteredTasks} openModal={handleOpenModal} />
      </div>

      <Modal isOpen={opnModal} onClose={handleCloseModal}>
        <div className="flex flex-col justify-center mx-4 gap-5 w-80">
          <Controller
            name="title"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  type="text"
                  placeholder="Title"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.title}
                />
                {errors.title?.type === "required" && (
                  <span className="error text-sm text-red-600">
                    Field is required
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="description"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <div className="w-full flex flex-col gap-1">
                <textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="border-2 border-gray-300 bg-white h-20 px-5 py-5 rounded-lg text-sm focus:outline-none"
                  placeholder="Description"
                />
                {errors.description?.type === "required" && (
                  <span className="text-sm text-red-600">
                    Field is required
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="status"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <div>
                <SelectDropdown
                  value={field.value}
                  onSelect={(selectedOption: string) =>
                    field.onChange(selectedOption)
                  }
                  options={["Completed", "Not-completed"]}
                />
                {errors.status?.type === "required" && (
                  <span className="text-sm text-red-600">
                    Field is required
                  </span>
                )}
              </div>
            )}
          />

          <button
            className="group relative h-12 overflow-hidden rounded-2xl bg-primary text-lg font-bold text-white"
            onClick={handleSubmit(handleAddTasks)}
          >
            {loading ? "loading..." : "Add task"}

            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-10"></div>
          </button>
        </div>
      </Modal>
    </main>
  );
}
