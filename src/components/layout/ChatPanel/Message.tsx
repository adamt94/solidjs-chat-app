import { getFormattedTimestamp } from "../../../util/getFormattedTime";

interface Message {
  username: string;
  message: string;
  sent?: boolean;
  timestamp?: Date;
  hideUsername?: boolean;
}

const Message = (props: Message) => {
  const sentClass = props.sent
    ? "on-primary-container-text primary-container"
    : "surface-tint-text surface-tint-5";
  const textAlignmentClass = props.sent
    ? "sent text-right"
    : "received text-left";
  const messageGapClass = props.hideUsername ? "mb-1" : "my-2";

  return (
    <div class={`${textAlignmentClass} ${messageGapClass} `}>
      {props.hideUsername && (
        <div class="label-medium font-bold primary-text">{props.username}</div>
      )}
      <div
        class={`relative py-2 px-4  pr-14 rounded-2xl inline-block ${sentClass}`}
      >
        <p class={`label-large break-words`}>{props.message}</p>
        <div class="label-small absolute bottom-1 right-3">
          {props.timestamp && (
            <span class="primary-text">
              {getFormattedTimestamp(props.timestamp)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
