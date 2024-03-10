import { FieldProps } from "../../types/Auth";



const Field = ({ field, onChange, value }: FieldProps & { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, value: string }): JSX.Element => {
  return (
    <div className="relative block w-full">
      <label htmlFor={field.name} className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input
          type={field.type}
          id={field.name}
          name={field.name} 
          value={value}
          onChange={onChange}
          className="peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-4 rounded-md"
          placeholder={field.placeholder}
        />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          {field.label}
        </span>
      </label>
    </div>
  );
};


export default Field;