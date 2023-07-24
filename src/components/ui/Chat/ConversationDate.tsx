interface ConversationDateProps {
  date: Date;
}

const ConversationDate = (props: ConversationDateProps) => {
  const now = new Date();
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const endOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (6 - now.getDay())
  );
  const isCurrentWeek = props.date >= startOfWeek && props.date <= endOfWeek;

  const formattedDate = isCurrentWeek
    ? props.date.toLocaleDateString("en-US", { weekday: "long" })
    : props.date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <div
      class={`relative py-2 px-4  rounded-2xl on-surface-text surface-container inline-block text`}
    >
      <p class={`label-large break-words`}>{formattedDate}</p>
    </div>
  );
};

export default ConversationDate;
