import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)
}

export function isValidFileType(file, acceptedTypes) {
  const fileExtension = getFileExtension(file.name).toLowerCase()
  return acceptedTypes.some(type => {
    if (type.startsWith('.')) {
      return type.toLowerCase() === `.${fileExtension}`
    }
    return file.type.match(type)
  })
}