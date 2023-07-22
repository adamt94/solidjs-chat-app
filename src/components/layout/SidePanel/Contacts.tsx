import { Motion, Presence } from "@motionone/solid";
import { For, Match, Switch, createSignal } from "solid-js";
import { Contact } from "../../ui/ContactInfo";
import IconButton from "../../ui/IconButton";
import { IoArrowBackOutline } from "solid-icons/io";

export type ContactsProps = {
  contacts: Contact[];
  onBackClick: () => void;
  onContactClick: (contact: Contact) => void;
};

export default function Contacts(props: ContactsProps) {
  const getSectionHeaders = () => {
    const firstLetters = new Set(
      props.contacts.map((contact) => contact.name[0])
    );
    return Array.from(firstLetters).sort();
  };

  return (
    <Motion.aside class="flex surface-container-highest flex-col h-full overflow-hidden">
      <div class=" h-full">
        <Presence>
          <Motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <nav class=" py-2 px-1 flex primary flex-row items-center h-16 mb-5">
              <div class="flex items-center">
                <IconButton label="back" onClick={props.onBackClick}>
                  <IoArrowBackOutline class=" headline-small  on-primary-text" />
                </IconButton>
              </div>
              <div class="flex items-center">
                <p class="title-large on-primary-text">Contacts</p>
              </div>
            </nav>
            {getSectionHeaders().map((letter) => (
              <>
                <div class="my-2">
                  <div class="title-large primary-text mx-5">{letter}</div>
                  <div class="flex items-center">
                    <div class="flex-1 h-px primary my-2 mx-3"></div>
                  </div>
                </div>
                {props.contacts
                  .filter((contact) => contact.name[0] === letter)
                  .map((contact) => (
                    <button
                      onClick={() => props.onContactClick(contact)}
                      class="py-2 px-3 flex flex-row justify-between items-center hover:hover-shadow hover:cursor-pointer"
                    >
                      <div class="flex items-center">
                        <img
                          class="w-10 h-10 rounded-full"
                          src={contact.profilePicture}
                          onError={(event) => {
                            event.currentTarget.src =
                              "https://i.stack.imgur.com/34AD2.jpg";
                          }}
                        />
                        <div class="ml-4">
                          <p class="on-surface-variant-text title-medium">
                            {contact.name}
                          </p>
                          <p class="on-surface-variant-text title-small"></p>
                        </div>
                      </div>
                    </button>
                  ))}
              </>
            ))}
          </Motion.div>
        </Presence>
      </div>
    </Motion.aside>
  );
}
