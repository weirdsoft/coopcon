/* globals __DEV__ */
export let API_HOST

if (__DEV__) {
  API_HOST = '192.168.0.100'
} else {
  API_HOST = 'coopcon.tsuiseki.moe'
}
