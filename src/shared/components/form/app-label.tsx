type Props = {
  children?: string;
  required?: boolean;
};
export function AppLabel(props: Props) {
  const { children, required = false } = props;

  if (!children) return null;

  return (
    <p className="text-base	font-medium	text-text-400">
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </p>
  );
}
