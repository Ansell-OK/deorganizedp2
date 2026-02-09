import React from 'react';
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Show, Event } from '../lib/api';

// Configure date-fns localizer
const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Custom event type that combines our Show/Event types with calendar requirements
export interface CalendarEvent extends BigCalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    type: 'show' | 'event';
    status?: 'draft' | 'published' | 'archived' | 'cancelled' | 'upcoming' | 'ongoing' | 'completed';
    resource?: Show | Event;
}

interface CalendarViewProps {
    shows: Show[];
    events: Event[];
    onSelectEvent?: (event: CalendarEvent) => void;
    onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
    shows,
    events,
    onSelectEvent,
    onSelectSlot,
}) => {
    // Convert shows and events to calendar events
    const calendarEvents: CalendarEvent[] = [
        ...shows.map((show): CalendarEvent => {
            const scheduledTime = show.scheduled_time
                ? new Date(show.scheduled_time)
                : new Date(); // Fallback to today if no time

            return {
                id: show.id,
                title: show.title,
                start: scheduledTime,
                end: new Date(scheduledTime.getTime() + 60 * 60 * 1000), // 1 hour duration
                type: 'show' as const,
                status: show.status,
                resource: show,
            };
        }),
        ...events.map((event): CalendarEvent => ({
            id: event.id,
            title: event.title,
            start: new Date(event.start_date),
            end: event.end_date ? new Date(event.end_date) : new Date(new Date(event.start_date).getTime() + 2 * 60 * 60 * 1000), // 2 hour default duration
            type: 'event' as const,
            status: event.status, // Now compatible
            resource: event,
        })),
    ];

    // Custom event styling based on type and status
    const eventStyleGetter = (event: CalendarEvent) => {
        let backgroundColor = '#6366f1'; // Default blue
        let borderColor = '#4f46e5';

        if (event.type === 'show') {
            switch (event.status) {
                case 'draft':
                    backgroundColor = '#9ca3af';
                    borderColor = '#6b7280';
                    break;
                case 'published':
                    backgroundColor = '#10b981';
                    borderColor = '#059669';
                    break;
                case 'archived':
                    backgroundColor = '#6b7280';
                    borderColor = '#4b5563';
                    break;
            }
        } else if (event.type === 'event') {
            switch (event.status) {
                case 'published': // Map published to blue (upcoming-ish)
                case 'upcoming':
                    backgroundColor = '#3b82f6';
                    borderColor = '#2563eb';
                    break;
                case 'ongoing':
                    backgroundColor = '#f59e0b';
                    borderColor = '#d97706';
                    break;
                case 'completed':
                    backgroundColor = '#8b5cf6';
                    borderColor = '#7c3aed';
                    break;
                case 'cancelled':
                    backgroundColor = '#ef4444';
                    borderColor = '#b91c1c';
                    break;
            }
        }

        return {
            style: {
                backgroundColor,
                borderColor,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '6px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                padding: '2px 6px',
            },
        };
    };

    return (
        <div className="calendar-container" style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable
                eventPropGetter={eventStyleGetter}
                views={['month', 'week', 'day']}
                defaultView="month"
                popup
                style={{ height: '100%' }}
                tooltipAccessor={(event) => {
                    const typeLabel = event.type === 'show' ? 'Show' : 'Event';
                    const statusLabel = event.status ? ` (${event.status})` : '';
                    return `${typeLabel}: ${event.title}${statusLabel}`;
                }}
            />

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-xs">
                <span className="font-bold text-inkLight">Legend:</span>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500 border-2 border-green-600"></div>
                    <span className="text-inkLight">Published Show</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-surface border-2 border-borderSubtle"></div>
                    <span className="text-inkLight">Draft Show</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500 border-2 border-blue-600"></div>
                    <span className="text-inkLight">Upcoming Event</span>
                </div>
            </div>
        </div>
    );
};


