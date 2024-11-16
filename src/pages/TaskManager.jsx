import React, { useState } from "react";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const TaskManager = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Generate calendar data
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];
  let week = Array(7).fill(null);

  days.forEach((day, index) => {
    const dayIndex = (firstDayOfMonth + index) % 7;
    week[dayIndex] = day;

    if (dayIndex === 6 || index === days.length - 1) {
      weeks.push([...week]);
      week = Array(7).fill(null);
    }
  });

  // Handle task creation
  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        date: selectedDate.toDateString(),
        completed: false,
      },
    ]);
    setNewTask({ title: "", description: "" });
    setIsModalOpen(false);
  };

  // Handle task deletion
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filter tasks by selected date
  const tasksForSelectedDate = tasks.filter(
    (task) => task.date === selectedDate.toDateString()
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-[#1E1E1E] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
                  )
                }
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
                  )
                }
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div key={day} className="text-gray-400 font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeks.flat().map((day, index) => (
              <button
                key={index}
                className={`h-10 rounded-full flex items-center justify-center transition-colors ${
                  day === selectedDate.getDate() &&
                  selectedDate.getMonth() === new Date().getMonth() &&
                  selectedDate.getFullYear() === new Date().getFullYear()
                    ? "bg-emerald-500 text-white"
                    : day
                    ? "hover:bg-gray-800"
                    : ""
                }`}
                disabled={!day}
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="bg-[#1E1E1E] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Tasks for {selectedDate.toDateString()}</h2>
          <div className="space-y-4">
            {tasksForSelectedDate.length > 0 ? (
              tasksForSelectedDate.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-[#121212] rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        setTasks(
                          tasks.map((t) =>
                            t.id === task.id ? { ...t, completed: !t.completed } : t
                          )
                        );
                      }}
                      className="w-5 h-5 rounded-md border-gray-600 text-emerald-500 focus:ring-emerald-500"
                    />
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-400">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No tasks for this date.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1E1E1E] rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Add Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#121212] rounded-md focus:outline-none text-white"
              />
              <textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-4 py-2 bg-[#121212] rounded-md focus:outline-none text-white"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
              >
                Add Task
              </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
