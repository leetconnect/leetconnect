// @adbouras
// import Avatar from "./Avatar";
import Message from "./MessageLayer";

export default function Messages() {
	const m1 = {
		id: 1,
		content: "Hello from test message",
		sender_id: 42,
		sender_name: "Sarah Chen",
		sender_avatar: "https://i.pravatar.cc/100?img=5",
		created_at: new Date().toISOString(),
		is_mine: false,
	};
	const m2 = {
		id: 2,
		content: "Hello hello",
		sender_id: 1337,
		sender_name: "Sarah Chen",
		sender_avatar: "https://cdn.intra.42.fr/users/09229a11c453f1262c72a2e85f43ea2e/adbouras.jpg",
		created_at: new Date().toISOString(),
		is_mine: false,
	};
	const m3 = {
		id: 2,
		content: "Hello hello",
		sender_id: 1337,
		sender_name: "Sarah Chen",
		created_at: new Date().toISOString(),
		is_mine: true,
	};
	return (
		<div>
			{/* <Avatar name="Adham Bouras" image="https://cdn.intra.42.fr/users/09229a11c453f1262c72a2e85f43ea2e/adbouras.jpg"/>
			<Avatar name="Sarah Chen"/>
			<Avatar name="Dev Team Alpha"/>

			<Avatar name="Emily Rodriguez" size="sm"/>
			<Avatar name="Adham Bouras" size="sm" image="https://cdn.intra.42.fr/users/09229a11c453f1262c72a2e85f43ea2e/adbouras.jpg"/> */}
			<div className="p-10">
				<Message message={m1} />
				<Message message={m2} />
				<Message message={m3} />
			</div>
		</div>

	);
}
