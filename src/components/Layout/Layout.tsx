import { SmallLoadingSpinner } from "../Loader/Loader";

interface SpacerProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Spacer = ({ width, height, className }: SpacerProps) => {
  return <div style={{ width, height }} className={className || ""}></div>;
};

// interface InputProps {
//   type: string;
//   className?: string;
//   onChange?: HTMLInputElement;
//   placeholder?: string;
//   outerClassName?: string;
// }

interface ButtonProps {
  className?: string;
  onClick: () => void;
  isBusy: boolean;
  name: string;
}

export const AppInput = ({
  type,
  className,
  onChange,
  placeholder,
  outerClassName,
  label,
  name,
}) => {
  return (
    <div className={outerClassName}>
      {label && <label className="ilabel">{label}</label>}
      <input
        onChange={onChange}
        className={`${className} app-input`}
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export const AppButton = ({
  onClick,
  isBusy,
  name,
  className,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${className} button`}>
      {isBusy ? <SmallLoadingSpinner /> : name}
    </button>
  );
};

export const EmptyComponent = () => {
  return (
    <div className="full-width full-height d-flex justify-center align-center flex-column ">
      <p className="fw600 fontSize-13em">Not Found</p>
      <p className="fontSize-12em">The article could not be found</p>
    </div>
  );
};
