import { For } from "solid-js";
import ContactInfo, { Contact } from "../ContactInfo";

interface SidePanelProps {
  contacts: Contact[];
}

export default function SidePanel(props: SidePanelProps) {
  const { contacts } = props;
  return (
    <div class="flex flex-col h-full pt-16">
      <For each={contacts} fallback={<div>No contacts yet.</div>}>
        {(contact) => (
          <div class="border-b-2 outline-variant-border mx-4 border-l-0">
            <ContactInfo
              heading={contact.name}
              subheading={
                contact.messages[contact.messages.length - 1].message || ""
              }
              image={contact.profilePicture}
            />
          </div>
        )}
      </For>
    </div>
  );
}
