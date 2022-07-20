export const validate = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value || value.trim() === "") {
          return "First name is Required";
        } else {
          return "";
        }
      case "lastName":
        if (!value || value.trim() === "") {
          return "Last name is Required";
        } else {
          return "";
        }
      case "email":
        if (!value) {
          return "Email is Required";
        } else if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
          return "Enter a valid email address";
        } else {
          return "";
        }
      case "phone":
        if (!value || value.trim() === "") {
          return "Mobile number is Required";
        } else if (!value.match(/^[6-9]\d{9}$/)) {
          return "Enter a valid mobile number.";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };
  