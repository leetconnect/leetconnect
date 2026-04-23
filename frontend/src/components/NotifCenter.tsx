import { useNotifications } from '../context/NotifProvider';
import type { ChatNotif } from '../lib/api';

export default function NotifCenter({onClose}: {onClose: () => void}) {
	const context = useNotifications();
	if (!context)
		return null;
	const {notifs, unread, markRead, markAllRead} = context;

	return (
		<>
			<div className="fixed inset-0 z-40" onClick={onClose} />
			<div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto
							bg-background border border-border rounded-md shadow-lg z-50">
				<div className="flex items-center justify-between px-4 py-3 border-b border-border">
					<span className="font-semibold">Notifications</span>
					{unread > 0 && (
						<button onClick={markAllRead}
								className="text-xs text-muted-foreground hover:text-foreground">
							Mark all read
						</button>
					)}
				</div>
				{notifs.length === 0 ? (
					<div className="p-6 text-center text-sm text-muted-foreground">
						No notifications yet.
					</div>
				) : notifs.map(n => <Row key={n.id} n={n} onRead={markRead} />)}
			</div>
		</>
	);
}

function Row({n, onRead}: {n: ChatNotif; onRead: (id: number) => void}) {
	return (
		<button
			onClick={() => !n.is_read && onRead(n.id)}
			className={`w-full text-left px-4 py-3 border-b border-border/50
						hover:bg-accent transition-colors
						${n.is_read ? 'opacity-60' : ''}`}
		>
			<div className="flex items-start gap-2">
				{!n.is_read && (
					<span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
				)}
				<div className="flex-1 min-w-0">
					<p className="font-medium text-sm truncate">{n.title}</p>
					{n.body && (
						<p className="text-xs text-muted-foreground line-clamp-2">{n.body}</p>
					)}
					<p className="text-xs text-muted-foreground mt-1">
						{new Date(n.created_at).toLocaleString()}
					</p>
				</div>
			</div>
		</button>
	);
}
