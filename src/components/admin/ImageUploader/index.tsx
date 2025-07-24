"use client";

import { uploadImageAction } from "@/actions/upload/upload-image-action";
import { Button } from "@/components/Button";
import { IMAGE_UPLOADER_MAX_SIZE } from "@/lib/post/constants";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState("");

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImgUrl("");
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl("");
      return;
    }

    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOADER_MAX_SIZE / 1024;
      toast.error(
        `A imagem excede o tamanho limite. Máx.: ${readableMaxSize}kB`
      );

      fileInput.value = "";
      setImgUrl("");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        return;
      }
      setImgUrl(result.url);
      toast.success("Imagem enviada.");
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <Button
        onClick={handleChooseFile}
        type="button"
        variant="ghost"
        disabled={isUploading}
      >
        <ImageUpIcon />
        Enviar uma Imagem
      </Button>

      {!!imgUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b>
            {imgUrl}
          </p>
          {/* eslint-disable-next-line */}
          <img className="rounded-lg" src={imgUrl} />
        </div>
      )}

      <input
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
        name="file"
        type="file"
        accept="image/*"
      />
    </div>
  );
}
