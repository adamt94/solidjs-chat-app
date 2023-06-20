import { createSignal } from "solid-js";
import { VsSend } from "solid-icons/vs";
import Message from "./Message";

interface MessageBarProps {
  onSend: (message: Message) => void;
}

export default function MessageBar(props: MessageBarProps) {
  const [message, setMessage] = createSignal<Message>({
    message: "",
    username: "",
  });

  function handleSend() {
    if (message()) {
      props.onSend(message());

      setMessage({ message: "", username: message().username });
    }
  }

  function handleEmote() {
    // TODO: Implement emote functionality
  }

  return (
    <div class="flex items-cente">
      <input
        type="text"
        class="flex-1 surface-variant on-surface-variant-text p-2 rounded-2xl px-4 focus:primary-outline"
        placeholder="Send a message..."
        value={message().message}
        onInput={(e) =>
          setMessage({
            message: e.currentTarget.value,
            username: message().username,
          })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <button class="p-2" onClick={handleSend}>
        <VsSend class="primary-text title-large" />
      </button>
    </div>
  );
}
