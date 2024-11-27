import { serverConf } from '@/utils/serverConf';
import { randomUUID } from 'node:crypto';
export class Utils {
  constructor() {}

  public static vunitPc(num: number, baseWidth: number = serverConf.LG_PSD_WIDTH) {
    return (num / baseWidth) * 100 + 'vw';
  }

  public static vunitSp(num: number, baseWidth: number = serverConf.XS_PSD_WIDTH) {
    return (num / baseWidth) * 100 + 'vw';
  }

  public static getUuid() {
    return randomUUID();
  }
}
