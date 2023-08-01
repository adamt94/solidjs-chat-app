import { createSignal } from "solid-js";
import { For } from "solid-js/web";
import classNames from "classnames";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleMenu = () => setIsOpen(!isOpen());

  const menuItems = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    // Add more options here as needed
  ];

  return (
    <div class="relative">
      <button
        onClick={toggleMenu}
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        {isOpen() ? "Close Menu" : "Open Menu"}
      </button>
      {isOpen() && (
        <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <For each={menuItems}>
              {(item) => (
                <a
                  href="#"
                  class={classNames("block px-4 py-2 text-sm text-gray-700", {
                    "bg-blue-100 text-blue-600": item === "Option 1", // Customize active item styles here
                  })}
                  role="menuitem"
                >
                  {item}
                </a>
              )}
            </For>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
