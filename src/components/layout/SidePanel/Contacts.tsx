import { Motion, Presence } from "@motionone/solid";
import { For, Match, Switch, createSignal } from "solid-js";
import { Contact } from "../../ui/ContactInfo";

export default function Contacts(props: { contacts: Contact[] }) {
  const [expandedState, setExpandedState] = createSignal(true);

  return (
    <Motion.aside
      class={`flex flex-col h-full overflow-hidden transition-all duration-150 ease-out  ${
        expandedState() ? "w-2/6" : " w-16"
      }`}
    >
      <div class="surface-tint-1 h-full">
        <Presence>
          <Motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <For each={props.contacts} fallback={<div>No contacts yet.</div>}>
              {(contact) => (
                <div class="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                  <div class="flex items-center">
                    <img
                      class="w-10 h-10 rounded-full"
                      src={contact.profilePicture}
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://i.stack.imgur.com/34AD2.jpg";
                      }}
                    />
                    <div class="ml-4">
                      <p class="surface-tint-text title-medium">
                        {contact.name}
                      </p>
                      <p class="on-surface-variant-text title-small"></p>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </Motion.div>
        </Presence>
      </div>
    </Motion.aside>
  );
}
