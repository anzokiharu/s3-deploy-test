import { writeFileSync, readFileSync } from 'fs';
import glob from 'fast-glob';
import path from 'path';

// htdocs ディレクトリ内のすべての .css ファイルを対象にする
const targetPattern = path.join(process.cwd(), 'dist/**/*.css');

// 置換前後のベースパス
const oldBasePath = '/assets/';

// CSS ファイルのパスを取得
const cssFiles = glob.sync(targetPattern);

// 各 CSS ファイルを処理
cssFiles.forEach((filePath) => {
  // CSS ファイルを読み込む
  const data = readFileSync(filePath, 'utf-8');

  // CSS ファイルのディレクトリパスを取得
  const cssDir = path.dirname(filePath);

  // 画像フォルダまでの相対パスを計算
  const relativePath = path.relative(cssDir, path.join(process.cwd(), 'dist/assets'));

  // 正規表現で url() 内の /assets/ パスを置換
  const updatedCss = data.replace(/url\(\s*['"]?(\/assets\/[^)'"]+)['"]?\s*\)/g, (match, p1) => {
    // ファイルパスを相対パスに変換
    const relativeUrl = path.join(relativePath, p1.replace(oldBasePath, '')).replace(/\\/g, '/');
    return `url("${relativeUrl}")`;
  });

  // 置換後の CSS を保存する
  writeFileSync(filePath, updatedCss, 'utf-8');
  console.log(`CSS のパスを書き換えました🍠: ${filePath}`);
});
