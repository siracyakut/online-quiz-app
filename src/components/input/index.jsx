import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Input({ label, name, variant, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label && <div className="mb-2.5 text-sm text-black">{label}</div>}
      {variant === "pass" ? (
        <div className="relative">
          <Field
            name={name}
            autoComplete="off"
            className="pr-8 w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400 disabled:opacity-50 disabled:border-red-600 disabled:cursor-not-allowed"
            {...props}
            type={visible ? "text" : "password"}
          />
          <button type="button" onClick={() => setVisible((prev) => !prev)}>
            {!visible ? (
              <FaEye className="cursor-pointer absolute top-3 right-2" />
            ) : (
              <FaEyeSlash className="cursor-pointer absolute top-3 right-2" />
            )}
          </button>
        </div>
      ) : (
        <Field
          name={name}
          autoComplete="off"
          className="w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400 disabled:opacity-50 disabled:border-red-600 disabled:cursor-not-allowed"
          {...props}
        />
      )}
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
  variant: PropTypes.string,
  label: PropTypes.string,
  props: PropTypes.object,
};
