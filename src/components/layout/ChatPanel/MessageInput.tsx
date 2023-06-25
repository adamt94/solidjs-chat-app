import { Show, createSignal, onCleanup, onMount } from "solid-js";
import { VsSend } from "solid-icons/vs";

import { HiOutlineFaceSmile } from "solid-icons/hi";
import EmojiPanel from "./EmojiPanel/EmojiPanel";
import { Emoji } from "solid-emoji-picker";
import IconButton from "../../ui/IconButton";
import { Motion, Presence } from "@motionone/solid";

interface MessageInputProps {
  onSend: (text: string) => void;
}

function MessageInput(props: MessageInputProps) {
  const [message, setMessage] = createSignal("");
  const [showEmojiPanel, setShowEmojiPanel] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;
  let emojiPanelRef: HTMLDivElement | undefined;

  const handleEmojiButtonClick = (event: MouseEvent) => {
    if (!emojiPanelRef || !event.target) return;
    if (!emojiPanelRef.contains(event.target as Node)) {
      setShowEmojiPanel(false);
      document.removeEventListener("click", handleEmojiButtonClick);
    }
  };

  function messageSend() {
    if (message()) {
      props.onSend(message());
      setMessage("");
    }
  }

  function onClickEmojiIcon() {
    if (!showEmojiPanel()) {
      document.addEventListener("click", handleEmojiButtonClick);
    }
    inputRef?.focus();
    setShowEmojiPanel(!showEmojiPanel());
  }

  const handleEmojiSelect = (emoji: Emoji) => {
    inputRef?.focus();
    setMessage(message() + emoji.emoji);
  };

  onCleanup(() => {
    document.removeEventListener("click", handleEmojiButtonClick);
  });

  return (
    <div class="flex items-center">
      <IconButton label={"emoji"} onClick={onClickEmojiIcon}>
        <HiOutlineFaceSmile class="primary-text headline-medium" />
      </IconButton>
      <input
        ref={inputRef}
        type="text"
        class="flex-1 surface-tint-1 on-surface-text p-2 rounded-2xl px-4 outline-none surface-text-placeholder"
        placeholder="Send a message..."
        value={message()}
        onInput={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            messageSend();
          }
        }}
      />
      <IconButton label={"send message"} onClick={messageSend}>
        <VsSend class="primary-text title-large" />
      </IconButton>
      <div class="absolute" ref={emojiPanelRef}>
        <Presence exitBeforeEnter>
          <Show when={showEmojiPanel()}>
            <Motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <EmojiPanel onEmojiSelect={handleEmojiSelect} />
            </Motion.div>
          </Show>
        </Presence>
      </div>
    </div>
  );
}
export default MessageInput;
