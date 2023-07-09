import { For, Switch, Match, createSignal } from "solid-js";
import ContactInfo, { Contact } from "../../ui/ContactInfo";
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
    <Motion.aside
      class={`flex flex-col h-full overflow-hidden transition-all duration-150 ease-out  ${
        expandedState() ? "w-2/6" : " w-16"
      }`}
    >
      <NavBar
        onClick={() => setExpandedState(!expandedState())}
        heading=""
        title=""
        icon=""
        mobileLayout={expandedState()}
      />

      <div class="surface-tint-1 h-full">
        <Switch>
          <Match when={expandedState()}>
            <Presence>
              <Motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <For
                  each={props.contacts}
                  fallback={<div>No contacts yet.</div>}
                >
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
              </Motion.div>
            </Presence>
          </Match>

          <Match when={!expandedState()}>
            <Presence>
              <Motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <For
                  each={props.contacts}
                  fallback={<div>No contacts yet.</div>}
                >
                  {(contact) => (
                    <div
                      class={`${
                        selectedContact() === contact ? "surface-tint-1" : ""
                      } cursor-pointer p-2 py-3`}
                      onClick={() => {
                        setSelectedContact(contact);
                        props.onSelectContact(contact);
                      }}
                    >
                      <img
                        class="w-10 h-10 rounded-full justify-center"
                        src={contact.profilePicture}
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://i.stack.imgur.com/34AD2.jpg";
                        }}
                      />
                    </div>
                  )}
                </For>
              </Motion.div>
            </Presence>
          </Match>
        </Switch>
      </div>
    </Motion.aside>
  );
}
