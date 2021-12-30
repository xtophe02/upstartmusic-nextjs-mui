import { Container } from '@mui/material';
import { useContext } from 'react';
import Navbar from './Navbar';
import Notification from './Notification';
import NotificationContext from '../store/notification-context';

export default function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <>
      <Navbar />
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <Container sx={{ paddingTop: '2rem' }}>{children}</Container>
    </>
  );
}
