import { For, Show, createSignal } from "solid-js";
import ContactInfo, { Contact } from "../../ContactInfo";
import NavBar from "./NavBar";
import { Motion, Presence } from "@motionone/solid";

interface SidePanelProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export default function SidePanel(props: SidePanelProps) {
  const [selectedContact, setSelectedContact] = createSignal<Contact | null>(
    props.contacts[0]
  );

  const [expandedState, setExpandedState] = createSignal(true);

  return (
    <Motion.aside class="flex flex-col h-full overflow-hidden">
      <NavBar
        onClick={() => setExpandedState(!expandedState())}
        heading=""
        title=""
        icon=""
      />

      <div class="surface-tint-1 h-full">
        <Show when={expandedState()}>
          <For each={props.contacts} fallback={<div>No contacts yet.</div>}>
            {(contact) => (
              <div
                class={`${
                  selectedContact() === contact ? "surface-tint-1" : ""
                } cursor-pointer`}
                onClick={() => {
                  setSelectedContact(contact);
                  props.onSelectContact(contact);
                }}
              >
                <ContactInfo
                  heading={contact.name}
                  subheading={
                    contact.messages.length > 0
                      ? contact.messages[contact.messages.length - 1].text
                      : "No messages"
                  }
                  image={contact.profilePicture}
                />
                <div class=" ml-12 w-full my-1 h-1 border-b-2 opacity-20" />
              </div>
            )}
          </For>
        </Show>
      </div>
    </Motion.aside>
  );
}
