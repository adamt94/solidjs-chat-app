import { createSignal, type Component } from "solid-js";

import logo from "../../../logo.svg";
import ChatPanel from "../ChatPanel/ChatPanel";
import SidePanel from "../SidePanel/SidePanel";
import { Contact } from "../../ContactInfo";
import Message from "../ChatPanel/Message";

const defaultMessages = [
  {
    username: "John Doe",
    message: "Hello world!",
  },
  {
    username: "Jane Doe",
    message: "Hi, John!",
  },
  {
    username: "John Doe",
    message: "How are you?",
  },
  {
    username: "Jane Doe",
    message: "I'm fine, thanks!",
  },
  {
    username: "John Doe",
    message: "Good to hear!",
  },
  {
    username: "Jane Doe",
    message: "Goodbye!",
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
    messages: [{ username: "Fred Salmon", message: "Hello world!" }],
  },
  {
    name: "Simon Salmon",
    profilePicture: "",
    messages: [],
  },
];

const App: Component = () => {
  const [selectedContact, setSelectedContact] = createSignal(
    initialContacts[0]
  );
  const [contacts, setContacts] = createSignal(initialContacts);
  const [username] = createSignal("John Doe");

  const onSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const sendMessage = (message: Message) => {
    const contact = selectedContact();
    const messages = contact.messages;
    const updatedContact = { ...contact, messages: [...messages, message] };
    setSelectedContact(updatedContact);
    setContacts(
      contacts().map((c) => (c.name === contact.name ? updatedContact : c))
    );
  };

  return (
    <div class="surface flex h-screen">
      <div class={`w-1/4`}>
        <SidePanel contacts={contacts()} onSelectContact={onSelectContact} />
      </div>
      <div class={`w-3/4`}>
        <ChatPanel
          contact={selectedContact()}
          sendMessage={sendMessage}
          username={username()}
        />
      </div>
    </div>
  );
};

export default App;
