export interface SelectorProps {
  onChange: (value: number, label: string) => void;
  value: number;
  label: string;
  isReset?: boolean;
  className?: any;
  disabled?: boolean;
  valueLabel?: string;
  practiceId: number;
}
