import { ReactNode } from "react";

export type TextFieldTypes = {
  icon: ReactNode;
  placeHolder: string;
  type?: string;
  error: string;
  value: string;
  onChange: (newValue: string) => void;
  autoFocus? : boolean;
  isSubmit : boolean
};
