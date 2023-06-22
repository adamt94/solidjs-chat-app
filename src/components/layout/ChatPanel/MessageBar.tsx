import { Show, createSignal, onCleanup, onMount } from "solid-js";
import { VsSend } from "solid-icons/vs";

import { HiOutlineFaceSmile } from "solid-icons/hi";
import EmojiPanel from "./EmojiPanel/EmojiPanel";
import { Emoji } from "solid-emoji-picker";

interface MessageBarProps {
  onSend: (message: string) => void;
}

function MessageBar(props: MessageBarProps) {
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
      <button class="p-2" onClick={onClickEmojiIcon}>
        <div class="rounded-full hover:surface-tint-1">
          <HiOutlineFaceSmile class="primary-text headline-medium" />
        </div>
      </button>
      <input
        ref={inputRef}
        type="text"
        class="flex-1 surface-variant on-surface-variant-text p-2 rounded-2xl px-4 focus:primary-outline"
        placeholder="Send a message..."
        value={message()}
        onInput={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            messageSend();
          }
        }}
      />
      <button class="p-2" onClick={messageSend}>
        <VsSend class="primary-text title-large" />
      </button>
      <div ref={emojiPanelRef}>
        <Show when={showEmojiPanel()}>
          <EmojiPanel onEmojiSelect={handleEmojiSelect} />
        </Show>
      </div>
    </div>
  );
}
export default MessageBar;
