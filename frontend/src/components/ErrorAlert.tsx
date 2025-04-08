import { IoIosInformationCircleOutline } from "react-icons/io";
interface ErrorAlertProps {
    message: string;
  }
  
  export const ErrorAlert = ({ message }: ErrorAlertProps) => {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mt-6">
        <div className="flex items-center">
          <IoIosInformationCircleOutline size={20} className="text-red-600 mr-2" />
          <p className="text-red-600 font-medium">{message}</p>
        </div>
      </div>
    );
  };
  