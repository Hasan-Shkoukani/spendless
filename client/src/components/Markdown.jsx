import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const Markdown = ({ text }) => {
  const html = DOMPurify.sanitize(marked.parse(text));
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;