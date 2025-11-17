
export interface HeadshotStyle {
  id: string;
  name: string;
  prompt: string;
  imageUrl: string;
}

export interface UploadedImage {
  file: File;
  dataUrl: string;
  base64: string;
  mimeType: string;
}
