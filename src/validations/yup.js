import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "You must fill in this field.",
  },
  string: {
    email: "Enter a valid email address.",
    min: "This field must be a minimum of ${min} characters long.",
    max: "This field must be a maximum of ${min} characters long.",
    url: "Enter a valid URL.",
  },
  boolean: {
    oneOf: "You must mark this field.",
  },
});

export default Yup;
