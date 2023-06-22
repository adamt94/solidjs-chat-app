import { For, createSignal } from "solid-js";
import ContactInfo, { Contact } from "../ContactInfo";

interface SidePanelProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export default function SidePanel(props: SidePanelProps) {
  const { contacts, onSelectContact } = props;
  const [selectedContact, setSelectedContact] = createSignal<Contact | null>(
    contacts[0]
  );

  return (
    <div class="flex flex-col h-full pt-16 overflow-hidden">
      <For each={contacts} fallback={<div>No contacts yet.</div>}>
        {(contact) => (
          <div
            class={`${
              selectedContact() === contact
                ? "surface-tint-2"
                : "surface-variant"
            } cursor-pointer`}
            onClick={() => {
              setSelectedContact(contact);
              onSelectContact(contact);
            }}
          >
            <ContactInfo
              heading={contact.name}
              subheading={
                contact.messages.length > 0
                  ? contact.messages[contact.messages.length - 1].message
                  : "No messages"
              }
              image={contact.profilePicture}
            />
            <div class=" ml-12 w-full my-1 h-1 border-b-2 on-surface-variant opacity-20"></div>
          </div>
        )}
      </For>
    </div>
  );
}
