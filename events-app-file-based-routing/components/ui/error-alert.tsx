import classes from "./error-alert.module.css";
const ErrorAlert: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
