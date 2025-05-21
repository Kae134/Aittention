import UploadForm from "./upload-form";

export default function ImageUpload() {
  return (
    <div className="relative mx-auto pt-10 flex flex-col gap-4 items-center w-full max-w-3xl">
      <UploadForm />
    </div>
  );
}