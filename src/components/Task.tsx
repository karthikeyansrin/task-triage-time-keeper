
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Task = ({ task, onEdit, onDelete, onToggle }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const isCritical = task.priority === 'high' && !task.completed;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className={`transition-all duration-200 ${
      task.completed 
        ? 'opacity-60 bg-muted/50' 
        : isOverdue 
          ? 'border-destructive bg-destructive/5' 
          : isCritical 
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20' 
            : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-0.5"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className={`font-medium ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                {task.priority} priority
              </Badge>
              
              {task.dueDate && (
                <Badge variant={isOverdue ? 'destructive' : 'outline'} className="text-xs">
                  Due: {formatDate(task.dueDate)}
                </Badge>
              )}
              
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
