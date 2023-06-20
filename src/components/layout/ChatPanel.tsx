import { For, createSignal } from 'solid-js';
import Message from '../Message';
import MessageBar from "../MessageBar";
import { Motion } from "@motionone/solid";
import { getFormattedTimestamp } from "../../util/getFormattedTime";
import NavBar from "./NavBar";

interface MessageListProps {
  username: string;
  messages: Message[];
}

export default function ChatPanel(props: MessageListProps) {
  const [messages, setMessages] = createSignal(props.messages);
  const [username] = createSignal(props.username);

  const onSend = () => (message: string) => {
    const MessageTime = getFormattedTimestamp(Date.now());
    setMessages([
      ...messages(),
      { username: username(), message, timestamp: MessageTime },
    ]);
  };
  return (
    <div class="flex flex-col h-full">
      <NavBar />
      <div class="flex flex-col p-5 h-full">
        <div class="flex-grow overflow-y-auto">
          <For each={messages()} fallback={<div>No messages yet.</div>}>
            {(message, index) => (
              <Motion.div
                animate={{
                  opacity: index() === messages().length - 1 ? [0, 1] : 1,
                }}
                transition={{ duration: 0.5, easing: "ease-in-out" }}
              >
                <Message
                  username={message.username}
                  hideUsername={
                    index() > 0 &&
                    message.username === messages()[index() - 1].username
                  }
                  timestamp={message.timestamp}
                  message={message.message}
                  sent={message.username === username()}
                />
              </Motion.div>
            )}
          </For>
        </div>

        <div class="flex-shrink">
          <MessageBar onSend={onSend()} />
        </div>
      </div>
    </div>
  );
};