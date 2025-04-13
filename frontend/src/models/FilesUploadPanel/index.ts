export interface FormData {
  video: File | null;
  images: File[];
  text: string;
}

export interface DropZoneProps<T> {
  onChange: (files: T) => void;
}

export interface TextInputProps {
  onTextChange: (text: string) => void;
}
