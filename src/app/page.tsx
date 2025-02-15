"use client"

import React, { useState } from "react"
import { Folder, File, ChevronRight, Upload, Home } from "lucide-react"
import Link from "next/link"

import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"

// Mock data for files and folders
const initialData = [
  {
    id: 1,
    name: "Documents",
    type: "folder",
    children: [
      {
        id: 2,
        name: "Work",
        type: "folder",
        children: [
          { id: 3, name: "Project Proposal.docx", type: "file", size: 2500000, fileType: "docx" },
          { id: 4, name: "Budget.xlsx", type: "file", size: 1800000, fileType: "xlsx" },
        ],
      },
      {
        id: 5,
        name: "Personal",
        type: "folder",
        children: [
          { id: 6, name: "Resume.pdf", type: "file", size: 500000, fileType: "pdf" },
          { id: 7, name: "Family Photo.jpg", type: "file", size: 3500000, fileType: "jpg" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Downloads",
    type: "folder",
    children: [
      { id: 9, name: "Movie.mp4", type: "file", size: 1500000000, fileType: "mp4" },
      { id: 10, name: "Song.mp3", type: "file", size: 8000000, fileType: "mp3" },
    ],
  },
  { id: 11, name: "README.md", type: "file", size: 2000, fileType: "md" },
]

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState(initialData)
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: "My Drive", data: initialData }])

  const handleFolderClick = (folder: typeof initialData[number]) => {
    setCurrentFolder(folder.children ?? [])
    setBreadcrumbs([...breadcrumbs, { name: folder.name, data: folder.children ?? [] }])
  }

  const handleBreadcrumbClick = (index: number) => {
    setCurrentFolder(breadcrumbs[index]?.data ?? [])
    setBreadcrumbs(breadcrumbs.slice(0, index + 1))
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-4">Google Drive Clone</h1>
        <Button className="w-full mb-4">
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
        <nav>
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" /> My Drive
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Breadcrumbs */}
        <div className="flex items-center mb-4">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => handleBreadcrumbClick(index)}
              >
                {crumb.name}
              </Button>
              {index < breadcrumbs.length - 1 && <ChevronRight className="mx-2 h-4 w-4" />}
            </React.Fragment>
          ))}
        </div>

        {/* File/Folder list */}
        <ScrollArea className="h-[calc(100vh-8rem)] rounded-md border border-gray-700">
          <div className="p-4">
            {currentFolder.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 hover:bg-gray-800 rounded cursor-pointer"
                onClick={() => item.type === "folder" && handleFolderClick(item)}
              >
                <div className="flex items-center">
                  {item.type === "folder" ? (
                    <Folder className="mr-2 h-5 w-5 text-yellow-400" />
                  ) : (
                    <File className="mr-2 h-5 w-5 text-blue-400" />
                  )}
                  {item.type === "folder" ? (
                    <span>{item.name}</span>
                  ) : (
                    <Link href="#" className="text-blue-400 hover:underline">
                      {item.name}
                    </Link>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {item.type === "folder"
                    ? `${item.children?.length} item${item.children?.length !== 1 ? "s" : ""}`
                    : `${formatFileSize(item.size ?? 0)} • ${item.fileType?.toUpperCase()}`}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}