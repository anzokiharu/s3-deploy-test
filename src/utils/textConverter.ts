import { marked } from 'marked';

export class TextConverter {
  // humanize
  public static humanize(content: string): string {
    return content
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
      .replace(/[-\s]+/g, ' ')
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
  }

  // titleify
  public static titleify(content: string): string {
    const humanized = this.humanize(content);
    return humanized
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // convertBr
  public static convertBr(text: string): string {
    return text.replace(/<br(.*?)>/g, '<br$1 tabindex="-1"/>');
  }

  // plainify

  public static plainify(content: string) {
    const parseMarkdown = <string>marked.parse(content);
    const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, '');
    const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, '');
    const stripHTML = this.htmlEntityDecoder(filterSpaces);
    return stripHTML;
  }

  // strip entities for plainify
  public static htmlEntityDecoder(htmlWithEntities: string) {
    const entityList: { [key: string]: string } = {
      '&nbsp;': ' ',
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&#39;': "'",
    };
    const htmlWithoutEntities = htmlWithEntities.replace(
      /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
      (entity: string): string => {
        return entityList[entity];
      },
    );
    return htmlWithoutEntities;
  }
}
