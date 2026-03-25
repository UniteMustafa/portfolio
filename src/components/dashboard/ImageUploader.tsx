"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

interface ImageUploaderProps {
  /** Current image URL value */
  value: string;
  /** Called with the new URL after a successful upload, or "" when removed */
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const upload = useCallback(
    async (file: File) => {
      setError("");
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();

        if (!res.ok || json.error) {
          setError(json.error || "Upload failed. Please try again.");
          return;
        }

        onChange(json.url as string);
      } catch {
        setError("Upload failed. Check your connection and try again.");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  const handleRemove = () => {
    onChange("");
    setError("");
  };

  // If we already have an image, show a preview
  if (value) {
    return (
      <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#14141a]">
        <div className="relative h-[200px] w-full">
          <Image
            src={value}
            alt="Cover image preview"
            fill
            className="object-cover"
          />
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-bg font-mono text-xs font-bold hover:bg-accent-hover transition-colors"
          >
            <FiUpload size={13} /> Replace
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 font-mono text-xs font-bold hover:bg-red-500/30 transition-colors"
          >
            <FiX size={13} /> Remove
          </button>
        </div>
        {uploading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  // Upload drop zone
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-accent bg-accent/5 scale-[1.01]"
            : "border-white/10 bg-[#14141a] hover:border-accent/40 hover:bg-accent/5"
        }`}
      >
        {uploading ? (
          <>
            <span className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            <p className="font-mono text-xs text-muted">Uploading...</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <FiImage size={22} className="text-accent" />
            </div>
            <div className="text-center">
              <p className="font-mono text-sm text-white font-semibold">
                Drop an image or{" "}
                <span className="text-accent underline underline-offset-2">
                  browse files
                </span>
              </p>
              <p className="font-mono text-xs text-muted mt-1">
                JPEG, PNG, WebP or GIF &bull; Max 5 MB
              </p>
            </div>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-2 font-mono text-xs text-red-400 flex items-center gap-1.5">
          {error}
        </p>
      )}
    </div>
  );
}
