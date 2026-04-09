import Avatar from "./Avatar";

export interface Conversation {
	id: 		number;
	name: 		string;
	avatar?:	string;
	last: 		string;
	timestamp: 	string;
	unread: 	number;
}

interface ConversLayerProp {
	convers: 	Conversation;
	is_active: 	boolean;
	onClick: () => void;
}

export default function ConversLayer({
	convers, is_active, onClick
}: ConversLayerProp) {
	return (
		<button
			onClick={onClick}
			className={`relative w-full flex items-center gap-3 px-4 py-3 text-left
						transition-colors hover:bg-secondary/50
						${is_active ? "bg-secondary" : ""}`}
		>
			{is_active && (
				<span className="absolute left-0 w-1 h-full bg-primary"/>
			)}
			<Avatar name={convers.name} image={convers.avatar}/>
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-foreground">
						{convers.name}
					</span>
					<span className="text-xs text-muted-foreground ml-2 shrink-0">
						{convers.timestamp}
					</span>
				</div>
				<p className="text-xs text-muted-foreground truncate mt-0.5">
					{convers.last}
				</p>
			</div>
			{convers.unread > 0 && (
				<span className="bg-primary text-primary-foreground text-xs
									font-medium rounded-full w-5 h-5
									flex items-center justify-center shrink-0">
					{convers.unread}
				</span>
			)}
		</button>
	);
}
