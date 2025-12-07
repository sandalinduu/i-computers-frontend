// import { createClient } from "@supabase/supabase-js";

// const url = "https://rzzvovavivrvktpgxrhy.supabase.co";
// const key =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6enZvdmF2aXZydmt0cGd4cmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzQ3NTUsImV4cCI6MjA3ODExMDc1NX0.MW5RxyY8PgEe6_1ik6G48RO_d17Rg4H6XUKxMDu6qWM";

// const supabase = createClient(url, key);

// export default function uploadFile(file) {
// 	return new Promise((resolve, reject) => {
// 		const timeStamp = Date.now();
// 		const fileName = timeStamp + "_" + file.name;
// 		supabase.storage.from("images").upload(fileName, file, {
// 			cacheControl: "3600",
// 			upsert: false,
// 		}).then(
//             ()=>{
//                 const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
//                 resolve(publicUrl);
//             }
//         ).catch((error)=>{
//             reject(error);
//         })
// 	});
// }



import { createClient } from "@supabase/supabase-js";

const url = "https://rzzvovavivrvktpgxrhy.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6enZvdmF2aXZydmt0cGd4cmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzQ3NTUsImV4cCI6MjA3ODExMDc1NX0.MW5RxyY8PgEe6_1ik6G48RO_d17Rg4H6XUKxMDu6qWM";

const supabase = createClient(url, key);

const BUCKET = "images";  // <-- Must be a string

export default async function uploadFile(file) {
  try {
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (error) {
      throw error;
    }

    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    return publicData.publicUrl;

  } catch (err) {
    console.log("File Upload Failed:", err.message);
    return null;
  }
}

