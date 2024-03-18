/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { getTasks, addTasks } from "@/services/taskService";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import ProfileImage from "../../public/images/profile-image.avif";
import PlusIcon from "../../public/icons/plus-icon.svg";
import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import TaskList, { TaskListItem } from "@/components/TaskList";
import Modal from "@/components/common/Modal";
import SelectDropdown from "@/components/common/Select";
import { checkCompletion } from "@/utils/checkBoolean";

interface AddTaskType {
  title: string;
  description: string;
  status: string;
}


export default function Home() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddTaskType>();

  const [data, setData] = useState({
    openModal: false,
    loading: false,
    tasks: [],
    search: "",
  });

  const handleDataUpdate = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseModal = () => {
    setData((prev) => ({
      ...prev,
      openModal: false,
    }));
    reset();
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTasks();
      handleDataUpdate("tasks", fetchedTodos);
    };
    fetchTodos();
  }, []);

  const handleAddTasks = async (data: AddTaskType) => {
    const payload = {
      title: data.title,
      completed: checkCompletion(data.status),
      description: data.description,
    };

    handleDataUpdate("loading", true);
    try {
      const newTask = await addTasks(payload);
      const newId = Math.floor(Math.random() * 1000);
      const updatedTask = { ...newTask, id: newId };
      setData((prevState) => ({
        ...prevState,
        tasks: [updatedTask, ...prevState.tasks],
        openModal: false,
      }));

      toast.success("Successfully added a task");
      handleDataUpdate("loading", false);
      reset();
    } catch (error) {
      toast.error("An error occurred");
      handleDataUpdate("loading", false);

    }
  };

  const filteredTasks = data.tasks.filter(
    (task: TaskListItem) =>
      task?.title.toLowerCase().includes(data?.search?.toLowerCase()) &&
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
          value={data.search}
          onChange={(e) => handleDataUpdate("search", e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center gap-2 mt-10">
        <button onClick={() => handleDataUpdate("openModal", true)}>
          <Image src={PlusIcon} alt="plus-icon" />
        </button>
        <span className="text-gray-600">Add a new task...</span>
      </div>

      <div className="mt-5">
        <TaskList
          tasks={filteredTasks}
          openModal={() => handleDataUpdate("openModal", true)}
        />
      </div>

      <Modal isOpen={data.openModal} onClose={handleCloseModal}>
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
            className="group relative h-12 overflow-hidden rounded-2xl bg-primary text-lg font-bold text-white duration-200 hover:opacity-80"
            onClick={handleSubmit(handleAddTasks)}
          >
            {data.loading ? "loading..." : "Add task"}
          </button>
        </div>
      </Modal>
    </main>
  );
}
