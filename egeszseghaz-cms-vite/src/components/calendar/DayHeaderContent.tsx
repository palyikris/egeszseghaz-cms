/* eslint-disable prettier/prettier */


type DayHeaderContentProps = {
  date: Date;
  text: string;
};

export default function dayHeaderContent(props: DayHeaderContentProps) {
  const isWeekend = props.date.getDay() === 0 || props.date.getDay() === 6;

  return (
    <div className="flex flex-col items-center">
      <span>{props.text}</span>
      {isWeekend && (
        <span className="text-xs text-muted-foreground">Zárva</span>
      )}
    </div>
  );
};
