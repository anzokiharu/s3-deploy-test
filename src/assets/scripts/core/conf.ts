import { Util } from '../libs/util';
import { baseConf } from '@/utils/baseConf';

export class Conf extends baseConf {
  // #############################################
  // 本番UPフラグ
  // #############################################
  public static IS_BUILD = import.meta.env.PROD;
  // テスト用 パラメータ
  public static FLG_PARAM: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_LOW_FPS: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_SKIP_OP: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_DEBUG_TXT: boolean = true;
  public static FLG_STATS: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_TEST: boolean = Conf.IS_BUILD ? false : location.href.includes('localhost');

  // 視野効果をへらす
  public static REDUCE_MOTION: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // パス
  //public static PATH_ROOT = Conf.IS_BUILD ? '..' : '';
  //public static PATH_IMG: string = this.PATH_ROOT + Conf.BASE_PATH_IMG;

  // タッチデバイス
  public static USE_TOUCH: boolean = Util.isTouchDevice();

  // 簡易版
  public static IS_TOUCH_DEVICE: boolean = Util.isTouchDevice();
}
