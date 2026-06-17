type EmptyStateProps = {
  message?: string;
};

const EmptyState = ({
  message = "No data found.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;