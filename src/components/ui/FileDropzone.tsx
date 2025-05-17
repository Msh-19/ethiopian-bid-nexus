
import React from "react";
import { useController, Control } from "react-hook-form";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  name: string;
  control: Control<any>;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ name, control }) => {
  const { field } = useController({ name, control });
  const onDrop = (files: File[]) => field.onChange(files as any);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer
                  ${isDragActive ? "border-blue-500" : "border-slate-300"}`}
    >
      <input {...getInputProps()} />
      {field.value?.[0] ? (
        <p className="text-sm">{field.value[0].name}</p>
      ) : (
        <p className="text-sm text-slate-500">
          Drag & drop a PDF here, or click to browse
        </p>
      )}
    </div>
  );
};
