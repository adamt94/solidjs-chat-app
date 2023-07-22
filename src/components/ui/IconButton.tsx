import { JSX, createMemo, createSignal } from "solid-js";

interface IconButtonProps {
  children: JSX.Element;
  label: string;
  onClick: () => void;
  style?: string;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <button
      class={`rounded-full hover:hover-shadow p-2 m-1 ${props.style}`}
      aria-label={props.label}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
