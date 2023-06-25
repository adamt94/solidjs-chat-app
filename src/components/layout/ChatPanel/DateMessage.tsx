interface DateMessageProps {
  date: Date;
}

const DateMessage = (props: DateMessageProps) => {
  const now = new Date();
  const isCurrentWeek =
    props.date >=
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      ) &&
    props.date <
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (7 - now.getDay())
      );

  const formattedDate = isCurrentWeek
    ? props.date.toLocaleDateString("en-US", { weekday: "long" })
    : props.date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <div
      class={`relative py-2 px-4  rounded-2xl inline-block surface-tint-3 surface-tint-text`}
    >
      <p class={`label-large break-words`}>{formattedDate}</p>
    </div>
  );
};

export default DateMessage;
