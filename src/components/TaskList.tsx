import React from "react";
import { Task } from "./TaskForm";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  filter: "all" | "completed" | "incomplete";
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onComplete, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  return (
    <div>
      <h2>Tasks ({filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)})</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={3} className="no-tasks">No tasks available</td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.text}</td>
                <td className={task.completed ? "completed" : "incomplete"}>
                  {task.completed ? "Completed" : "Incomplete"}
                </td>
                <td>
                  {!task.completed && <button onClick={() => onComplete(task.id)}>Complete</button>}
                  <button onClick={() => onDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
