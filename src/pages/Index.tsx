
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import NotificationSystem from '@/components/NotificationSystem';
import { useTasks } from '@/hooks/useTasks';
import { useNotifications } from '@/hooks/useNotifications';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const { notifications, checkOverdueTasks } = useNotifications(tasks);

  useEffect(() => {
    checkOverdueTasks();
  }, [tasks, checkOverdueTasks]);

  const handleAddTask = (taskData) => {
    addTask(taskData);
    setIsFormOpen(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleUpdateTask = (taskData) => {
    updateTask(editingTask.id, taskData);
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleToggleTask = (taskId) => {
    toggleTask(taskId);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <NotificationSystem notifications={notifications} />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Task Manager</h1>
          <p className="text-muted-foreground">
            Stay organized and manage your tasks efficiently
          </p>
        </div>

        <div className="grid gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Your Tasks</CardTitle>
              <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="text-sm text-muted-foreground">
                  Total: {totalTasks}
                </div>
                <div className="text-sm text-muted-foreground">
                  Completed: {completedTasks}
                </div>
                <div className="text-sm text-muted-foreground">
                  Remaining: {totalTasks - completedTasks}
                </div>
              </div>
              
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            </CardContent>
          </Card>
        </div>

        {isFormOpen && (
          <TaskForm
            task={editingTask}
            onSave={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
