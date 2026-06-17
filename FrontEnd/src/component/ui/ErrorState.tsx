type ErrorStateProps = {
  error: string;
  onRetry?: () => void;
};

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="mb-4 text-red-500">{error}</p>

      <button
        onClick={onRetry || (() => window.location.reload())}
        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;