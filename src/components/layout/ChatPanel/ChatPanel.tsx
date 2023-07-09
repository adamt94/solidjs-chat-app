import { For, Show, createSignal } from "solid-js";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { Motion } from "@motionone/solid";
import { AiOutlineArrowDown } from "solid-icons/ai";
import NavBar from "./NavBar";
import { Contact } from "../../ui/ContactInfo";
import DateMessage from "./DateMessage";
import IconButton from "../../ui/IconButton";

interface MessageListProps {
  username: string;
  contact: Contact;
  sendMessage: (message: Message) => void;
}

export default function ChatPanel(props: MessageListProps) {
  const [showSkipButton, setShowSkipButton] = createSignal(false);

  let currentDay: Date | null = null;
  let scrollRef: HTMLInputElement | undefined;
  const onSend = () => (text: string) => {
    props.sendMessage({
      username: props.username,
      text: text,
      timestamp: new Date(),
    });
  };

  const handleSkipButtonClick = () => {
    if (scrollRef) {
      scrollRef.scrollTop = scrollRef.scrollHeight;
    }
  };

  return (
    <div class="flex flex-col h-full relative surface">
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
            <div class="text-center"></div>
            <For
              each={props.contact.messages}
              fallback={
                <div class="text-center">
                  <DateMessage date={new Date()} />
                </div>
              }
            >
              {(message, index) => {
                const timestamp = message.timestamp || new Date();
                const messageDay = new Date(
                  timestamp.getFullYear(),
                  timestamp.getMonth(),
                  timestamp.getDate()
                );
                const shouldRenderDateMessage =
                  currentDay === null || messageDay > currentDay;
                currentDay = messageDay;

                return (
                  <>
                    {shouldRenderDateMessage && (
                      <div class="text-center">
                        <DateMessage date={timestamp} />
                      </div>
                    )}
                    <Motion.div
                      animate={{
                        opacity:
                          index() === props.contact.messages.length - 1
                            ? [0, 1]
                            : 1,
                      }}
                      transition={{ duration: 0.5, easing: "ease-in-out" }}
                    >
                      <Message
                        username={message.username}
                        hideUsername={message.username !== props.username}
                        timestamp={message.timestamp}
                        text={message.text}
                        sent={message.username === props.username}
                      />
                    </Motion.div>
                  </>
                );
              }}
            </For>
          </div>
        </div>
        <Show when={showSkipButton()}>
          <div>
            <IconButton
              style="surface-tint-5"
              label="skip to bottom"
              onClick={handleSkipButtonClick}
            >
              <AiOutlineArrowDown class="on-surface-text headline-medium" />
            </IconButton>
          </div>
        </Show>
        <div class="flex-shrink p-2 surface-tint-2">
          <MessageInput onSend={onSend()} />
        </div>
      </div>
    </div>
  );
}
