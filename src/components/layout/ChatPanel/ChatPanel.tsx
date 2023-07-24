import { For, Show, createSignal } from "solid-js";

import MessageInput from "./MessageInput";
import { VsArrowSmallDown } from "solid-icons/vs";
import NavBar from "./NavBar";
import { Contact } from "../../ui/ContactInfo";
import IconButton from "../../ui/IconButton";
import Conversation from "../../ui/Chat/Conversation";

interface MessageListProps {
  username: string;
  contact: Contact;
  sendMessage: (message: Message) => void;
  isTyping: boolean;
}

export default function ChatPanel(props: MessageListProps) {
  const [showSkipButton, setShowSkipButton] = createSignal(false);
  const [message, setMessage] = createSignal<string>("");
  let scrollRef: HTMLInputElement | undefined;
  const onSend = () => {
    props.sendMessage({
      username: props.username,
      text: message(),
      timestamp: new Date(),
    });
    setMessage("");
  };

  const handleSkipButtonClick = () => {
    if (scrollRef) {
      scrollRef.scrollTop = scrollRef.scrollHeight;
    }
  };

  return (
    <div class="flex flex-col surface-container-low h-full relative">
      <NavBar
        heading="last seen 1 minute ago"
        title={props.contact.name}
        icon={props.contact.profilePicture}
      />
      <div class="flex flex-col flex-grow overflow-y-auto">
        <div
          class="flex-grow overflow-auto flex flex-col-reverse"
          onScroll={() => setShowSkipButton(scrollRef?.scrollTop !== 0)}
          ref={scrollRef}
        >
          <div class="flex flex-col p-2">
            <Conversation
              messages={props.contact.messages}
              name={props.username}
            />
            <Show when={props.isTyping}>
              <div class="">
                <div
                  class={`relative py-2 px-4  pr-14 rounded-2xl inline-block  secondary-container my-2`}
                >
                  <div class="dot-flashing"></div>
                </div>
              </div>
            </Show>
          </div>
        </div>
        <Show when={showSkipButton()}>
          <div>
            <IconButton
              style="tertiary-container"
              label="skip to bottom"
              onClick={handleSkipButtonClick}
            >
              <VsArrowSmallDown class="tertiary-text display-small" />
            </IconButton>
          </div>
        </Show>
        <div class="flex-shrink p-2 surface-container-high">
          <MessageInput
            handleSubmit={(e) => {
              e.preventDefault();
              onSend();
            }}
            message={message}
            onInputChanged={(e) => {
              setMessage(e.target.value);
            }}
            onEmojiSelect={(emoji) => {
              setMessage(message() + emoji);
            }}
          />
        </div>
      </div>
    </div>
  );
}
