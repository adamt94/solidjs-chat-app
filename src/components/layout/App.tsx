import { createSignal, type Component } from "solid-js";

import logo from "../../logo.svg";
import styles from "./App.module.css";
import ChatPanel from "./ChatPanel";

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

const App: Component = () => {
  const [messages, setMessages] = createSignal(defaultMessages);
  return (
    <div class=" h-screen surface">
      <div class="flex p-5">
        <div class={`w-1/4`}>sidepanel</div>
        <div class={`w-3/4`}>
          <ChatPanel messages={messages()} username="John Doe" />
        </div>
      </div>
    </div>
  );
};

export default App;
