import { createSignal } from "solid-js";
import IconButton from "../IconButton";
import { VsSend } from "solid-icons/vs";

type ChatInputProps = {
  handleSubmit: (
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => void;
  onInputChanged: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
  value: () => string;
  inputRef?: HTMLInputElement;
};

export default function ChatInput(props: ChatInputProps) {
  return (
    <form onSubmit={props.handleSubmit} class="flex flex-grow items-center">
      <input
        ref={props.inputRef}
        type="text"
        class="flex-1 surface-bright on-surface-variant-text p-2 rounded-2xl px-4 outline-none surface-text-placeholder"
        placeholder="Send a message..."
        value={props.value()}
        onInput={props.onInputChanged}
      />
      <IconButton label={"send message"} type="submit">
        <VsSend class="primary-text title-large" />
      </IconButton>
    </form>
  );
}
