export class baseConf {
  public static PATH_IMG: string = '/assets/images/';

  // ブレイクポイント
  public static MQ_UP = {
    sm: 540,
    md: 768,
    lg: 1024,
    xl: 1100,
  };
  public static MQ_DOWN = {
    sm: 539,
    md: 767,
    lg: 1023,
    xl: 1099,
  };

  // PSDサイズ
  public static LG_PSD_WIDTH = 1366;
  public static XS_PSD_WIDTH = 375;

  constructor() {}
}
