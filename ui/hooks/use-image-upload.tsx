import { useEffect, useState } from 'react';

export interface FileWithPreview extends File {
  preview: string;
}

export default function useImageUpload(assetId?: string) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  useEffect(() => {
    setFiles([]);
  }, [assetId]);

  return { files, setFiles };
}
