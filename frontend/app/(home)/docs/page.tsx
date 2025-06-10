import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "../../../app/markdown.css";
import "highlight.js/styles/github-dark.css";

/**
 * Renders the content of the frontend/content/doc.md file as Markdown.
 */
export default async function DocsPage() {
  // Read the markdown file from the filesystem
  const filePath = path.join(process.cwd(), "content", "doc.md");
  const markdown = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="markdown-body center-intro">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
