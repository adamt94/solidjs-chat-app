import { createSignal } from 'solid-js';

interface MessageProps {
  username: string;
  message: string;
  sent?: boolean;
  timestamp?: string;
}

const Message = (props: MessageProps) => {
    const [username] = createSignal(props.username);
    const [message] = createSignal(props.message);
    const [sent] = createSignal(props.sent);

    const sentClass = sent()?  "on-primary-container-text primary-container" : "on-primary-text primary";
    const alignClass = sent() ? 'sent text-left' : 'received text-right';

    return (
        <div class={`${alignClass}`}>
            <div class="label-medium font-bold primary-text">{sent() && username()}</div>
            <p class={`p-2 px-4 rounded-2xl inline-block ${sentClass} label-large`}>{message()}</p>
        </div>
    );
};

export default Message;