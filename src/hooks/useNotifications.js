
import { useState, useCallback } from 'react';

export const useNotifications = (tasks) => {
  const [notifications, setNotifications] = useState([]);

  const showBrowserNotification = (title, message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico',
      });
    }
  };

  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      ...notification,
      id,
      onDismiss: (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
      }
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Show browser notification
    showBrowserNotification(notification.title, notification.message);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const checkOverdueTasks = useCallback(() => {
    const now = new Date();
    const today = now.toDateString();
    
    tasks.forEach(task => {
      if (task.completed) return;
      
      const dueDate = new Date(task.dueDate);
      const isOverdue = dueDate < now;
      const isDueToday = dueDate.toDateString() === today;
      const isCritical = task.priority === 'high';
      
      // Check if we've already notified about this task today
      const notificationKey = `notified_${task.id}_${today}`;
      const hasBeenNotified = localStorage.getItem(notificationKey);
      
      if (!hasBeenNotified) {
        if (isOverdue) {
          addNotification({
            type: 'overdue',
            title: 'Overdue Task!',
            message: `"${task.title}" is overdue. Please complete it soon.`,
          });
          localStorage.setItem(notificationKey, 'true');
        } else if (isDueToday && isCritical) {
          addNotification({
            type: 'critical',
            title: 'Critical Task Due Today!',
            message: `High priority task "${task.title}" is due today.`,
          });
          localStorage.setItem(notificationKey, 'true');
        }
      }
    });
  }, [tasks]);

  return {
    notifications,
    checkOverdueTasks,
  };
};
