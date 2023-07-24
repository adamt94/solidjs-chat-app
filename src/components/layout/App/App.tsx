import {
  createSignal,
  type Component,
  createResource,
  createEffect,
  on,
} from "solid-js";

import logo from "../../../logo.svg";
import ChatPanel from "../ChatPanel/ChatPanel";
import SidePanel from "../SidePanel/SidePanel";
import Message from "../ChatPanel/Message";
import { Contact } from "../../ui/ContactInfo";
import { fetchChatGpt } from "../../fetchChatGpt";

const defaultMessages = [
  {
    username: "John Doe",
    text: "Hello world!",
    timestamp: new Date(new Date().getTime() - 48 * 60 * 60 * 1000),
  },
  {
    username: "Jane Doe",
    text: "Hi, John!",
    timestamp: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
  },
  {
    username: "John Doe",
    text: "How are you?",
    timestamp: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
  },
  {
    username: "Jane Doe",
    text: "I'm fine, thanks!",
    timestamp: new Date(new Date().getTime() - 4 * 59 * 60 * 1000),
  },
  {
    username: "John Doe",
    text: "Good to hear!",
    timestamp: new Date(new Date().getTime() - 4 * 58 * 60 * 1000),
  },
  {
    username: "Jane Doe",
    text: "Goodbye!",
    timestamp: new Date(new Date().getTime() - 1 * 55 * 60 * 1000),
  },
];

const initialContacts = [
  {
    name: "Jane Doe",
    profilePicture:
      "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
    messages: defaultMessages,
  },
  {
    name: "Fred Salmon",
    profilePicture: logo,
    messages: [{ username: "Fred Salmon", text: "Hello world!" }],
  },
  {
    name: "Simon Salmon",
    profilePicture: "",
    messages: [],
  },
];

const App: Component = () => {
  const [selectedContact, setSelectedContact] = createSignal<Contact>(
    initialContacts[0] as unknown as Contact
  );
  const [contacts, setContacts] = createSignal<Contact[]>(
    initialContacts as unknown as Contact[]
  );
  const [username] = createSignal("John Doe");
  const [query, setQuery] = createSignal<string | undefined>();

  const [data] = createResource(query, fetchChatGpt);

  const onSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const sendMessage = (message: Message) => {
    console.log(message);
    const contact = selectedContact();
    const messages = contact.messages;
    const updatedContact = {
      ...contact,
      messages: [...messages, message],
    } as Contact;
    setSelectedContact(updatedContact);
    setContacts(
      contacts().map((c) => (c.name === contact.name ? updatedContact : c))
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
          username: "Jane Doe",
          text: text || "Sorry something went wrong.",
          timestamp: new Date(),
        });
      },
      { defer: true }
    )
  );
  return (
    <div>
      <div class="surface flex h-screen relative">
        <SidePanel contacts={contacts()} onSelectContact={onSelectContact} />

        <div class={`w-full`}>
          <ChatPanel
            contact={selectedContact()}
            sendMessage={(message) => {
              sendMessage(message);
              setQuery(message.text);
            }}
            username={username()}
            isTyping={data.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
