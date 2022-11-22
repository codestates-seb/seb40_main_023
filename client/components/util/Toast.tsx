import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { NotifyProps } from "../../types/basic";

export const notifyWarning = ({ message, icon }: NotifyProps) => {
  toast(message, { type: "warning", icon });
};

export const notifyInfo = ({ message, icon }: NotifyProps) => {
  toast(message, { type: "info", icon });
};

export const notifySuccess = ({ message, icon }: NotifyProps) => {
  toast(message, { type: "success", icon });
};

export const notifyError = ({ message, icon }: NotifyProps) => {
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
