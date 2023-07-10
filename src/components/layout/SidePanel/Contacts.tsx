import { Motion, Presence } from "@motionone/solid";
import { For, Match, Switch, createSignal } from "solid-js";
import { Contact } from "../../ui/ContactInfo";
import IconButton from "../../ui/IconButton";
import { IoArrowBackOutline } from "solid-icons/io";

export type ContactsProps = {
  contacts: Contact[];
  onBackClick: () => void;
};

export default function Contacts(props: ContactsProps) {
  const [expandedState, setExpandedState] = createSignal(true);

  return (
    <Motion.aside class="flex surface-tint-5 flex-col h-full overflow-hidden">
      <div class=" h-full">
        <Presence>
          <Motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <nav class=" py-2 px-1 flex primary flex-row items-center h-16 mb-5">
              <div class="flex items-center">
                <IconButton label="back" onClick={props.onBackClick}>
                  <IoArrowBackOutline class=" headline-small  on-primary-text" />
                </IconButton>
              </div>
              <div class="flex items-center">
                <p class="headline-small on-primary-text">Contacts</p>
              </div>
            </nav>
            <div class="title-large on-primary-container-text mx-5">A</div>
            <div class="h-px on-primary-container my-2 mx-3 w-auto"></div>

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
