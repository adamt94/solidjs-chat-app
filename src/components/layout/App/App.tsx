import {
  createSignal,
  type Component,
  createResource,
  createEffect,
  on,
} from "solid-js";
import ChatPanel from "../ChatPanel/ChatPanel";
import SidePanel from "../SidePanel/SidePanel";
import { Contact } from "../../ui/ContactInfo";
import { fetchChatGpt } from "../../fetchChatGpt";
import { createLocalStore } from "../../localStorage";

const initialContacts = [
  {
    id: "chat-gpt-1",
    name: "Chat Gpt",
    profilePicture:
      "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
    messages: [],
  },
];

const App: Component = () => {
  const [contacts, setContacts] = createLocalStore<Contact[]>(
    "contacts",
    initialContacts as unknown as Contact[]
  );
  const [selectedContact, setSelectedContact] = createSignal<Contact>(
    contacts[0]
  );

  const [username] = createSignal("John Doe");
  const [query, setQuery] = createSignal<string | undefined>();

  const [data] = createResource(query, fetchChatGpt);

  const onSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const onNewChatClick = () => {
    setContacts([
      ...contacts,
      {
        id: `chat-gpt-${contacts.length}`,
        name: `Chat Gpt ${contacts.length}`,
        profilePicture:
          "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        messages: [],
        type: "conversation",
      },
    ]);
    setSelectedContact(contacts[contacts.length - 1]);
  };

  const onClearChat = () => {
    const contact = selectedContact();
    const updatedContact = {
      ...contact,
      messages: [],
    } as Contact;
    setSelectedContact(updatedContact);
    setContacts(
      contacts.map((c) => (c.name === contact.name ? updatedContact : c))
    );
  };

  const sendMessage = (message: Message) => {
    const contact = selectedContact();
    const messages = contact.messages;
    const updatedContact = {
      ...contact,
      messages: [...messages, message],
    } as Contact;
    setSelectedContact(updatedContact);
    setContacts(
      contacts.map((c) => (c.name === contact.name ? updatedContact : c))
    );
  };

  createEffect(
    on(
      data,
      () => {
        if (data.loading) {
          return;
        }
        const text = data()?.choices[0]?.message.content;
        sendMessage({
          username: "Chat Gpt",
          text: text || "Sorry something went wrong.",
          timestamp: new Date().toString(),
        });
      },
      { defer: true }
    )
  );

  return (
    <div>
      <div class="surface flex h-screen relative">
        <SidePanel contacts={contacts} onSelectContact={onSelectContact} />

        <div class={`w-full`}>
          <ChatPanel
            contact={selectedContact()}
            sendMessage={(message) => {
              sendMessage(message);
              setQuery(message.text);
            }}
            onClearChat={onClearChat}
            onNewChatClick={onNewChatClick}
            username={username()}
            isTyping={data.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
