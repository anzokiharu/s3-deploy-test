import { baseConf } from '@/utils/baseConf';
export class serverConf extends baseConf {
  public static IS_BUILD = import.meta.env.SSR && import.meta.env.MODE === 'production';
}
