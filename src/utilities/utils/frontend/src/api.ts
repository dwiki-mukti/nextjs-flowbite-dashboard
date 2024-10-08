import { siomaConfig } from '@/utilities/configs/app';
import { objectToQueryUrl } from '../../general';
import { getCookie, removeCookie } from 'typescript-cookie';



export const onLogout = ({ redirectTo } = { redirectTo: '/login' }) => {
  const cookieConfigs: any = {}
  const domain = process?.env?.NEXT_PUBLIC_PARENT_DOMAIN
  if (domain) cookieConfigs.domain = domain
  removeCookie(siomaConfig.COOKIE_AUTH_TOKEN ?? "userToken", cookieConfigs);
  removeCookie(siomaConfig.COOKIE_USER_PROFILE ?? "userAuthed", cookieConfigs);
  setTimeout(() => {
    window.location.href = (redirectTo);
  }, 300);
};





type typeApi = (properties: {
  path: string,
  objParams?: Record<string, any>,
  body?: FormData | Record<string, any> | string,
  method?: string,
  headers?: Record<string, string>,
  host?: string
  staleTime?: number
}) => Promise<Response>

export const api: typeApi = async ({
  path,
  objParams,
  body,
  method,
  headers = {},
  host = (process.env.NEXT_PUBLIC_BFF_URL ?? ''),
  staleTime = 0
}) => {
  /**
   * Setup var
   */
  path = path + (path.includes('?') ? '&' : '?') + (objParams ? objectToQueryUrl(objParams) : '');


  /**
   * Check cache
   */
  if (staleTime > 0) {
    const cache = (window as any)?.fetchDataCached?.[path]
    if (cache && (cache.expiredAt >= Date.now())) {
      return new Promise((resolve) => (resolve(cache.result.clone())))
    }
  }



  /**
   * Get user token
   */
  try {
    const userToken = getCookie(siomaConfig.COOKIE_AUTH_TOKEN ?? "userToken")
    headers['Authorization'] = `Bearer ${userToken}`
  } catch (error) { }


  /**
   * Set content type
   */
  if (body && !(body instanceof FormData)) {
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    if (typeof (body) == "object") body = JSON.stringify(body);
  }


  /**
   * Fething server
   */
  const response = fetch((host + path), {
    method: (method ?? 'get'),
    body,
    headers
  });


  /**
   * Pre return
   */
  response.then((res) => {
    /**
     * Check unauthed
     */
    // if (res.status == 401) onLogout()


    /**
     * Caching data
     */
    if (res.status == 200) {
      if (staleTime > 0) {
        (window as any).fetchDataCached = {
          ...((window as any)?.fetchDataCached ?? {}),
          [path]: {
            expiredAt: Date.now() + (staleTime * 1000),
            result: res.clone()
          }
        }
      } else {
        delete (window as any)?.fetchDataCached?.[path]
      }
    }
  });


  /**
   * Return data
   */
  return response;
}