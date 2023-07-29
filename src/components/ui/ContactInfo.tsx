export type Contact = {
  id: string;
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
  return (
    <div class="py-2 px-3 max-w-full">
      <div class="flex">
        <img
          class="w-10 h-10 rounded-full flex-shrink-0"
          src={props.image}
          onError={(event) => {
            event.currentTarget.src = "https://i.stack.imgur.com/34AD2.jpg";
          }}
        />
        <div class="ml-4 overflow-hidden">
          <p class="surface-tint-text title-medium truncate">{props.heading}</p>
          <p class="on-surface-variant-text title-small truncate">
            {props.subheading}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
