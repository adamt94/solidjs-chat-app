import { createSignal, type Component } from "solid-js";

import logo from "../../logo.svg";
import styles from "./App.module.css";
import ChatPanel from "./ChatPanel";
import SidePanel from "./SidePanel";
import { Contact } from "../ContactInfo";
import Message from "../Message";

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

const contacts = [
  {
    name: "Jane Doe",
    profilePicture:
      "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
    messages: defaultMessages,
  },
  {
    name: "Fred Salmon",
    profilePicture: logo,
    messages: [],
  },
  {
    name: "Simon Salmon",
    profilePicture: "",
    messages: [],
  },
];

const App: Component = () => {
  const [selectedContact, setSelectedContact] = createSignal(contacts[0]);
  const [messages, setMessages] = createSignal(selectedContact().messages);
  const [username, setUsername] = createSignal("John Doe");

  const onSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages(contact.messages);
  };

  const sendMessage = (message: Message) => {
    setMessages([...messages(), message]);
  };

  return (
    <div class="surface flex h-screen">
      <div class={`w-1/4 surface-variant`}>
        <SidePanel contacts={contacts} onSelectContact={onSelectContact} />
      </div>
      <div class={`w-3/4`}>
        <ChatPanel
          messages={messages()}
          sendMessage={sendMessage}
          username={username()}
        />
      </div>
    </div>
  );
};

export default App;
