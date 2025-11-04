'use client'

import { useState, useRef } from 'react'
import { Camera, X } from 'lucide-react'

interface AvatarUploadProps {
  currentPhotoUrl?: string | null
  firstName: string
  lastName: string
  onPhotoChange: (file: File | null) => void
  error?: string
}

export default function AvatarUpload({
  currentPhotoUrl,
  firstName,
  lastName,
  onPhotoChange,
  error,
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      onPhotoChange(file)
    }
  }

  const handleRemovePhoto = () => {
    setPreviewUrl(null)
    onPhotoChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="col-span-full">
      <div className="flex items-center gap-x-8">
        <div className="relative group">
          {previewUrl ? (
            <>
              {/* <image
                src={previewUrl}
                alt="Profile"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover"
              /> */}
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gray-500">
              <span className="text-3xl font-medium leading-none text-white">
                {initials}
              </span>
            </span>
          )}
          <button
            type="button"
            onClick={handleButtonClick}
            className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          >
            <Camera className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Change photo
          </button>
          <p className="mt-2 text-xs leading-5 text-gray-400">
            JPG, GIF or PNG. 1MB max.
          </p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  )
}