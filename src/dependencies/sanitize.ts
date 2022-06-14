import { compile as buildHtmlToTextConverter } from 'html-to-text';

import { Sanitize } from '@declarations';

const htmlToTextConverter = buildHtmlToTextConverter();

export const sanitize: Sanitize = Object.freeze((input: string) =>
  htmlToTextConverter(input),
);
