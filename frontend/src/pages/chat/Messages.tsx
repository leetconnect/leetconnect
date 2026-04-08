// @adbouras
// import Avatar from "./Avatar";
import Message from "./MessageLayer";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

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
    <div className="min-h-screen flex flex-col">
		<ChatHeader name="Sarah Chen" avatar="https://i.pravatar.cc/100?img=23" is_online={true} />
      <div className="flex-1 overflow-y-auto p-4">
        <Message message={m1} />
        <Message message={m2} />
        <Message message={m3} />
        <ChatInput onSend={(content) => console.log("sent:", content)} />
      </div>

    </div>
  );
}
