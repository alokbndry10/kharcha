type FieldErrorProps = {
  message?: string | null;
};

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return <p className="text-sm font-normal text-red-500">{message}</p>;
}
