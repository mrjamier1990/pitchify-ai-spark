import * as React from "react"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  onUpload: (files: File[]) => void
  maxSize?: number // in MB
  className?: string
  placeholder?: string
  description?: string
}

export function FileUpload({
  accept,
  multiple = false,
  onUpload,
  maxSize = 10,
  className,
  placeholder = "Upload file",
  description
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const sizeMB = file.size / (1024 * 1024)
      return sizeMB <= maxSize
    })

    if (multiple) {
      setUploadedFiles(prev => [...prev, ...validFiles])
      onUpload([...uploadedFiles, ...validFiles])
    } else {
      setUploadedFiles(validFiles.slice(0, 1))
      onUpload(validFiles.slice(0, 1))
    }
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    onUpload(newFiles)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        role="button"
        tabIndex={0}
      >
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
        <p className="text-sm font-medium mb-2">{placeholder}</p>
        {description && (
          <p className="text-xs text-muted-foreground mb-4">{description}</p>
        )}
        <Button variant="outline" size="sm">
          Choose File{multiple ? 's' : ''}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Max size: {maxSize}MB {accept && `• ${accept}`}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}