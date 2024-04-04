import { toast } from "react-toastify";
import { z } from "zod";

const msgAlertSchema = z.object({
  type: z.string(),
  text: z.string(),
});

type MsgAlertSchema = z.infer<typeof msgAlertSchema>;

export default function useMensageAlert() {
  return ({ type, text }: MsgAlertSchema) => {
    switch (type) {
      case "success":
        toast.success(text, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case "error":
        toast.error(text, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      default:
        toast(text, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  };
}
