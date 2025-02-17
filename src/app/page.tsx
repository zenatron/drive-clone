"use client"

import React, { useMemo, useState } from "react"
import { ChevronRight, Upload, Home } from "lucide-react"

import { Button } from "~/components/ui/button"
import { mockFolders, mockFiles } from "~/lib/mock-data"
import { FileRow, FolderRow } from "./file-row"

// const formatFileSize = (bytes: number) => {
//   if (bytes === 0) return "0 Bytes"
//   const k = 1024
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
//   const i = Math.floor(Math.log(bytes) / Math.log(k))
//   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
// }

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");

  const breadcrumbs = useMemo(() => {
    const path = [];
    
    // Always start with root
    path.push({ id: "root", name: "My Drive", type: "folder" as const, parent: null });
    
    // If we're not at root, find the current folder
    if (currentFolder !== "root") {
      const current = mockFolders.find(f => f.id === currentFolder);
      if (current) {
        // If it's a direct child of root, just add it
        if (current.parent === "root") {
          path.push(current);
        } else {
          // Otherwise, find its parent
          const parent = mockFolders.find(f => f.id === current.parent);
          if (parent) path.push(parent);
          path.push(current);
        }
      }
    }
    
    return path;
  }, [currentFolder]);

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  }

  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder);
  }

  const handleFolderClick = (folder: (typeof mockFolders)[number]) => {
    setCurrentFolder(folder.id)
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-6 flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-gray-100">Drive Clone</h1>
        
        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => {
              setCurrentFolder("root")
            }} 
            className="w-full justify-start text-gray-300 hover:text-gray-100 hover:bg-gray-800/50"
          >
            <Home className="mr-2 h-4 w-4" /> My Drive
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1 mb-6">
          {breadcrumbs.map((folder, index) => (
            <div key={folder.id} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-600" />}
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-gray-300 px-2 h-auto font-medium"
                onClick={() => handleFolderClick(folder)}
              >
                {folder.name}
              </Button>
            </div>
          ))}
        </nav>

        {/* File/Folder list */}
        <ul className="space-y-1">
          {getCurrentFolders().map((folder) => (
            <FolderRow
              key={folder.id}
              folder={folder}
              handleFolderClick={() => handleFolderClick(folder)}
            />
          ))}
          {getCurrentFiles().map((file) => (
            <FileRow
              key={file.id}
              file={file}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}