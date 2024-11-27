import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  //site: 'https://anzokiharu.jp',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/assets/style/utils/_utils.scss"; `,
        },
      },
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: (chunk) => {
            const { name } = chunk;
            if (name === 'global') {
              return 'global.js';
            }
            // ディレクトリ名とページ名を組み合わせたファイル名を生成
            const parts = name.split('/');
            const dirName = parts.join('_') + name; // ディレクトリ名をアンダースコアで連結
            return `assets/scripts/${dirName}.js`;
          },
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(-1);
            if (/js|jsx|ts|tsx/i.test(extType)) {
              extType = 'scripts';
            }
            if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            }
            if (/css|scss/i.test(extType)) {
              extType = 'styles';
            }
            if (/woff|woff2|ttf/i.test(extType)) {
              extType = 'font';
            }
            return `assets/${extType}/[name].[ext]`;
          },
        },
      },
    },
    server: {
      watch: {
        ignored: ['**/dist/**'],
      },
    },
  },
  outDir: 'dist/',
  base: '/',
  compressHTML: true,
  integrations: [
    {
      name: 'chunkFileNames-for-client',
      hooks: {
        'astro:build:setup': ({ vite, target }) => {
          if (target === 'client') {
            vite.build.rollupOptions.output.chunkFileNames = () => {
              return `assets/scripts/chunks/[name].js`;
            };
          }
        },
      },
    },
  ],
  server: {
    port: 3001,
    host: true,
  },
});
