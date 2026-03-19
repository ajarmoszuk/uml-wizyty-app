import { useState, useEffect } from 'react'

/**
 * Offline / maintenance window / connection-reset detection for top-of-app banners.
 */
export function useSystemBanners() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [offlineDismissed, setOfflineDismissed] = useState(false)
  const [maintenanceDismissed, setMaintenanceDismissed] = useState(false)
  const [connectionReset, setConnectionReset] = useState(false)

  useEffect(() => {
    const goOffline = () => { setIsOffline(true); setOfflineDismissed(false) }
    const goOnline = () => setIsOffline(false)
    const onReset = () => { setConnectionReset(true) }
    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    window.addEventListener('uml:connectionreset', onReset)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
      window.removeEventListener('uml:connectionreset', onReset)
    }
  }, [])

  const hour = new Date().getHours()
  const isTimeWindow = hour >= 0 && hour < 3
  const isMaintenance = isTimeWindow || connectionReset

  return {
    showOffline: isOffline && !offlineDismissed,
    showMaintenance: !isOffline && isMaintenance && !maintenanceDismissed,
    isConnectionReset: connectionReset && !isTimeWindow,
    dismissOffline: () => setOfflineDismissed(true),
    dismissMaintenance: () => setMaintenanceDismissed(true),
  }
}
