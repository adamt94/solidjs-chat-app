import { For, createSignal } from 'solid-js';
import Message from '../Message';
import MessageBar from "../MessageBar";



interface MessageListProps {
  username: string;
  messages: Message[];
}

export default function ChatPanel(props: MessageListProps) {
  const [messages, setMessages] = createSignal(props.messages);
  const [username] = createSignal(props.username);

  const onSend = () => (message: Message) => {
    setMessages([...messages(), message]);
  };
  return (
    <div class="flex flex-col gap-5">
      <For each={messages()}>
        {(message, index) => (
          <Message
            username={message.username}
            message={message.message}
            sent={message.username === username()}
          />
        )}
      </For>
      <MessageBar onSend={onSend()} username={username()} />
    </div>
  );
};