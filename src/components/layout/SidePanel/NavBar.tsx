import { FiMenu } from "solid-icons/fi";
import ContactInfo from "../../ContactInfo";
import IconButton from "../../ui/IconButton";
import { BsPencilSquare } from "solid-icons/bs";
import { Match, Switch } from "solid-js";

interface NavItem {
  title: string;
  icon: string;
  heading: string;
  mobileLayout: boolean;
  onClick: () => void;
}

const NavBar = (props: NavItem) => {
  return (
    <Switch>
      <Match when={props.mobileLayout}>
        <nav class=" py-2 px-1 flex surface-tint-2 flex-row justify-between items-center h-16">
          <div class="flex items-center">
            <IconButton label="New chat" onClick={props.onClick}>
              <FiMenu class=" headline-small primary-text" />
            </IconButton>
          </div>
          <div class="flex items-center gap-2">
            <img
              class="w-10 h-10 rounded-full"
              src={props.icon}
              onError={(event) => {
                event.currentTarget.src = "https://i.stack.imgur.com/34AD2.jpg";
              }}
            />
            <IconButton label="New chat" onClick={() => {}}>
              <BsPencilSquare class=" headline-small primary-text" />
            </IconButton>
          </div>
        </nav>
      </Match>

      <Match when={!props.mobileLayout}>
        <nav class="flex flex-col surface-tint-1">
          <div class="flex items-center">
            <IconButton label="New chat" onClick={props.onClick}>
              <FiMenu class=" headline-small primary-text" />
            </IconButton>
          </div>
          <div class="flex items-center gap-2">
            <IconButton label="New chat" onClick={() => {}}>
              <BsPencilSquare class=" headline-small primary-text" />
            </IconButton>
          </div>
        </nav>
      </Match>
    </Switch>
  );
};

export default NavBar;
