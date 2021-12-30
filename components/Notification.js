import { useContext } from 'react';
import { Alert, AlertTitle } from '@mui/material';

import NotificationContext from '../store/notification-context';

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  return (
    <Alert
      sx={{ width: '100%' }}
      severity={status}
      onClose={notificationCtx.hideNotification}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}

export default Notification;
