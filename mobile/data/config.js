/* globals __DEV__ */
export const DEVELOPMENT_ENV = __DEV__
export let API_HOST

if (DEVELOPMENT_ENV) {
  API_HOST = '192.168.0.100'
} else {
  API_HOST = 'coopcon.tsuiseki.moe'
}
