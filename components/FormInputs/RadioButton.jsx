import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function RadioButton({ index, specificClassName, icon, value, title, chosenValue, setChosenValue }) {
  const formData = useSelector((store) => store.feedbackForm.formData);

  const {
    register,
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });

  return (
    <div key={index} className="glassBox" onClick={() => setChosenValue(value)}>
      <div className={`glassBox__svgBox ${specificClassName}`}>
        <input
          {...register("mood")}
          type="radio"
          value={value}
          id={`field-${value}`}
        />
        {icon}
        <h3 className={`glassBox__title ${chosenValue === value ? "text-amber-400 drop-shadow-lg" : "text-white"}`}>{title}</h3>
      </div>
    </div>
  );
}
