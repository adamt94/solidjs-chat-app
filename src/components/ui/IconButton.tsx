import { JSX, createMemo, createSignal } from "solid-js";

interface IconButtonProps {
  children: JSX.Element;
  label: string;
  onClick?: () => void;
  style?: string;
  type?: "button" | "submit" | "reset";
}

const IconButton = (props: IconButtonProps) => {
  return (
    <button
      class={`rounded-full hover:hover-shadow p-2 m-1 ${props.style}`}
      aria-label={props.label}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
