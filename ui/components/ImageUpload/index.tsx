import { FileWithPreview } from '@/ui/hooks/use-image-upload';
import Image from 'next/image';
import { FunctionComponent, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import UIImage from '../Image';
import { UIButton } from '../Button';

interface UIImageUploadProps {
  files: FileWithPreview[];
  addFiles: (files: FileWithPreview[]) => void;
  clearFiles: () => void;
}

const UIImageUpload: FunctionComponent<UIImageUploadProps> = ({
  files,
  addFiles,
  clearFiles,
}) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/*': ['image/png', 'image/jpeg'],
      },
      onDrop: (acceptedFiles) => {
        addFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const dropzoneStyle = useMemo(() => {
    if (isFocused) {
      return 'border-2 border-primary-500';
    }

    if (isDragReject) {
      return 'border-2 border-feedback-danger';
    }

    if (isDragAccept) {
      return 'border-2 border-feedback-success';
    }

    return 'border-primary-500';
  }, [isDragAccept, isDragReject, isFocused]);

  const message = useMemo(() => {
    if (isDragReject) {
      return 'Formato de imagem não suportado';
    }

    if (isDragAccept) {
      return 'Adicionar imagem do Ativo';
    }

    return 'Adicionar imagem do Ativo';
  }, [isDragAccept, isDragReject]);

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="h-full flex flex-col max-h-[264px]">
      {files.length === 1 && (
        <div className="h-full w-full rounded overflow-hidden relative border border-border-card">
          <div className="absolute top-1 right-1">
            <UIButton
              variant="danger"
              size="icon"
              icon={{ position: 'center', src: '/remove.svg', size: 18 }}
              onClick={clearFiles}
            />
          </div>
          <UIImage src={files[0].preview} alt="" cover />
        </div>
      )}
      {files.length === 0 && (
        <div
          {...getRootProps({
            className: `h-full flex flex-col gap-4 grow items-center justify-center p-4 rounded border border-dashed bg-primary-50 transition duration-300 ease-in-out ${dropzoneStyle}`,
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
          <p className="text-primary-500 text-sm">{message}</p>
        </div>
      )}
    </div>
  );
};

export default UIImageUpload;
