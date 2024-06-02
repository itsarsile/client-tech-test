import { type ClassValue, clsx } from "clsx"
import { format } from 'date-fns'
import { fromZonedTime } from "date-fns-tz"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRoboHash(text: string, size = 200) {
  const baseUrl = 'https://robohash.org/';
  const encodedText = encodeURIComponent(text); // Encode the text for URL
  return `${baseUrl}${encodedText}.png?size=${size}x${size}`;
}

export function formatTime(time: string) {
  const parsedTime = fromZonedTime(`1970-01-01T${time}Z`, "Asia/Jakarta");
  return format(parsedTime, "h:mm a");
}

export function convertToUTCTimeString(localTime: string) {
  const date = new Date(`1970-01-01T${localTime}`);
  const utcHours = date.getUTCHours().toString().padStart(2, '0');
  const utcMinutes = date.getUTCMinutes().toString().padStart(2, '0');
  const utcSeconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${utcHours}:${utcMinutes}:${utcSeconds}`;
}

export function convertUTCToLocalTimeString(utcTime: string) {
  const date = new Date(`1970-01-01T${utcTime}Z`);
  return date.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function convertUTCToLocalDateTimeString(utcDateTime: string) {
  const date = new Date(utcDateTime);
  return date.toLocaleString('en-GB', { hour12: false });
}

