import { JSX, createMemo, createSignal } from "solid-js";

interface IconButtonProps {
  children: JSX.Element;
  label: string;
  onClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <button
      class="rounded-full hover:surface-tint-1 p-2 m-1"
      aria-label={props.label}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
