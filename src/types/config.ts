export type configType = {
  site: {
    url: string;
    title: string;
    type: 'website' | 'article' | 'product';
    keywords: string;
    icon: string;
    icon16: string;
    icon32: string;
    icon192: string;
    icon256: string;
    shortcutIcon: string;
    image: {
      url: string;
      type: 'image/png' | 'image/jpeg' | 'image/gif';
      width: number;
      height: number;
    };
    video: {
      url: string;
      type: 'video/mp4' | 'application/x-shockwave-flash';
      width: number;
      height: number;
    };
    themeColor: {
      default: string;
      light: string;
      dark: string;
    };
    windowsBgColor: string;
    statusBarStyle: 'default' | 'black' | 'black-translucent';
    twitter: {
      userId?: string;
      cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
    };
  };
  pages: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
};
