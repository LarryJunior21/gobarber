import React, { useState, useEffect, useMemo } from 'react';

import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

import api from '~/services/api';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function _handleVisible() {
    setVisible(!visible);
  }

  async function _handleRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={_handleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#10acdd" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.length === 0 ? (
            <h3>Não há nada por aqui ainda ;)</h3>
          ) : (
            <>
              {notifications.map(notification => (
                <Notification unread={!notification.read}>
                  <p>{notification.content}</p>
                  <time>{notification.timeDistance}</time>
                  {!notification.read && (
                    <button
                      type="button"
                      onClick={() => _handleRead(notification._id)}
                    >
                      Marcar como lida
                    </button>
                  )}
                </Notification>
              ))}
            </>
          )}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
