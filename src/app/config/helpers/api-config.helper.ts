

export class ApiConfigHelper {
  public static ANGULAR_HOST = 'http://localhost:4200';
  public static HOST = 'http://localhost/crm/public/';
  public static API = 'api/';

  public static getAPIURL(): string {
    return ApiConfigHelper.HOST + ApiConfigHelper.API;
  }

  // COMPANY
  public static getListCompanyURL(): string {
    return ApiConfigHelper.getAPIURL() + 'companies';
  }

  public static getCompanyURL(company_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'companies/' + company_id;
  }

  public static storeCompanyURL(): string {
    return ApiConfigHelper.getAPIURL() + 'companies';
  }

  public static updateCompanyURL(company_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'companies/' + company_id;
  }

  public static deleteCompanyURL(company_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'companies/' + company_id;
  }

  // CONTACT
  public static getListContactURL(): string {
    return ApiConfigHelper.getAPIURL() + 'contacts';
  }

  public static getContactURL(contact_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'contacts/' + contact_id;
  }

  public static storeContactURL(): string {
    return ApiConfigHelper.getAPIURL() + 'contacts';
  }

  public static updateContactURL(contact_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'contacts/' + contact_id;
  }

  public static deleteContactURL(contact_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'contacts/' + contact_id;
  }

  // THREAD
  public static getListThreadURL(): string {
    return ApiConfigHelper.getAPIURL() + 'threads';
  }

  public static getThreadURL(thread_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'threads/' + thread_id;
  }

  public static storeThreadURL(): string {
    return ApiConfigHelper.getAPIURL() + 'threads';
  }

  public static updateThreadURL(thread_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'threads/' + thread_id;
  }

  public static deleteThreadURL(thread_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'threads/' + thread_id;
  }

  // ACTION
  public static getListActionURL(): string {
    return ApiConfigHelper.getAPIURL() + 'actions';
  }

  public static getActionURL(action_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'actions/' + action_id;
  }

  public static getListTypeURL(): string {
    return ApiConfigHelper.getAPIURL() + 'actions/types';
  }

  public static storeActionURL(): string {
    return ApiConfigHelper.getAPIURL() + 'actions';
  }

  public static updateActionURL(action_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'actions/' + action_id;
  }

  public static deleteActionURL(action_id: any): string {
    return ApiConfigHelper.getAPIURL() + 'actions/' + action_id;
  }
}
