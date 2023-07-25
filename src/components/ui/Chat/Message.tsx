import { getFormattedTimestamp } from "../../../util/getFormattedTime";

const Message = (props: Message) => {
  const sentClass = props.sent
    ? "on-primary-container-text primary-container"
    : "on-secondary-container-text secondary-container";
  const textAlignmentClass = props.sent
    ? "sent text-right"
    : "received text-left";
  const messageGapClass = props.hideUsername ? "mb-1" : "my-2";

  return (
    <div class={`${textAlignmentClass} ${messageGapClass}`}>
      {props.hideUsername && (
        <div class="label-medium font-bold primary-text">{props.username}</div>
      )}
      <div class={`relative py-2 px-4 rounded-2xl inline-block ${sentClass}`}>
        <p class={`label-large break-words`}>{props.text}</p>
        <div class="label-small text-right">
          {props.timestamp && (
            <span class="primary-text">
              {getFormattedTimestamp(new Date(props.timestamp))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
