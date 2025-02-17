import type { File, Folder } from "~/lib/mock-data";
import { File as FileIcon, Folder as FolderIcon } from "lucide-react";
import Link from "next/link";

export function FileRow(props: { file: File }) {
    const { file } = props;
    return (
      <li
        key={file.id}
        className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3 flex-1">
          <FileIcon className="h-5 w-5 text-gray-400" />
          <Link
            href={file.url}
            className="text-gray-200 font-medium hover:text-blue-400 transition-colors duration-200"
            target="_blank"
          >
            {file.name}
          </Link>
        </div>
        <span className="text-sm text-gray-400 tabular-nums">{file.size}</span>
      </li>
    );
}

export function FolderRow(props: {
    folder: Folder;
    handleFolderClick: () => void;
}) {
    const { folder, handleFolderClick } = props;
  return (
    <li
      className="flex items-center px-4 py-3 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 cursor-pointer group"
      onClick={() => handleFolderClick()}
    >
      <FolderIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
      <span className="text-gray-200 font-medium group-hover:text-blue-400 transition-colors duration-200">
        {folder.name}
      </span>
    </li>
  );
}