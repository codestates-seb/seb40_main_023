import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type NorifyProps = {
  message: string;
  icon?: any;
};

export const notifyWarning = ({ message, icon }: NorifyProps) => {
  toast(message, { type: "warning", icon });
};

export const notifyInfo = ({ message, icon }: NorifyProps) => {
  toast(message, { type: "info", icon });
};

export const notifySuccess = ({ message, icon }: NorifyProps) => {
  toast(message, { type: "success", icon });
};

export const notifyError = ({ message, icon }: NorifyProps) => {
  toast(message, { type: "error", icon });
};

export const Toast = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
      limit={0}
      icon={false}
    />
  );
};
