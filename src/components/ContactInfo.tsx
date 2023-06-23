import { Component } from "solid-js";
import Message from "./layout/ChatPanel/Message";

export type Contact = {
  name: string;
  profilePicture: string;
  messages: Message[];
};

interface ContactInfo {
  heading: string;
  subheading: string;
  image?: string;
  children?: any;
}

const ContactInfo = (props: ContactInfo) => {
  const { heading, subheading, image } = props;
  return (
    <nav class="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
      <div class="flex items-center">
        <img
          class="w-10 h-10 rounded-full"
          src={image}
          onError={(event) => {
            event.currentTarget.src = "https://i.stack.imgur.com/34AD2.jpg";
          }}
        />
        <div class="ml-4">
          <p class="surface-tint-text title-medium">{heading}</p>
          <p class="on-surface-variant-text title-small">{subheading}</p>
        </div>
      </div>
      <div class="flex">{props.children}</div>
    </nav>
  );
};

export default ContactInfo;
