import { For, createSignal } from 'solid-js';
import Message from '../Message';

interface MessageListProps {
username: string;
  messages: { username: string; message: string }[];
}

export default function ChatPanel (props: MessageListProps) {
  const [messages] = createSignal(props.messages);
    const [username] = createSignal(props.username);

    
  return (
     <For each={messages()}>
        {(message, index) => <Message username={message.username} message={message.message} sent={message.username === username()}/>}
      </For>
  );
};