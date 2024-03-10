export interface AuthFormData {
  [key: string]: string | undefined;
  email: string;
  password: string;
  nickname?: string;
  password_confirmation?: string;
}


export interface AuthFormProps {
  type: string;
  onSubmit: () => void;
}


export interface FieldProps {
  field: {
    name: string;
    type: string;
    placeholder: string;
    label: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}


export interface RegisterData {
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
}
