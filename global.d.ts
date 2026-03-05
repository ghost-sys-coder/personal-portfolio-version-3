declare module "*.css"

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  projectUrl: string;
  tags: string[];
  featured?: boolean;
  credentials?: Credentials;
}