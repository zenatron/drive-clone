export type File = {
    id: string;
    name: string;
    type: "file";
    url: string;
    parent: string;
    size: string;
}

export type Folder = {
    id: string;
    name: string;
    type: "folder";
    parent: string | null;
}

export const mockFolders: Folder[] = [
    { id: "root", name: "root", type: "folder", parent: null },
    { id: "1", name: "Documents", type: "folder", parent: "root" },
    { id: "2", name: "Photos", type: "folder", parent: "root" },
    { id: "3", name: "Downloads", type: "folder", parent: "root" },
];

export const mockFiles: File[] = [
    {
        id: "101",
        name: "resume.pdf",
        type: "file",
        url: "/files/resume.pdf",
        parent: "1",
        size: "2.1 MB"
    },
    {
        id: "102", 
        name: "vacation.jpg",
        type: "file",
        url: "/files/vacation.jpg",
        parent: "2",
        size: "3.4 MB"
    },
    {
        id: "103",
        name: "project-notes.txt",
        type: "file",
        url: "/files/project-notes.txt", 
        parent: "1",
        size: "12 KB"
    },
    {
        id: "104",
        name: "family-photo.jpg",
        type: "file",
        url: "/files/family-photo.jpg",
        parent: "2",
        size: "5.2 MB"
    },
    {
        id: "105",
        name: "installer.exe",
        type: "file",
        url: "/files/installer.exe",
        parent: "3",
        size: "45.7 MB"
    }
];

