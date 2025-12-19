/* eslint-disable prettier/prettier */

import { db } from "@/utils/firebase"
import { collection, getDocs } from "firebase/firestore"

// Extract and normalize filename from Firebase Storage URL
const extractFilename = (url: string | {
  url: string;
  name: string;
}): string => {
  if (!url) return "";

  console.log("Extracting filename from URL:", url);
  
  if (typeof url !== "string" && 'url' in url) {
    url = url.url;
  }

  try {
    // Extract the path part between /o/ and ?alt=
    const match = url.match(/\/o\/(.+?)\?/);

    if (!match) return "";
    
    // Decode URL encoding (e.g., %2F to /)
    const decodedPath = decodeURIComponent(match[1]);
    
    // Get the filename (part after last /)
    const parts = decodedPath.split('/');
    let filename = parts[parts.length - 1];
    
    // Remove timestamp prefix if present (e.g., "1764800068356_aerobic3.jpg" -> "aerobic3.jpg")
    filename = filename.replace(/^\d+_/, '');
    
    return filename.toLowerCase();
  } catch (e) {
    console.error("Error extracting filename from URL:", e);
    
    return "";
  }
};

export const getImageUses = async (imageUrl: string): Promise<Array<{
  id: string;
  name: string;
}>> => {
  const servicesCollection = collection(db, "newreservation")
  const servicesSnapshot = await getDocs(servicesCollection)

  const uses: Array<{
    id: string;
    name: string;
  }> = []

  const targetFilename = extractFilename(imageUrl);
  
  if (!targetFilename) return uses;

  servicesSnapshot.forEach((doc) => {
    const data = doc.data()

    // Check main image
    if (data.img && extractFilename(data.img) === targetFilename) {
      uses.push({
        id: doc.id,
        name: data.name || "Nincs név",
      })
    }

    // Check carousel images
    if(data.content && data.content.images && Array.isArray(data.content.images)) {
      const hasMatch = data.content.images.some((imgUrl: string) => 
        extractFilename(imgUrl) === targetFilename
      );
      
      if (hasMatch && !uses.some(u => u.id === doc.id)) {
        uses.push({
          id: doc.id,
          name: data.name || "Nincs név",
        })
      }
    }
  })

  return uses
}
