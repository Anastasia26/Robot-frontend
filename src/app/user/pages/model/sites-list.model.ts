export interface SitesListModel {
    id?: number;
    label: string;
    is_main?: boolean;
    alert_contacts?: [];
    children?: Array<SitesListModel>;
    ip_addresses: [];
}
