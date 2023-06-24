interface Message {
  username: string;
  message: string;
  sent?: boolean;
  timestamp?: string;
  hideUsername?: boolean;
}

const Message = (props: Message) => {
  const { username, message, sent, hideUsername, timestamp } = props;
  const sentClass = sent
    ? "on-primary-container-text primary-container"
    : "surface-tint-text surface-tint-5";
  const textAlignmentClass = sent ? "sent text-right" : "received text-left";
  const messageGapClass = hideUsername ? "mb-1" : "my-2";

  return (
    <div class={`${textAlignmentClass} ${messageGapClass} `}>
      {hideUsername && (
        <div class="label-medium font-bold primary-text">{username}</div>
      )}
      <div
        class={`relative py-2 px-4  pr-14 rounded-2xl inline-block ${sentClass}`}
      >
        <p class={`label-large break-words`}>{message}</p>
        <div class="label-small absolute bottom-1 right-3">
          {timestamp && <span class="primary-text">{timestamp}</span>}
        </div>
      </div>
    </div>
  );
};

export default Message;
