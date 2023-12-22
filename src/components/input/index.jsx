import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

export default function Input({ label, name, ...props }) {
  return (
    <div>
      {label && <div className="mb-2.5 text-sm text-black">{label}</div>}
      <Field
        name={name}
        autoComplete="off"
        className="w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400"
        {...props}
      />
      <ErrorMessage
        component="small"
        name={name}
        className="text-xs text-red-400 mt-1 block"
      />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  props: PropTypes.object,
};
