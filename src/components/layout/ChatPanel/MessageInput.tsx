import { JSX, Show, createSignal, onCleanup, onMount } from "solid-js";
import { VsSend } from "solid-icons/vs";
import ChatInput from "../../ui/Chat/Input";
import ImagePicker from "../../ui/Chat/ImagePicker";
import EmojiPicker from "../../ui/Chat/EmojiPicker";

interface MessageInputProps {
  handleSubmit: (
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => void;
  onInputChanged: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
  message: () => string;
  onEmojiSelect: (emoji: string) => void;
}

function MessageInput(props: MessageInputProps) {
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

  onCleanup(() => {
    document.removeEventListener("click", handleEmojiButtonClick);
  });

  return (
    <div class="flex items-center">
      <ImagePicker onSelect={() => {}} />
      <EmojiPicker onSelect={props.onEmojiSelect} />
      <ChatInput
        handleSubmit={props.handleSubmit}
        onInputChanged={props.onInputChanged}
        value={props.message}
      />
    </div>
  );
}
export default MessageInput;
