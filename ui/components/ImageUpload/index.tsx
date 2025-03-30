import { FileWithPreview } from '@/ui/hooks/use-image-upload';
import Image from 'next/image';
import { FunctionComponent, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import UIImage from '../Image';

interface UIImageUploadProps {
  files: FileWithPreview[];
  setFiles: (files: FileWithPreview[]) => void;
}

const UIImageUpload: FunctionComponent<UIImageUploadProps> = ({
  files,
  setFiles,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="h-full flex flex-col max-h-[264px]">
      {files.length === 1 && (
        <div className="h-full w-full rounded overflow-hidden">
          <UIImage src={files[0].preview} alt="" cover />
        </div>
      )}
      {files.length === 0 && (
        <div
          {...getRootProps({
            className:
              'h-full flex flex-col gap-4 grow items-center justify-center p-4 rounded border border-dashed border-primary-500 bg-primary-50',
          })}
        >
          <input {...getInputProps()} />
          <Image
            src="/image-upload.svg"
            alt=""
            width={44}
            height={44}
            className="w-auto h-auto"
          />
          <p className="text-primary-500 text-sm">Adicionar imagem do Ativo</p>
        </div>
      )}
    </div>
  );
};

export default UIImageUpload;
