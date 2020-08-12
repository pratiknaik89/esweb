import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class ClsAuditPeriod {
    auditperiod_id: number;
    account_id: number;
    auditperiod_fromdate: string;
    auditperiod_todate: string;
    auditperiod_isfinalized: boolean;
    auditperiod_finalizeddatetime: string;
    auditperiod_isunlock: boolean;

    constructor(auditperiod_id?: number, account_id?: number, auditperiod_fromdate?: string, auditperiod_todate?: string, auditperiod_isfinalized?: boolean, auditperiod_finalizeddatetime?: string, auditperiod_isunlock?: boolean) {
        this.auditperiod_id = auditperiod_id;
        this.account_id = account_id;
        this.auditperiod_fromdate = auditperiod_fromdate;
        this.auditperiod_todate = auditperiod_todate;
        this.auditperiod_isfinalized = auditperiod_isfinalized;
        this.auditperiod_isunlock = auditperiod_isunlock;
        this.auditperiod_finalizeddatetime = auditperiod_finalizeddatetime;
    }
}
