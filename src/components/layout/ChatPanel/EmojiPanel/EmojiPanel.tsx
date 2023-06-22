import { Component } from "solid-js";
import { Emoji, EmojiPicker } from "solid-emoji-picker";
import "./EmojiPanel.css";

interface EmojiPanelProps {
  onEmojiSelect: (emoji: Emoji) => void;
}

const EmojiPanel: Component<EmojiPanelProps> = ({ onEmojiSelect }) => {
  return (
    <div class="emoji-panel">
      <div class="overflow-auto">
        <EmojiPicker onEmojiClick={onEmojiSelect} />
      </div>
    </div>
  );
};

export default EmojiPanel;
