import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {DATABASE_KEY} from '../core/utils/global-variable';
// import {RecommendedProductData} from '../interfaces/recommendedProductsData';
import {environment} from '../../environments/environment';
// import * as CryptoJS from 'crypto-js';
import * as CryptoJS from 'crypto-js';
import {SecretKeyTypeEnum} from '../enum/secret-key-type.enum';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private cookieService: CookieService
  ) {
  }

  /**
   * SESSION STORAGE
   */

  storeDataToSessionStorage(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getDataFromSessionStorage(key: string): any {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  removeSessionData(key: string) {
    sessionStorage.removeItem(key);
  }


  /**
   * LOCAL STORAGE
   */

  storeDataToLocalStorage(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getDataFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  removeLocalData(key: string) {
    localStorage.removeItem(key);
  }


  /**
   * SESSION STORAGE
   */

 





  /**
   * DYNAMIC SESSION DATA
   */
  storeInputData(data: any, key: string) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getStoredInput(key: string): any {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
  }


  /**
   * LOCAL STORAGE
   */


 

  /**
   * COOKIE STORAGE
   */

  storeDataToCookieStorage(key: string, data: any, options?: object) {
    if (options) {
      this.cookieService.set(key, data, options);
    } else {
      this.cookieService.set(key, data);
    }
  }

  getDataFromCookieStorage(key: string): any {
    if (this.checkCookieData(key)) {
      return this.cookieService.get(key);
    } else {
      return null;
    }
  }
  getObjectDataFromCookie(key: string): any {
    if (this.checkCookieData(key)) {
      const data = this.cookieService.get(key);
      return JSON.parse(data);
    } else {
      return null;
    }
  }


  removeCookieData(key: string) {
    this.cookieService.delete(key);
  }

  removeAllCookieData() {
    this.cookieService.deleteAll();
  }

  checkCookieData(key: string): boolean {
    return this.cookieService.check(key);
  }


  /**
   * ENCRYPT STORAGE
   */

  addDataToEncryptLocal(data: object, key: string) {
    const encryptedData = this.encryptWithCrypto(data, SecretKeyTypeEnum.STORAGE_TOKEN);
    localStorage.setItem(key, encryptedData);
  }

  getDataFromEncryptLocal(key: string) {
    const encryptString = localStorage.getItem(key);
    if (encryptString) {
      return this.decryptWithCrypto(encryptString, SecretKeyTypeEnum.STORAGE_TOKEN);
    } else {
      return null;
    }

  }

  removeDataFromEncryptLocal(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * ENCRYPT CRYPTO JS
   */
  encryptWithCrypto(data: object, secretKey: string) {
    const cryptToSecretKey = this.getSecretKey(secretKey);
    return CryptoJS.AES.encrypt(JSON.stringify(data), cryptToSecretKey).toString();
  }

  encryptStringWithCrypto(str: string, secretKey: string) {
    const cryptToSecretKey = this.getSecretKey(secretKey);
    return CryptoJS.AES.encrypt(str, cryptToSecretKey).toString();
  }

  decryptWithCrypto(encryptString: string, secretKey: string) {
    const cryptToSecretKey = this.getSecretKey(secretKey);
    const bytes = CryptoJS.AES.decrypt(encryptString, cryptToSecretKey);
    try {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      return null;
    }
  }

  decryptStringWithCrypto(encryptString: string, secretKey: string) {
    const cryptToSecretKey = this.getSecretKey(secretKey);
    const bytes = CryptoJS.AES.decrypt(encryptString, cryptToSecretKey);
    try {
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return null;
    }
  }

  // Get Secret Key
  protected getSecretKey(secretKey: string): string {
    switch (secretKey) {
      case SecretKeyTypeEnum.ADMIN_TOKEN: {
        return environment.adminTokenSecret;
      }
      case SecretKeyTypeEnum.USER_TOKEN: {
        return environment.userTokenSecret;
      }
      case SecretKeyTypeEnum.API_TOKEN: {
        return environment.apiTokenSecret;
      }
      case SecretKeyTypeEnum.STORAGE_TOKEN: {
        return environment.storageSecret;
      }
      default: {
        return environment.storageSecret;
      }
    }
  }


}
