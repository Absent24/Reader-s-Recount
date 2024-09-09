import { createClient } from "@supabase/supabase-js";

const bucket = "RRImages";

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  if (!data) throw new Error("Image Upload Failed!");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = async (path: string) => {
  const img = path.substring(path.lastIndexOf("/") + 1);
  await supabase.storage.from(bucket).remove([img]);
};

export const imageExists = async (path: string) => {
  const img = path.substring(path.lastIndexOf("/") + 1);
  const { data } = await supabase.storage.from(bucket).exists(img);
  return data;
};
