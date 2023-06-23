import { For } from "solid-js";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { Motion } from "@motionone/solid";
import { getFormattedTimestamp } from "../../../util/getFormattedTime";
import NavBar from "./NavBar";
import { Contact } from "../../ContactInfo";

interface MessageListProps {
  username: string;
  contact: Contact;
  sendMessage: (message: Message) => void;
}

export default function ChatPanel(props: MessageListProps) {
  const onSend = () => (message: string) => {
    const MessageTime = getFormattedTimestamp(Date.now());
    props.sendMessage({
      username: props.username,
      message,
      timestamp: MessageTime,
    });
  };

  return (
    <div class="flex flex-col h-full relative surface">
      <NavBar heading="last seen 1 minute ago" title={props.username} icon="" />
      <div class="flex flex-col flex-grow overflow-y-auto">
        <div class="flex-grow overflow-auto flex flex-col-reverse">
          <div class="flex flex-col p-2">
            <For
              each={props.contact.messages}
              fallback={<div>No messages yet.</div>}
            >
              {(message, index) => (
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
                    message={message.message}
                    sent={message.username === props.username}
                  />
                </Motion.div>
              )}
            </For>
          </div>
        </div>

        <div class="flex-shrink p-2 surface-tint-2">
          <MessageInput onSend={onSend()} />
        </div>
      </div>
    </div>
  );
}
