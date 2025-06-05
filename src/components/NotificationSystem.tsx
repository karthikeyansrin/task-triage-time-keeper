
import React, { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationSystem = ({ notifications }) => {
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Alert 
          key={notification.id} 
          variant={notification.type === 'overdue' ? 'destructive' : 'default'}
          className="relative animate-fade-in"
        >
          <AlertTitle className="flex items-center justify-between">
            {notification.title}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => notification.onDismiss?.(notification.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default NotificationSystem;
