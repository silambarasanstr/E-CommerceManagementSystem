type LabelProps = {
  text: string;
   htmlFor?: string;
};

const Label = ({ text,htmlFor }: LabelProps) => {
  return (
    <div>
      <div className="mb-2">
        <label htmlFor={htmlFor} className="font-medium">{text}</label>
      </div>
    </div>
  );
};

export default Label;
