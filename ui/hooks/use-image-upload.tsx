import { useEffect, useState } from 'react';

export interface FileWithPreview extends File {
  preview: string;
}

export default function useImageUpload(assetId?: string) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const addFiles = (filesToAdd: FileWithPreview[]) => setFiles(filesToAdd);

  const clearFiles = () => setFiles([]);

  useEffect(() => {
    setFiles([]);
  }, [assetId]);

  return { files, addFiles, clearFiles };
}
