import type { configType } from '@/types/config';
export const metaData: configType = {
  site: {
    url: 'https://anzokiharu.jp',
    title: 'oimoテンプレート',
    type: 'website',
    image: {
      url: 'https://anzokiharu.jp/assets/images/OGP.png', //https://以降のURLを入力
      type: 'image/png',
      width: 1200,
      height: 630,
    },
    video: {
      url: '', //https://以降のURLを入力
      type: 'video/mp4',
      width: 1280,
      height: 720,
    },
    themeColor: {
      default: '#000000',
      light: '#ffffff',
      dark: '#000000',
    },
    windowsBgColor: '#ffffff',
    statusBarStyle: 'default', //時計などが表示されてるbarのスタイル
    keywords: 'oimo',
    icon: '',
    icon16: '',
    icon32: '',
    icon192: '',
    icon256: '',
    shortcutIcon: '',
    twitter: {
      userId: '@oimonymous',
      cardType: 'summary_large_image',
    },
  },
  pages: {
    top: {
      title: 'oimoTemp',
      description: 'oimoTempです',
    },
    test: {
      title: 'oimoTempTest',
      description: 'oimoTempTestです',
    },
  },
};
