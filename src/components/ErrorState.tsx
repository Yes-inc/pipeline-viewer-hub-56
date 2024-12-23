interface ErrorStateProps {
  title?: string;
  message: string;
}

const ErrorState = ({ title = "Error", message }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h3 className="text-lg font-semibold text-red-600 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default ErrorState;