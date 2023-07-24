import { For, createSignal } from "solid-js";
import Message from "./Message";
import { Motion } from "@motionone/solid";
import ConversationDate from "./ConversationDate";

type ConversationProps = {
  name: string;
  messages: Message[];
};

export default function Conversation(props: ConversationProps) {
  let currentDay: Date | null = null;

  return (
    <For
      each={props.messages}
      fallback={
        <div class="text-center">{<ConversationDate date={new Date()} />}</div>
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
                {<ConversationDate date={timestamp} />}
              </div>
            )}
            <Motion.div
              animate={{
                opacity: index() === props.messages.length - 1 ? [0, 1] : 1,
              }}
              transition={{ duration: 0.5, easing: "ease-in-out" }}
            >
              <Message
                username={message.username}
                hideUsername={message.username !== props.name}
                timestamp={message.timestamp}
                text={message.text}
                sent={message.username === props.name}
              />
            </Motion.div>
          </>
        );
      }}
    </For>
  );
}
