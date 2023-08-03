import { Show, createSignal } from "solid-js";
import { For } from "solid-js/web";

type DropdownMenuProps = {
  isOpen: boolean;
  onSelected: (item: string) => void;
  menuItems: string[];
};

const DropdownMenu = (props: DropdownMenuProps) => {
  return (
    <div class="relative">
      <Show when={props.isOpen}>
        <div class="origin-top-right top-14 absolute right-2 w-40  surface-container-high rounded-lg">
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <For each={props.menuItems}>
              {(item) => (
                <button
                  onclick={() => props.onSelected(item)}
                  class={`block w-full py-2 text-sm on-surface-text  hover:hover-shadow `}
                  role="menuitem"
                >
                  {item}
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default DropdownMenu;
