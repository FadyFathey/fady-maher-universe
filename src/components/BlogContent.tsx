
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const { theme } = useTheme();

  const renderContent = () => {
    // Split content by code blocks (```language...```)
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      // Check if this part is a code block
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const lines = part.slice(3, -3).split('\n');
        const language = lines[0].trim() || 'text';
        const code = lines.slice(1).join('\n');
        
        return (
          <div key={index} className="my-6">
            <SyntaxHighlighter
              language={language}
              style={theme === 'dark' ? oneDark : oneLight}
              customStyle={{
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                padding: '1.5rem',
                margin: 0,
                background: theme === 'dark' ? 'hsl(var(--muted))' : 'hsl(var(--muted))',
              }}
              showLineNumbers={code.split('\n').length > 5}
              wrapLines={true}
              wrapLongLines={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      }
      
      // Regular content - split by paragraphs and headings
      return part.split('\n\n').map((paragraph, pIndex) => {
        if (paragraph.trim() === '') return null;
        
        const key = `${index}-${pIndex}`;
        
        // Check if it's a heading
        if (paragraph.startsWith('#')) {
          const headingLevel = paragraph.match(/^#+/)?.[0].length || 1;
          const headingText = paragraph.replace(/^#+\s*/, '');
          
          if (headingLevel === 1) {
            return (
              <h2 key={key} className="text-3xl font-bold text-foreground mt-12 mb-6 tracking-tight">
                {headingText}
              </h2>
            );
          } else if (headingLevel === 2) {
            return (
              <h3 key={key} className="text-2xl font-semibold text-foreground mt-10 mb-4 tracking-tight">
                {headingText}
              </h3>
            );
          } else {
            return (
              <h4 key={key} className="text-xl font-medium text-foreground mt-8 mb-3 tracking-tight">
                {headingText}
              </h4>
            );
          }
        }
        
        // Check for inline code (backticks)
        if (paragraph.includes('`')) {
          const parts = paragraph.split(/(`[^`]+`)/g);
          return (
            <p key={key} className="mb-6 text-foreground/90 leading-relaxed text-lg">
              {parts.map((part, partIndex) => {
                if (part.startsWith('`') && part.endsWith('`')) {
                  return (
                    <code 
                      key={partIndex} 
                      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono font-medium text-foreground"
                    >
                      {part.slice(1, -1)}
                    </code>
                  );
                }
                return part;
              })}
            </p>
          );
        }
        
        // Regular paragraph
        return (
          <p key={key} className="mb-6 text-foreground/90 leading-relaxed text-lg">
            {paragraph}
          </p>
        );
      });
    });
  };

  return (
    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
      <div className="space-y-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default BlogContent;
