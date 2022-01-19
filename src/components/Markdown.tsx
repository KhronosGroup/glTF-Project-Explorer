import React, { useState, useEffect } from "react";
import { marked } from "marked";
import purify from "dompurify";

interface IMarkdown {
  className: string;
  body: string;
}

const parseAndSanitizeMarkdown = (md: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    marked(md, (err, result) => {
      if (err) reject(err);

      // Marked does not sanitize the html, so we must do so ourselves.
      resolve(purify.sanitize(result));
    });
  });
};

const Markdown: React.FC<IMarkdown> = (props) => {
  const { className, body: unsafeMarkdown } = props;

  const [safeHtml, setSafeHtml] = useState({ __html: "" });

  // This effect is for performance reasons. It will only execute if the value
  //   of the body prop is updated.
  useEffect(() => {
    parseAndSanitizeMarkdown(unsafeMarkdown).then((result) =>
      setSafeHtml({ __html: result })
    );
  }, [unsafeMarkdown]);

  return <div className={className} dangerouslySetInnerHTML={safeHtml}></div>;
};

export default Markdown;
