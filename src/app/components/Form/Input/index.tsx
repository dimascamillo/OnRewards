interface InputGenericProps {
  type: string;
  placeholder: string;
  name: string;
  register: any;
}

export default function InputGeneric({
  type,
  placeholder,
  name,
  register,
}: InputGenericProps) {
  return (
    <input
      className="w-full h-16 p-4 text-color bg-gray-primary-500 rounded-xl"
      type={type}
      placeholder={placeholder}
      name={name}
      {...register(name)}
    />
  );
}
