import React, { useState, useEffect } from 'react';

export default function StatusBadge({ dark = false }) {
  const [statusInfo, setStatusInfo] = useState({
    isOpen: false,
    statusText: 'Checking Hours...',
    subText: ''
  });

  useEffect(() => {
    function calculateStatus() {
      try {
        const now = new Date();
        const options = {
          timeZone: 'America/Chicago',
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          weekday: 'short'
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);

        let weekday = '';
        let hour = 0;
        let minute = 0;

        parts.forEach(p => {
          if (p.type === 'weekday') weekday = p.value;
          if (p.type === 'hour') hour = parseInt(p.value, 10);
          if (p.type === 'minute') minute = parseInt(p.value, 10);
        });

        const currentMinutes = hour * 60 + minute;
        const openMinutes = 9 * 60;   // 9:00 AM
        const closeMinutes = 19 * 60; // 7:00 PM

        if (weekday === 'Sun') {
          setStatusInfo({
            isOpen: false,
            statusText: 'Closed Today',
            subText: 'Opens Mon 9:00 AM'
          });
        } else {
          if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
            setStatusInfo({
              isOpen: true,
              statusText: 'Open Now',
              subText: 'Closes 7:00 PM'
            });
          } else if (currentMinutes < openMinutes) {
            setStatusInfo({
              isOpen: false,
              statusText: 'Closed',
              subText: 'Opens today 9:00 AM'
            });
          } else {
            const nextDay = weekday === 'Sat' ? 'Mon' : 'tomorrow';
            setStatusInfo({
              isOpen: false,
              statusText: 'Closed for the Day',
              subText: `Opens ${nextDay} 9:00 AM`
            });
          }
        }
      } catch {
        setStatusInfo({
          isOpen: true,
          statusText: 'Open',
          subText: 'Mon-Sat 9AM-7PM'
        });
      }
    }

    calculateStatus();
    const interval = setInterval(calculateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (dark) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
        statusInfo.isOpen
          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
          : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
      }`}>
        <span className={`w-2 h-2 rounded-full ${
          statusInfo.isOpen ? 'bg-emerald-400 status-indicator-dot' : 'bg-amber-400'
        }`} />
        <span>
          <strong className="font-semibold">{statusInfo.statusText}</strong>
          {statusInfo.subText && <span className="opacity-80"> • {statusInfo.subText}</span>}
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
      statusInfo.isOpen
        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
        : 'bg-amber-50 text-amber-900 border-amber-200'
    }`}>
      <span className={`w-2 h-2 rounded-full ${
        statusInfo.isOpen ? 'bg-emerald-500 status-indicator-dot' : 'bg-amber-500'
      }`} />
      <span>
        <strong className="font-semibold">{statusInfo.statusText}</strong>
        {statusInfo.subText && <span className="text-slate-600"> • {statusInfo.subText}</span>}
      </span>
    </div>
  );
}
