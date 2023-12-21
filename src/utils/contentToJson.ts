import jdown from 'jdown';
import { getHighlighter } from 'shiki';
import config from '@src/config';

const highlighter = await getHighlighter({ theme: 'monokai' });

const content = await jdown(config.content.source, {
  markdown: {
    hightlight: (code, lang) => highlighter.codeToHtml(code, lang),
  },
  fileInfo: false,
});

await Bun.write(config.content.sink, JSON.stringify(content)),
  console.log('✅ Content indexed successfully!');
