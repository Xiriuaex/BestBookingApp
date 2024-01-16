import { useEffect } from "react";
import aos from 'aos';
import 'aos/dist/aos.css'; 

type ToastProps = {
    message: string,
    type: "SUCCESS" | "ERROR",
    onClose: () => void;
};
 
const Toast = ({ message, type, onClose }: ToastProps) => {
    aos.init({
        duration: 600
    });
    useEffect(() => {
        const timer = setTimeout(() => {
          onClose();
        }, 4000);
    
        return () => {
          clearTimeout(timer);
        };
      }, [onClose]);

    const styles = type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

    return (
        <div data-aos="zoom-in" className={styles}>
        <div className="flex justify-center items-center">
            <span className="text-lg font-semibold">{message}</span>
        </div>
        </div>
    );
}

export default Toast
