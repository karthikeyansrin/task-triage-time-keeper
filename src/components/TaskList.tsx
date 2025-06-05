
import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No tasks yet. Add your first task to get started!</p>
      </div>
    );
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {activeTasks.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg">Active Tasks</h3>
          <div className="space-y-2">
            {activeTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg text-muted-foreground">
            Completed Tasks
          </h3>
          <div className="space-y-2">
            {completedTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
