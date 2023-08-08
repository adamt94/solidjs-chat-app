import { For, Switch, Match, createSignal, Show } from "solid-js";
import ContactInfo, { Contact } from "../../ui/ContactInfo";
import NavBar from "./NavBar";
import { Motion, Presence } from "@motionone/solid";
import Contacts from "./Contacts";

interface SidePanelProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export default function SidePanel(props: SidePanelProps) {
  const [selectedContact, setSelectedContact] = createSignal<Contact | null>(
    props.contacts[0]
  );

  const [expandedState, setExpandedState] = createSignal<boolean>(true);
  const [showContacts, setShowContacts] = createSignal<boolean>(false);

  const contacts = props.contacts.filter(
    (contact) => contact.type !== "conversation"
  );

  return (
    <Motion.aside
      class={`flex flex-col h-full overflow-hidden transition-all duration-150 ease-out relative  ${
        expandedState() ? "w-2/6" : " w-16"
      }`}
    >
      <NavBar
        onMenuClick={() => setExpandedState(!expandedState())}
        onNewChatClick={() => setShowContacts(true)}
        heading=""
        title=""
        icon=""
        mobileLayout={expandedState()}
      />

      <div class="surface-container-highest h-full">
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
                        selectedContact() === contact
                          ? "outline-variant"
                          : "hover:hover-shadow"
                      } cursor-pointer`}
                      onClick={() => {
                        setSelectedContact(contact);
                        props.onSelectContact(contact);
                      }}
                    >
                      {contact.messages.length > 0 && (
                        <div class=" overflow-hidden w-full">
                          <ContactInfo
                            heading={contact.name}
                            subheading={
                              contact.messages[contact.messages.length - 1].text
                            }
                            image={contact.profilePicture}
                          />
                          <div class="ml-12 w-full my-1 h-[1px] border-b-1 inverse-surface opacity-50" />
                        </div>
                      )}
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
                  {(contact) =>
                    contact.messages.length > 0 && (
                      <div
                        class={`${
                          selectedContact() === contact ? "" : ""
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
                    )
                  }
                </For>
              </Motion.div>
            </Presence>
          </Match>
        </Switch>
      </div>

      <div
        class={` absolute h-full top-0 surface transform transition-all duration-150 ease-out z-10 ${
          showContacts() ? "w-full" : "w-0"
        }`}
      >
        <Contacts
          contacts={contacts}
          onBackClick={() => {
            setShowContacts(false);
          }}
          onContactClick={(selected: Contact) => {
            setSelectedContact(selected);
            props.onSelectContact(selected);
            setShowContacts(false);
          }}
        />
      </div>
    </Motion.aside>
  );
}
