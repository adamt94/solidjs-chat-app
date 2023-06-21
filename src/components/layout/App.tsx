import { createSignal, type Component } from "solid-js";

import logo from "../../logo.svg";
import styles from "./App.module.css";
import ChatPanel from "./ChatPanel";
import SidePanel from "./SidePanel";

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
];

const App: Component = () => {
  const [messages, setMessages] = createSignal(contacts[0].messages);
  return (
    <div class="surface flex h-screen">
      <div class={`w-1/4 surface-variant`}>
        <SidePanel contacts={contacts} />
      </div>
      <div class={`w-3/4`}>
        <ChatPanel messages={messages()} username="John Doe" />
      </div>
    </div>
  );
};

export default App;
