import { Show, createSignal } from "solid-js";
import IconButton from "../IconButton";
import { HiOutlineFaceSmile } from "solid-icons/hi";
import { Motion, Presence } from "@motionone/solid";
import { Emoji, EmojiPicker as Emojis } from "solid-emoji-picker";

type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
};

export default function EmojiPicker(props: EmojiPickerProps) {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen());
  };

  const onClickEmojiIcon = (emoji: Emoji) => {
    props.onSelect(emoji.emoji);
  };

  return (
    <div>
      <IconButton label={"emoji"} onClick={handleButtonClick}>
        <HiOutlineFaceSmile class="primary-text headline-medium" />
      </IconButton>
      <div class="absolute">
        <Presence exitBeforeEnter>
          <Show when={isOpen()}>
            <Motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <div class="emoji-panel">
                <div class="overflow-auto">
                  <Emojis onEmojiClick={onClickEmojiIcon} />
                </div>
              </div>
            </Motion.div>
          </Show>
        </Presence>
      </div>
    </div>
  );
}
