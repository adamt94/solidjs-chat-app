import { createSignal } from 'solid-js';

interface Message {
  username: string;
  message: string;
  sent?: boolean;
  timestamp?: string;
  hideUsername?: boolean;
}

const Message = (props: Message) => {
  const { username, message, sent, hideUsername, timestamp } = props;

  console.log(timestamp);

  const sentClass = sent
    ? "on-primary-container-text primary-container"
    : "on-primary-text primary";
  const textAlignmentClass = sent ? "sent text-left" : "received text-right";
  const messageGapClass = hideUsername ? "mb-1" : "my-2";

  return (
    <div class={`${textAlignmentClass} ${messageGapClass} `}>
      {!hideUsername && (
        <div class="label-medium font-bold primary-text">
          {sent && username}
        </div>
      )}
      <div
        class={`relative py-2 px-4  pr-14 rounded-2xl inline-block ${sentClass}`}
      >
        <p class={`label-large`}>{message}</p>
        <div class="label-small absolute bottom-1 right-3">
          {timestamp && <span class="primary-text">{timestamp}</span>}
        </div>
      </div>
    </div>
  );
};

export default Message;