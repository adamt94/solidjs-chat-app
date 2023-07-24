import { createSignal } from "solid-js";
import IconButton from "../IconButton";
import { RiEditorAttachment2 } from "solid-icons/ri";

type ImagePickerProps = {
  onSelect: (file: File) => void;
};

export default function ImagePicker(props: ImagePickerProps) {
  const [fileInput, setFileInput] = createSignal<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInput()?.click();
  };

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      props.onSelect(file);
    }
  };

  return (
    <IconButton label={"attach image"} onClick={() => {}}>
      <RiEditorAttachment2 class="primary-text headline-small" />
    </IconButton>
  );
}
