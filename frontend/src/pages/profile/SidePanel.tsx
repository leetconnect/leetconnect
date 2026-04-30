import FriendList from './FriendList';
import FriendRequests from './FriendRequests';

interface SidePanelProps {
	refreshTrigger: number;
	onAction: () => void;
}

export default function SidePanel({ refreshTrigger, onAction }: SidePanelProps) {
	return (
		<div className="w-full lg:w-72 lg:shrink-0 space-y-4">
			<FriendList
				refreshTrigger={refreshTrigger}
				onAction={onAction}
			/>
			<FriendRequests
				refreshTrigger={refreshTrigger}
				onAction={onAction}
			/>
		</div>
	);
}
