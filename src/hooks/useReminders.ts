import { useState, useEffect, useCallback } from 'react';

export function useReminders() {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ewoche_reminders_enabled') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const enableReminders = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      alert('Dein Browser unterstützt leider keine direkten Web-Benachrichtigungen. Nutze stattdessen den Kalenderexport (.ics), dieser enthält bereits 10-Minuten-Vorab-Erinnerungen für Apple- und Google-Kalender!');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        setIsEnabled(true);
        localStorage.setItem('ewoche_reminders_enabled', 'true');

        // Send confirmation test notification
        new Notification('🔔 FaRaFIN E-Woche: Erinnerungen aktiv!', {
          body: 'Perfekt! Du erhältst Benachrichtigungen vor deinen Einsätzen. Bitte immer 10 Minuten vor offiziellem Beginn am Treffort sein.',
          icon: '/app_icon_farafin.png',
          badge: '/app_icon_farafin.png'
        });

        return true;
      } else {
        setIsEnabled(false);
        localStorage.setItem('ewoche_reminders_enabled', 'false');
        return false;
      }
    } catch (e) {
      console.error('Error requesting notification permission:', e);
      return false;
    }
  }, []);

  const disableReminders = useCallback(() => {
    setIsEnabled(false);
    try {
      localStorage.setItem('ewoche_reminders_enabled', 'false');
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    isSupported,
    permission,
    isEnabled,
    enableReminders,
    disableReminders
  };
}
