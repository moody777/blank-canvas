import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import type { Contract, Employee } from '@/types/index'

export interface IEmployeeClient {
    submitLeaveRequest(employeeId?: number | undefined, leaveTypeId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getLeaveBalance(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    viewLeaveHistory(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    attachLeaveDocuments(leaveRequestId?: number | undefined, filePath?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    cancelLeaveRequest(leaveRequestId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    submitLeaveAfterAbsence(employeeId?: number | undefined, leaveTypeId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    recordAttendance(employeeId?: number | undefined, shiftId?: number | undefined, entryTime?: string | undefined, exitTime?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    viewAssignedShifts(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    logFlexibleAttendance(employeeId?: number | undefined, date?: Date | undefined, checkIn?: string | undefined, checkOut?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    recordMultiplePunches(employeeId?: number | undefined, clockInOutTime?: Date | undefined, type?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    submitCorrectionRequest(employeeId?: number | undefined, date?: Date | undefined, correctionType?: string | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    viewRequestStatus(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    notifyMissedPunch(employeeId?: number | undefined, date?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    viewEmployeeProfile(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    updatePersonalDetails(employeeId?: number | undefined, phone?: string | undefined, address?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateContactInformation(employeeId?: number | undefined, requestType?: string | undefined, newValue?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateEmergencyContact(employeeId?: number | undefined, contactName?: string | undefined, relation?: string | undefined, phone?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    addEmployeeSkill(employeeId?: number | undefined, skillName?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    viewEmploymentTimeline(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    viewMyContracts(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    viewMyPayroll(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    viewMyMissions(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    submitReimbursement(employeeId?: number | undefined, expenseType?: string | undefined, amount?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    requestHRDocument(employeeId?: number | undefined, documentType?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    notifyProfileUpdate(employeeId?: number | undefined, notificationType?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    notifyLeaveStatusChange(employeeId?: number | undefined, requestId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
}

export class EmployeeClient implements IEmployeeClient {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance || axios.create();

        this.baseUrl = baseUrl ?? "https://localhost:7140";

    }

    submitLeaveRequest(employeeId?: number | undefined, leaveTypeId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/SubmitLeaveRequest?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (leaveTypeId === null)
            throw new globalThis.Error("The parameter 'leaveTypeId' cannot be null.");
        else if (leaveTypeId !== undefined)
            url_ += "leaveTypeId=" + encodeURIComponent("" + leaveTypeId) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        if (reason === null)
            throw new globalThis.Error("The parameter 'reason' cannot be null.");
        else if (reason !== undefined)
            url_ += "reason=" + encodeURIComponent("" + reason) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSubmitLeaveRequest(_response);
        });
    }

    protected processSubmitLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getLeaveBalance(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/GetLeaveBalance/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetLeaveBalance(_response);
        });
    }

    protected processGetLeaveBalance(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewLeaveHistory(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewLeaveHistory/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewLeaveHistory(_response);
        });
    }

    protected processViewLeaveHistory(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    attachLeaveDocuments(leaveRequestId?: number | undefined, filePath?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/AttachLeaveDocuments?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        if (filePath === null)
            throw new globalThis.Error("The parameter 'filePath' cannot be null.");
        else if (filePath !== undefined)
            url_ += "filePath=" + encodeURIComponent("" + filePath) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAttachLeaveDocuments(_response);
        });
    }

    protected processAttachLeaveDocuments(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    cancelLeaveRequest(leaveRequestId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/CancelLeaveRequest?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCancelLeaveRequest(_response);
        });
    }

    protected processCancelLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    submitLeaveAfterAbsence(employeeId?: number | undefined, leaveTypeId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/SubmitLeaveAfterAbsence?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (leaveTypeId === null)
            throw new globalThis.Error("The parameter 'leaveTypeId' cannot be null.");
        else if (leaveTypeId !== undefined)
            url_ += "leaveTypeId=" + encodeURIComponent("" + leaveTypeId) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        if (reason === null)
            throw new globalThis.Error("The parameter 'reason' cannot be null.");
        else if (reason !== undefined)
            url_ += "reason=" + encodeURIComponent("" + reason) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSubmitLeaveAfterAbsence(_response);
        });
    }

    protected processSubmitLeaveAfterAbsence(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    recordAttendance(employeeId?: number | undefined, shiftId?: number | undefined, entryTime?: string | undefined, exitTime?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/RecordAttendance?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (shiftId === null)
            throw new globalThis.Error("The parameter 'shiftId' cannot be null.");
        else if (shiftId !== undefined)
            url_ += "shiftId=" + encodeURIComponent("" + shiftId) + "&";
        if (entryTime === null)
            throw new globalThis.Error("The parameter 'entryTime' cannot be null.");
        else if (entryTime !== undefined)
            url_ += "entryTime=" + encodeURIComponent("" + entryTime) + "&";
        if (exitTime === null)
            throw new globalThis.Error("The parameter 'exitTime' cannot be null.");
        else if (exitTime !== undefined)
            url_ += "exitTime=" + encodeURIComponent("" + exitTime) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRecordAttendance(_response);
        });
    }

    protected processRecordAttendance(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewAssignedShifts(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewAssignedShifts/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewAssignedShifts(_response);
        });
    }

    protected processViewAssignedShifts(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    logFlexibleAttendance(employeeId?: number | undefined, date?: Date | undefined, checkIn?: string | undefined, checkOut?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/LogFlexibleAttendance?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (date === null)
            throw new globalThis.Error("The parameter 'date' cannot be null.");
        else if (date !== undefined)
            url_ += "date=" + encodeURIComponent(date ? "" + date.toISOString() : "") + "&";
        if (checkIn === null)
            throw new globalThis.Error("The parameter 'checkIn' cannot be null.");
        else if (checkIn !== undefined)
            url_ += "checkIn=" + encodeURIComponent("" + checkIn) + "&";
        if (checkOut === null)
            throw new globalThis.Error("The parameter 'checkOut' cannot be null.");
        else if (checkOut !== undefined)
            url_ += "checkOut=" + encodeURIComponent("" + checkOut) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processLogFlexibleAttendance(_response);
        });
    }

    protected processLogFlexibleAttendance(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    recordMultiplePunches(employeeId?: number | undefined, clockInOutTime?: Date | undefined, type?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/RecordMultiplePunches?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (clockInOutTime === null)
            throw new globalThis.Error("The parameter 'clockInOutTime' cannot be null.");
        else if (clockInOutTime !== undefined)
            url_ += "clockInOutTime=" + encodeURIComponent(clockInOutTime ? "" + clockInOutTime.toISOString() : "") + "&";
        if (type === null)
            throw new globalThis.Error("The parameter 'type' cannot be null.");
        else if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRecordMultiplePunches(_response);
        });
    }

    protected processRecordMultiplePunches(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    submitCorrectionRequest(employeeId?: number | undefined, date?: Date | undefined, correctionType?: string | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/SubmitCorrectionRequest?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (date === null)
            throw new globalThis.Error("The parameter 'date' cannot be null.");
        else if (date !== undefined)
            url_ += "date=" + encodeURIComponent(date ? "" + date.toISOString() : "") + "&";
        if (correctionType === null)
            throw new globalThis.Error("The parameter 'correctionType' cannot be null.");
        else if (correctionType !== undefined)
            url_ += "correctionType=" + encodeURIComponent("" + correctionType) + "&";
        if (reason === null)
            throw new globalThis.Error("The parameter 'reason' cannot be null.");
        else if (reason !== undefined)
            url_ += "reason=" + encodeURIComponent("" + reason) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSubmitCorrectionRequest(_response);
        });
    }

    protected processSubmitCorrectionRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewRequestStatus(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewRequestStatus/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewRequestStatus(_response);
        });
    }

    protected processViewRequestStatus(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    notifyMissedPunch(employeeId?: number | undefined, date?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/NotifyMissedPunch?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (date === null)
            throw new globalThis.Error("The parameter 'date' cannot be null.");
        else if (date !== undefined)
            url_ += "date=" + encodeURIComponent(date ? "" + date.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processNotifyMissedPunch(_response);
        });
    }

    protected processNotifyMissedPunch(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewEmployeeProfile(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewEmployeeProfile/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewEmployeeProfile(_response);
        });
    }

    protected processViewEmployeeProfile(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updatePersonalDetails(employeeId?: number | undefined, phone?: string | undefined, address?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/UpdatePersonalDetails?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (phone === null)
            throw new globalThis.Error("The parameter 'phone' cannot be null.");
        else if (phone !== undefined)
            url_ += "phone=" + encodeURIComponent("" + phone) + "&";
        if (address === null)
            throw new globalThis.Error("The parameter 'address' cannot be null.");
        else if (address !== undefined)
            url_ += "address=" + encodeURIComponent("" + address) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdatePersonalDetails(_response);
        });
    }

    protected processUpdatePersonalDetails(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateContactInformation(employeeId?: number | undefined, requestType?: string | undefined, newValue?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/UpdateContactInformation?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (requestType === null)
            throw new globalThis.Error("The parameter 'requestType' cannot be null.");
        else if (requestType !== undefined)
            url_ += "requestType=" + encodeURIComponent("" + requestType) + "&";
        if (newValue === null)
            throw new globalThis.Error("The parameter 'newValue' cannot be null.");
        else if (newValue !== undefined)
            url_ += "newValue=" + encodeURIComponent("" + newValue) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateContactInformation(_response);
        });
    }

    protected processUpdateContactInformation(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateEmergencyContact(employeeId?: number | undefined, contactName?: string | undefined, relation?: string | undefined, phone?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/UpdateEmergencyContact?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (contactName === null)
            throw new globalThis.Error("The parameter 'contactName' cannot be null.");
        else if (contactName !== undefined)
            url_ += "contactName=" + encodeURIComponent("" + contactName) + "&";
        if (relation === null)
            throw new globalThis.Error("The parameter 'relation' cannot be null.");
        else if (relation !== undefined)
            url_ += "relation=" + encodeURIComponent("" + relation) + "&";
        if (phone === null)
            throw new globalThis.Error("The parameter 'phone' cannot be null.");
        else if (phone !== undefined)
            url_ += "phone=" + encodeURIComponent("" + phone) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateEmergencyContact(_response);
        });
    }

    protected processUpdateEmergencyContact(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    addEmployeeSkill(employeeId?: number | undefined, skillName?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/AddEmployeeSkill?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (skillName === null)
            throw new globalThis.Error("The parameter 'skillName' cannot be null.");
        else if (skillName !== undefined)
            url_ += "skillName=" + encodeURIComponent("" + skillName) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddEmployeeSkill(_response);
        });
    }

    protected processAddEmployeeSkill(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewEmploymentTimeline(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewEmploymentTimeline/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewEmploymentTimeline(_response);
        });
    }

    protected processViewEmploymentTimeline(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewMyContracts(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewMyContracts/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewMyContracts(_response);
        });
    }

    protected processViewMyContracts(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewMyPayroll(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewMyPayroll/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewMyPayroll(_response);
        });
    }

    protected processViewMyPayroll(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewMyMissions(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/ViewMyMissions/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewMyMissions(_response);
        });
    }

    protected processViewMyMissions(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    submitReimbursement(employeeId?: number | undefined, expenseType?: string | undefined, amount?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/SubmitReimbursement?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (expenseType === null)
            throw new globalThis.Error("The parameter 'expenseType' cannot be null.");
        else if (expenseType !== undefined)
            url_ += "expenseType=" + encodeURIComponent("" + expenseType) + "&";
        if (amount === null)
            throw new globalThis.Error("The parameter 'amount' cannot be null.");
        else if (amount !== undefined)
            url_ += "amount=" + encodeURIComponent("" + amount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSubmitReimbursement(_response);
        });
    }

    protected processSubmitReimbursement(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    requestHRDocument(employeeId?: number | undefined, documentType?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/RequestHRDocument?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (documentType === null)
            throw new globalThis.Error("The parameter 'documentType' cannot be null.");
        else if (documentType !== undefined)
            url_ += "documentType=" + encodeURIComponent("" + documentType) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRequestHRDocument(_response);
        });
    }

    protected processRequestHRDocument(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    notifyProfileUpdate(employeeId?: number | undefined, notificationType?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/NotifyProfileUpdate?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (notificationType === null)
            throw new globalThis.Error("The parameter 'notificationType' cannot be null.");
        else if (notificationType !== undefined)
            url_ += "notificationType=" + encodeURIComponent("" + notificationType) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processNotifyProfileUpdate(_response);
        });
    }

    protected processNotifyProfileUpdate(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    notifyLeaveStatusChange(employeeId?: number | undefined, requestId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Employee/NotifyLeaveStatusChange?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (requestId === null)
            throw new globalThis.Error("The parameter 'requestId' cannot be null.");
        else if (requestId !== undefined)
            url_ += "requestId=" + encodeURIComponent("" + requestId) + "&";
        if (status === null)
            throw new globalThis.Error("The parameter 'status' cannot be null.");
        else if (status !== undefined)
            url_ += "status=" + encodeURIComponent("" + status) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processNotifyLeaveStatusChange(_response);
        });
    }

    protected processNotifyLeaveStatusChange(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export interface IHRClient {
    createContract(employeeId?: number | undefined, type?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    renewContract(contractId?: number | undefined, newEndDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getActiveContracts(signal?: AbortSignal): Promise<Contract[]>;
    getExpiringContracts(daysBefore?: number | undefined, signal?: AbortSignal): Promise<Contract[]>;
    approveLeaveRequest(leaveRequestId?: number | undefined, approverId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateLeavePolicy(policyId?: number | undefined, eligibilityRules?: string | undefined, noticePeriod?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureLeaveEligibility(leaveType?: string | undefined, minTenure?: number | undefined, employeeType?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateLeaveEntitlements(employeeId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    finalizeLeaveRequest(leaveRequestId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getTeamByManager(managerId: number, signal?: AbortSignal): Promise<Employee[]>;
    createEmployeeProfile(firstName?: string | undefined, lastName?: string | undefined, departmentId?: number | undefined, roleId?: number | undefined, hireDate?: Date | undefined, email?: string | undefined, phone?: string | undefined, nationalId?: string | undefined, dateOfBirth?: Date | undefined, countryOfBirth?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateEmployeeProfile(employeeId?: number | undefined, fieldName?: string | undefined, newValue?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    generateProfileReport(filterField?: string | undefined, filterValue?: string | undefined, signal?: AbortSignal): Promise<Employee[]>;
    createShiftType(shiftId?: number | undefined, name?: string | undefined, type?: string | undefined, startTime?: string | undefined, endTime?: string | undefined, breakDuration?: number | undefined, shiftDate?: Date | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    assignRotationalShift(employeeId?: number | undefined, shiftCycle?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    assignMission(employeeId?: number | undefined, managerId?: number | undefined, destination?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    reviewReimbursement(claimId?: number | undefined, approverId?: number | undefined, decision?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    defineShortTimeRules(ruleName?: string | undefined, lateMinutes?: number | undefined, earlyLeaveMinutes?: number | undefined, penaltyType?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateInsuranceBrackets(bracketId?: number | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, empContrib?: number | undefined, employerContrib?: number | undefined, updatedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
}

export class HRClient implements IHRClient {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance || axios.create();

        this.baseUrl = baseUrl ?? "https://localhost:7140";

    }

    createContract(employeeId?: number | undefined, type?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/CreateContract?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (type === null)
            throw new globalThis.Error("The parameter 'type' cannot be null.");
        else if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCreateContract(_response);
        });
    }

    protected processCreateContract(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    renewContract(contractId?: number | undefined, newEndDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/RenewContract?";
        if (contractId === null)
            throw new globalThis.Error("The parameter 'contractId' cannot be null.");
        else if (contractId !== undefined)
            url_ += "contractId=" + encodeURIComponent("" + contractId) + "&";
        if (newEndDate === null)
            throw new globalThis.Error("The parameter 'newEndDate' cannot be null.");
        else if (newEndDate !== undefined)
            url_ += "newEndDate=" + encodeURIComponent(newEndDate ? "" + newEndDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRenewContract(_response);
        });
    }

    protected processRenewContract(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getActiveContracts(signal?: AbortSignal): Promise<Contract[]> {
        let url_ = this.baseUrl + "/HR/GetActiveContracts";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetActiveContracts(_response);
        });
    }

    protected processGetActiveContracts(response: AxiosResponse): Promise<Contract[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Contract[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Contract[]>(null as any);
    }

    getExpiringContracts(daysBefore?: number | undefined, signal?: AbortSignal): Promise<Contract[]> {
        let url_ = this.baseUrl + "/HR/GetExpiringContracts?";
        if (daysBefore === null)
            throw new globalThis.Error("The parameter 'daysBefore' cannot be null.");
        else if (daysBefore !== undefined)
            url_ += "daysBefore=" + encodeURIComponent("" + daysBefore) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetExpiringContracts(_response);
        });
    }

    protected processGetExpiringContracts(response: AxiosResponse): Promise<Contract[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Contract[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Contract[]>(null as any);
    }

    approveLeaveRequest(leaveRequestId?: number | undefined, approverId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/ApproveLeaveRequest?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        if (approverId === null)
            throw new globalThis.Error("The parameter 'approverId' cannot be null.");
        else if (approverId !== undefined)
            url_ += "approverId=" + encodeURIComponent("" + approverId) + "&";
        if (status === null)
            throw new globalThis.Error("The parameter 'status' cannot be null.");
        else if (status !== undefined)
            url_ += "status=" + encodeURIComponent("" + status) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApproveLeaveRequest(_response);
        });
    }

    protected processApproveLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateLeavePolicy(policyId?: number | undefined, eligibilityRules?: string | undefined, noticePeriod?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/UpdateLeavePolicy?";
        if (policyId === null)
            throw new globalThis.Error("The parameter 'policyId' cannot be null.");
        else if (policyId !== undefined)
            url_ += "policyId=" + encodeURIComponent("" + policyId) + "&";
        if (eligibilityRules === null)
            throw new globalThis.Error("The parameter 'eligibilityRules' cannot be null.");
        else if (eligibilityRules !== undefined)
            url_ += "eligibilityRules=" + encodeURIComponent("" + eligibilityRules) + "&";
        if (noticePeriod === null)
            throw new globalThis.Error("The parameter 'noticePeriod' cannot be null.");
        else if (noticePeriod !== undefined)
            url_ += "noticePeriod=" + encodeURIComponent("" + noticePeriod) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateLeavePolicy(_response);
        });
    }

    protected processUpdateLeavePolicy(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureLeaveEligibility(leaveType?: string | undefined, minTenure?: number | undefined, employeeType?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/ConfigureLeaveEligibility?";
        if (leaveType === null)
            throw new globalThis.Error("The parameter 'leaveType' cannot be null.");
        else if (leaveType !== undefined)
            url_ += "leaveType=" + encodeURIComponent("" + leaveType) + "&";
        if (minTenure === null)
            throw new globalThis.Error("The parameter 'minTenure' cannot be null.");
        else if (minTenure !== undefined)
            url_ += "minTenure=" + encodeURIComponent("" + minTenure) + "&";
        if (employeeType === null)
            throw new globalThis.Error("The parameter 'employeeType' cannot be null.");
        else if (employeeType !== undefined)
            url_ += "employeeType=" + encodeURIComponent("" + employeeType) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureLeaveEligibility(_response);
        });
    }

    protected processConfigureLeaveEligibility(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateLeaveEntitlements(employeeId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/UpdateLeaveEntitlements?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateLeaveEntitlements(_response);
        });
    }

    protected processUpdateLeaveEntitlements(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    finalizeLeaveRequest(leaveRequestId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/FinalizeLeaveRequest?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processFinalizeLeaveRequest(_response);
        });
    }

    protected processFinalizeLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getTeamByManager(managerId: number, signal?: AbortSignal): Promise<Employee[]> {
        let url_ = this.baseUrl + "/HR/GetTeamByManager/{managerId}";
        if (managerId === undefined || managerId === null)
            throw new globalThis.Error("The parameter 'managerId' must be defined.");
        url_ = url_.replace("{managerId}", encodeURIComponent("" + managerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetTeamByManager(_response);
        });
    }

    protected processGetTeamByManager(response: AxiosResponse): Promise<Employee[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Employee[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Employee[]>(null as any);
    }

    createEmployeeProfile(firstName?: string | undefined, lastName?: string | undefined, departmentId?: number | undefined, roleId?: number | undefined, hireDate?: Date | undefined, email?: string | undefined, phone?: string | undefined, nationalId?: string | undefined, dateOfBirth?: Date | undefined, countryOfBirth?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/CreateEmployeeProfile?";
        if (firstName === null)
            throw new globalThis.Error("The parameter 'firstName' cannot be null.");
        else if (firstName !== undefined)
            url_ += "firstName=" + encodeURIComponent("" + firstName) + "&";
        if (lastName === null)
            throw new globalThis.Error("The parameter 'lastName' cannot be null.");
        else if (lastName !== undefined)
            url_ += "lastName=" + encodeURIComponent("" + lastName) + "&";
        if (departmentId === null)
            throw new globalThis.Error("The parameter 'departmentId' cannot be null.");
        else if (departmentId !== undefined)
            url_ += "departmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (roleId === null)
            throw new globalThis.Error("The parameter 'roleId' cannot be null.");
        else if (roleId !== undefined)
            url_ += "roleId=" + encodeURIComponent("" + roleId) + "&";
        if (hireDate === null)
            throw new globalThis.Error("The parameter 'hireDate' cannot be null.");
        else if (hireDate !== undefined)
            url_ += "hireDate=" + encodeURIComponent(hireDate ? "" + hireDate.toISOString() : "") + "&";
        if (email === null)
            throw new globalThis.Error("The parameter 'email' cannot be null.");
        else if (email !== undefined)
            url_ += "email=" + encodeURIComponent("" + email) + "&";
        if (phone === null)
            throw new globalThis.Error("The parameter 'phone' cannot be null.");
        else if (phone !== undefined)
            url_ += "phone=" + encodeURIComponent("" + phone) + "&";
        if (nationalId === null)
            throw new globalThis.Error("The parameter 'nationalId' cannot be null.");
        else if (nationalId !== undefined)
            url_ += "nationalId=" + encodeURIComponent("" + nationalId) + "&";
        if (dateOfBirth === null)
            throw new globalThis.Error("The parameter 'dateOfBirth' cannot be null.");
        else if (dateOfBirth !== undefined)
            url_ += "dateOfBirth=" + encodeURIComponent(dateOfBirth ? "" + dateOfBirth.toISOString() : "") + "&";
        if (countryOfBirth === null)
            throw new globalThis.Error("The parameter 'countryOfBirth' cannot be null.");
        else if (countryOfBirth !== undefined)
            url_ += "countryOfBirth=" + encodeURIComponent("" + countryOfBirth) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCreateEmployeeProfile(_response);
        });
    }

    protected processCreateEmployeeProfile(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateEmployeeProfile(employeeId?: number | undefined, fieldName?: string | undefined, newValue?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/UpdateEmployeeProfile?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (fieldName === null)
            throw new globalThis.Error("The parameter 'fieldName' cannot be null.");
        else if (fieldName !== undefined)
            url_ += "fieldName=" + encodeURIComponent("" + fieldName) + "&";
        if (newValue === null)
            throw new globalThis.Error("The parameter 'newValue' cannot be null.");
        else if (newValue !== undefined)
            url_ += "newValue=" + encodeURIComponent("" + newValue) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateEmployeeProfile(_response);
        });
    }

    protected processUpdateEmployeeProfile(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    generateProfileReport(filterField?: string | undefined, filterValue?: string | undefined, signal?: AbortSignal): Promise<Employee[]> {
        let url_ = this.baseUrl + "/HR/GenerateProfileReport?";
        if (filterField === null)
            throw new globalThis.Error("The parameter 'filterField' cannot be null.");
        else if (filterField !== undefined)
            url_ += "filterField=" + encodeURIComponent("" + filterField) + "&";
        if (filterValue === null)
            throw new globalThis.Error("The parameter 'filterValue' cannot be null.");
        else if (filterValue !== undefined)
            url_ += "filterValue=" + encodeURIComponent("" + filterValue) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGenerateProfileReport(_response);
        });
    }

    protected processGenerateProfileReport(response: AxiosResponse): Promise<Employee[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Employee[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Employee[]>(null as any);
    }

    createShiftType(shiftId?: number | undefined, name?: string | undefined, type?: string | undefined, startTime?: string | undefined, endTime?: string | undefined, breakDuration?: number | undefined, shiftDate?: Date | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/CreateShiftType?";
        if (shiftId === null)
            throw new globalThis.Error("The parameter 'shiftId' cannot be null.");
        else if (shiftId !== undefined)
            url_ += "shiftId=" + encodeURIComponent("" + shiftId) + "&";
        if (name === null)
            throw new globalThis.Error("The parameter 'name' cannot be null.");
        else if (name !== undefined)
            url_ += "name=" + encodeURIComponent("" + name) + "&";
        if (type === null)
            throw new globalThis.Error("The parameter 'type' cannot be null.");
        else if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        if (startTime === null)
            throw new globalThis.Error("The parameter 'startTime' cannot be null.");
        else if (startTime !== undefined)
            url_ += "startTime=" + encodeURIComponent("" + startTime) + "&";
        if (endTime === null)
            throw new globalThis.Error("The parameter 'endTime' cannot be null.");
        else if (endTime !== undefined)
            url_ += "endTime=" + encodeURIComponent("" + endTime) + "&";
        if (breakDuration === null)
            throw new globalThis.Error("The parameter 'breakDuration' cannot be null.");
        else if (breakDuration !== undefined)
            url_ += "breakDuration=" + encodeURIComponent("" + breakDuration) + "&";
        if (shiftDate === null)
            throw new globalThis.Error("The parameter 'shiftDate' cannot be null.");
        else if (shiftDate !== undefined)
            url_ += "shiftDate=" + encodeURIComponent(shiftDate ? "" + shiftDate.toISOString() : "") + "&";
        if (status === null)
            throw new globalThis.Error("The parameter 'status' cannot be null.");
        else if (status !== undefined)
            url_ += "status=" + encodeURIComponent("" + status) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCreateShiftType(_response);
        });
    }

    protected processCreateShiftType(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    assignRotationalShift(employeeId?: number | undefined, shiftCycle?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/AssignRotationalShift?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (shiftCycle === null)
            throw new globalThis.Error("The parameter 'shiftCycle' cannot be null.");
        else if (shiftCycle !== undefined)
            url_ += "shiftCycle=" + encodeURIComponent("" + shiftCycle) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAssignRotationalShift(_response);
        });
    }

    protected processAssignRotationalShift(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    assignMission(employeeId?: number | undefined, managerId?: number | undefined, destination?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/AssignMission?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (destination === null)
            throw new globalThis.Error("The parameter 'destination' cannot be null.");
        else if (destination !== undefined)
            url_ += "destination=" + encodeURIComponent("" + destination) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAssignMission(_response);
        });
    }

    protected processAssignMission(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    reviewReimbursement(claimId?: number | undefined, approverId?: number | undefined, decision?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/ReviewReimbursement?";
        if (claimId === null)
            throw new globalThis.Error("The parameter 'claimId' cannot be null.");
        else if (claimId !== undefined)
            url_ += "claimId=" + encodeURIComponent("" + claimId) + "&";
        if (approverId === null)
            throw new globalThis.Error("The parameter 'approverId' cannot be null.");
        else if (approverId !== undefined)
            url_ += "approverId=" + encodeURIComponent("" + approverId) + "&";
        if (decision === null)
            throw new globalThis.Error("The parameter 'decision' cannot be null.");
        else if (decision !== undefined)
            url_ += "decision=" + encodeURIComponent("" + decision) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processReviewReimbursement(_response);
        });
    }

    protected processReviewReimbursement(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    defineShortTimeRules(ruleName?: string | undefined, lateMinutes?: number | undefined, earlyLeaveMinutes?: number | undefined, penaltyType?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/DefineShortTimeRules?";
        if (ruleName === null)
            throw new globalThis.Error("The parameter 'ruleName' cannot be null.");
        else if (ruleName !== undefined)
            url_ += "ruleName=" + encodeURIComponent("" + ruleName) + "&";
        if (lateMinutes === null)
            throw new globalThis.Error("The parameter 'lateMinutes' cannot be null.");
        else if (lateMinutes !== undefined)
            url_ += "lateMinutes=" + encodeURIComponent("" + lateMinutes) + "&";
        if (earlyLeaveMinutes === null)
            throw new globalThis.Error("The parameter 'earlyLeaveMinutes' cannot be null.");
        else if (earlyLeaveMinutes !== undefined)
            url_ += "earlyLeaveMinutes=" + encodeURIComponent("" + earlyLeaveMinutes) + "&";
        if (penaltyType === null)
            throw new globalThis.Error("The parameter 'penaltyType' cannot be null.");
        else if (penaltyType !== undefined)
            url_ += "penaltyType=" + encodeURIComponent("" + penaltyType) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDefineShortTimeRules(_response);
        });
    }

    protected processDefineShortTimeRules(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateInsuranceBrackets(bracketId?: number | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, empContrib?: number | undefined, employerContrib?: number | undefined, updatedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/HR/UpdateInsuranceBrackets?";
        if (bracketId === null)
            throw new globalThis.Error("The parameter 'bracketId' cannot be null.");
        else if (bracketId !== undefined)
            url_ += "bracketId=" + encodeURIComponent("" + bracketId) + "&";
        if (minSalary === null)
            throw new globalThis.Error("The parameter 'minSalary' cannot be null.");
        else if (minSalary !== undefined)
            url_ += "minSalary=" + encodeURIComponent("" + minSalary) + "&";
        if (maxSalary === null)
            throw new globalThis.Error("The parameter 'maxSalary' cannot be null.");
        else if (maxSalary !== undefined)
            url_ += "maxSalary=" + encodeURIComponent("" + maxSalary) + "&";
        if (empContrib === null)
            throw new globalThis.Error("The parameter 'empContrib' cannot be null.");
        else if (empContrib !== undefined)
            url_ += "empContrib=" + encodeURIComponent("" + empContrib) + "&";
        if (employerContrib === null)
            throw new globalThis.Error("The parameter 'employerContrib' cannot be null.");
        else if (employerContrib !== undefined)
            url_ += "employerContrib=" + encodeURIComponent("" + employerContrib) + "&";
        if (updatedBy === null)
            throw new globalThis.Error("The parameter 'updatedBy' cannot be null.");
        else if (updatedBy !== undefined)
            url_ += "updatedBy=" + encodeURIComponent("" + updatedBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateInsuranceBrackets(_response);
        });
    }

    protected processUpdateInsuranceBrackets(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export interface IManagerClient {
    viewTeamProfiles(managerId: number, signal?: AbortSignal): Promise<FileResponse>;
    filterTeamProfiles(managerId?: number | undefined, skill?: string | null | undefined, roleId?: number | null | undefined, signal?: AbortSignal): Promise<FileResponse>;
    viewTeamCertifications(managerId: number, signal?: AbortSignal): Promise<FileResponse>;
    addManagerNotes(employeeId?: number | undefined, managerId?: number | undefined, note?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    requestReplacement(employeeId?: number | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    assignShift(employeeId?: number | undefined, shiftId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    reassignShift(employeeId?: number | undefined, oldShiftId?: number | undefined, newShiftId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    viewTeamAttendance(managerId?: number | undefined, start?: Date | undefined, end?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    recordManualAttendance(employeeId?: number | undefined, date?: Date | undefined, clockIn?: string | undefined, clockOut?: string | undefined, reason?: string | undefined, recordedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    reviewMissedPunches(managerId?: number | undefined, date?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    approveTimeRequest(requestId?: number | undefined, managerId?: number | undefined, decision?: string | undefined, comments?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getPendingLeaveRequests(managerId: number, signal?: AbortSignal): Promise<FileResponse>;
    viewLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    reviewLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, decision?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    approveLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    rejectLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    delegateLeaveApproval(managerId?: number | undefined, delegateId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    notifyNewLeaveRequest(managerId?: number | undefined, requestId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    flagIrregularLeave(employeeId?: number | undefined, managerId?: number | undefined, patternDescription?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    sendTeamNotification(managerId?: number | undefined, messageContent?: string | undefined, urgency?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getTeamStatistics(managerId: number, signal?: AbortSignal): Promise<FileResponse>;
    getTeamSummary(managerId: number, signal?: AbortSignal): Promise<FileResponse>;
    viewDepartmentSummary(departmentId: number, signal?: AbortSignal): Promise<FileResponse>;
    approveMissionCompletion(missionId?: number | undefined, managerId?: number | undefined, remarks?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
}

export class ManagerClient implements IManagerClient {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance || axios.create();

        this.baseUrl = baseUrl ?? "https://localhost:7140";

    }

    viewTeamProfiles(managerId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ViewTeamProfiles/{managerId}";
        if (managerId === undefined || managerId === null)
            throw new globalThis.Error("The parameter 'managerId' must be defined.");
        url_ = url_.replace("{managerId}", encodeURIComponent("" + managerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewTeamProfiles(_response);
        });
    }

    protected processViewTeamProfiles(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    filterTeamProfiles(managerId?: number | undefined, skill?: string | null | undefined, roleId?: number | null | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/FilterTeamProfiles?";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (skill !== undefined && skill !== null)
            url_ += "skill=" + encodeURIComponent("" + skill) + "&";
        if (roleId !== undefined && roleId !== null)
            url_ += "roleId=" + encodeURIComponent("" + roleId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processFilterTeamProfiles(_response);
        });
    }

    protected processFilterTeamProfiles(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewTeamCertifications(managerId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ViewTeamCertifications/{managerId}";
        if (managerId === undefined || managerId === null)
            throw new globalThis.Error("The parameter 'managerId' must be defined.");
        url_ = url_.replace("{managerId}", encodeURIComponent("" + managerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewTeamCertifications(_response);
        });
    }

    protected processViewTeamCertifications(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    addManagerNotes(employeeId?: number | undefined, managerId?: number | undefined, note?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/AddManagerNotes?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (note === null)
            throw new globalThis.Error("The parameter 'note' cannot be null.");
        else if (note !== undefined)
            url_ += "note=" + encodeURIComponent("" + note) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddManagerNotes(_response);
        });
    }

    protected processAddManagerNotes(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    requestReplacement(employeeId?: number | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/RequestReplacement?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (reason === null)
            throw new globalThis.Error("The parameter 'reason' cannot be null.");
        else if (reason !== undefined)
            url_ += "reason=" + encodeURIComponent("" + reason) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRequestReplacement(_response);
        });
    }

    protected processRequestReplacement(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    assignShift(employeeId?: number | undefined, shiftId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/AssignShift?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (shiftId === null)
            throw new globalThis.Error("The parameter 'shiftId' cannot be null.");
        else if (shiftId !== undefined)
            url_ += "shiftId=" + encodeURIComponent("" + shiftId) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAssignShift(_response);
        });
    }

    protected processAssignShift(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    reassignShift(employeeId?: number | undefined, oldShiftId?: number | undefined, newShiftId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ReassignShift?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (oldShiftId === null)
            throw new globalThis.Error("The parameter 'oldShiftId' cannot be null.");
        else if (oldShiftId !== undefined)
            url_ += "oldShiftId=" + encodeURIComponent("" + oldShiftId) + "&";
        if (newShiftId === null)
            throw new globalThis.Error("The parameter 'newShiftId' cannot be null.");
        else if (newShiftId !== undefined)
            url_ += "newShiftId=" + encodeURIComponent("" + newShiftId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processReassignShift(_response);
        });
    }

    protected processReassignShift(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewTeamAttendance(managerId?: number | undefined, start?: Date | undefined, end?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ViewTeamAttendance?";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (start === null)
            throw new globalThis.Error("The parameter 'start' cannot be null.");
        else if (start !== undefined)
            url_ += "start=" + encodeURIComponent(start ? "" + start.toISOString() : "") + "&";
        if (end === null)
            throw new globalThis.Error("The parameter 'end' cannot be null.");
        else if (end !== undefined)
            url_ += "end=" + encodeURIComponent(end ? "" + end.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewTeamAttendance(_response);
        });
    }

    protected processViewTeamAttendance(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    recordManualAttendance(employeeId?: number | undefined, date?: Date | undefined, clockIn?: string | undefined, clockOut?: string | undefined, reason?: string | undefined, recordedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/RecordManualAttendance?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (date === null)
            throw new globalThis.Error("The parameter 'date' cannot be null.");
        else if (date !== undefined)
            url_ += "date=" + encodeURIComponent(date ? "" + date.toISOString() : "") + "&";
        if (clockIn === null)
            throw new globalThis.Error("The parameter 'clockIn' cannot be null.");
        else if (clockIn !== undefined)
            url_ += "clockIn=" + encodeURIComponent("" + clockIn) + "&";
        if (clockOut === null)
            throw new globalThis.Error("The parameter 'clockOut' cannot be null.");
        else if (clockOut !== undefined)
            url_ += "clockOut=" + encodeURIComponent("" + clockOut) + "&";
        if (reason === null)
            throw new globalThis.Error("The parameter 'reason' cannot be null.");
        else if (reason !== undefined)
            url_ += "reason=" + encodeURIComponent("" + reason) + "&";
        if (recordedBy === null)
            throw new globalThis.Error("The parameter 'recordedBy' cannot be null.");
        else if (recordedBy !== undefined)
            url_ += "recordedBy=" + encodeURIComponent("" + recordedBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRecordManualAttendance(_response);
        });
    }

    protected processRecordManualAttendance(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    reviewMissedPunches(managerId?: number | undefined, date?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ReviewMissedPunches?";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (date === null)
            throw new globalThis.Error("The parameter 'date' cannot be null.");
        else if (date !== undefined)
            url_ += "date=" + encodeURIComponent(date ? "" + date.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processReviewMissedPunches(_response);
        });
    }

    protected processReviewMissedPunches(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    approveTimeRequest(requestId?: number | undefined, managerId?: number | undefined, decision?: string | undefined, comments?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ApproveTimeRequest?";
        if (requestId === null)
            throw new globalThis.Error("The parameter 'requestId' cannot be null.");
        else if (requestId !== undefined)
            url_ += "requestId=" + encodeURIComponent("" + requestId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (decision === null)
            throw new globalThis.Error("The parameter 'decision' cannot be null.");
        else if (decision !== undefined)
            url_ += "decision=" + encodeURIComponent("" + decision) + "&";
        if (comments === null)
            throw new globalThis.Error("The parameter 'comments' cannot be null.");
        else if (comments !== undefined)
            url_ += "comments=" + encodeURIComponent("" + comments) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApproveTimeRequest(_response);
        });
    }

    protected processApproveTimeRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getPendingLeaveRequests(managerId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/GetPendingLeaveRequests/{managerId}";
        if (managerId === undefined || managerId === null)
            throw new globalThis.Error("The parameter 'managerId' must be defined.");
        url_ = url_.replace("{managerId}", encodeURIComponent("" + managerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetPendingLeaveRequests(_response);
        });
    }

    protected processGetPendingLeaveRequests(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ViewLeaveRequest?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewLeaveRequest(_response);
        });
    }

    protected processViewLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    reviewLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, decision?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ReviewLeaveRequest?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (decision === null)
            throw new globalThis.Error("The parameter 'decision' cannot be null.");
        else if (decision !== undefined)
            url_ += "decision=" + encodeURIComponent("" + decision) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processReviewLeaveRequest(_response);
        });
    }

    protected processReviewLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    approveLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ApproveLeaveRequest?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApproveLeaveRequest(_response);
        });
    }

    protected processApproveLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    rejectLeaveRequest(leaveRequestId?: number | undefined, managerId?: number | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/RejectLeaveRequest?";
        if (leaveRequestId === null)
            throw new globalThis.Error("The parameter 'leaveRequestId' cannot be null.");
        else if (leaveRequestId !== undefined)
            url_ += "leaveRequestId=" + encodeURIComponent("" + leaveRequestId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (reason === null)
            throw new globalThis.Error("The parameter 'reason' cannot be null.");
        else if (reason !== undefined)
            url_ += "reason=" + encodeURIComponent("" + reason) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRejectLeaveRequest(_response);
        });
    }

    protected processRejectLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    delegateLeaveApproval(managerId?: number | undefined, delegateId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/DelegateLeaveApproval?";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (delegateId === null)
            throw new globalThis.Error("The parameter 'delegateId' cannot be null.");
        else if (delegateId !== undefined)
            url_ += "delegateId=" + encodeURIComponent("" + delegateId) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDelegateLeaveApproval(_response);
        });
    }

    protected processDelegateLeaveApproval(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    notifyNewLeaveRequest(managerId?: number | undefined, requestId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/NotifyNewLeaveRequest?";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (requestId === null)
            throw new globalThis.Error("The parameter 'requestId' cannot be null.");
        else if (requestId !== undefined)
            url_ += "requestId=" + encodeURIComponent("" + requestId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processNotifyNewLeaveRequest(_response);
        });
    }

    protected processNotifyNewLeaveRequest(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    flagIrregularLeave(employeeId?: number | undefined, managerId?: number | undefined, patternDescription?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/FlagIrregularLeave?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (patternDescription === null)
            throw new globalThis.Error("The parameter 'patternDescription' cannot be null.");
        else if (patternDescription !== undefined)
            url_ += "patternDescription=" + encodeURIComponent("" + patternDescription) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processFlagIrregularLeave(_response);
        });
    }

    protected processFlagIrregularLeave(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    sendTeamNotification(managerId?: number | undefined, messageContent?: string | undefined, urgency?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/SendTeamNotification?";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (messageContent === null)
            throw new globalThis.Error("The parameter 'messageContent' cannot be null.");
        else if (messageContent !== undefined)
            url_ += "messageContent=" + encodeURIComponent("" + messageContent) + "&";
        if (urgency === null)
            throw new globalThis.Error("The parameter 'urgency' cannot be null.");
        else if (urgency !== undefined)
            url_ += "urgency=" + encodeURIComponent("" + urgency) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSendTeamNotification(_response);
        });
    }

    protected processSendTeamNotification(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getTeamStatistics(managerId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/GetTeamStatistics/{managerId}";
        if (managerId === undefined || managerId === null)
            throw new globalThis.Error("The parameter 'managerId' must be defined.");
        url_ = url_.replace("{managerId}", encodeURIComponent("" + managerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetTeamStatistics(_response);
        });
    }

    protected processGetTeamStatistics(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getTeamSummary(managerId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/GetTeamSummary/{managerId}";
        if (managerId === undefined || managerId === null)
            throw new globalThis.Error("The parameter 'managerId' must be defined.");
        url_ = url_.replace("{managerId}", encodeURIComponent("" + managerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetTeamSummary(_response);
        });
    }

    protected processGetTeamSummary(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewDepartmentSummary(departmentId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ViewDepartmentSummary/{departmentId}";
        if (departmentId === undefined || departmentId === null)
            throw new globalThis.Error("The parameter 'departmentId' must be defined.");
        url_ = url_.replace("{departmentId}", encodeURIComponent("" + departmentId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewDepartmentSummary(_response);
        });
    }

    protected processViewDepartmentSummary(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    approveMissionCompletion(missionId?: number | undefined, managerId?: number | undefined, remarks?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Manager/ApproveMissionCompletion?";
        if (missionId === null)
            throw new globalThis.Error("The parameter 'missionId' cannot be null.");
        else if (missionId !== undefined)
            url_ += "missionId=" + encodeURIComponent("" + missionId) + "&";
        if (managerId === null)
            throw new globalThis.Error("The parameter 'managerId' cannot be null.");
        else if (managerId !== undefined)
            url_ += "managerId=" + encodeURIComponent("" + managerId) + "&";
        if (remarks === null)
            throw new globalThis.Error("The parameter 'remarks' cannot be null.");
        else if (remarks !== undefined)
            url_ += "remarks=" + encodeURIComponent("" + remarks) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApproveMissionCompletion(_response);
        });
    }

    protected processApproveMissionCompletion(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export interface IPayrollClient {
    generatePayroll(startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    calculateNetSalary(payrollId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    adjustPayrollItem(payrollId?: number | undefined, type?: string | undefined, amount?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    modifyPastPayroll(payrollRunId?: number | undefined, employeeId?: number | undefined, fieldName?: string | undefined, newValue?: number | undefined, modifiedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    validateAttendanceBeforePayroll(payrollPeriodId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    syncAttendanceToPayroll(syncDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    syncApprovedPermissionsToPayroll(payrollPeriodId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureSigningBonus(employeeId?: number | undefined, bonusAmount?: number | undefined, effectiveDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureTerminationBenefits(employeeId?: number | undefined, compensationAmount?: number | undefined, effectiveDate?: Date | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureSigningBonusPolicy(bonusType?: string | undefined, amount?: number | undefined, eligibilityCriteria?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getBonusEligibleEmployees(month?: number | undefined, year?: number | undefined, signal?: AbortSignal): Promise<any[]>;
    applyPayrollPolicy(policyId?: number | undefined, payrollId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configurePayrollPolicies(policyType?: string | undefined, policyDetails?: string | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    approvePayrollConfigChanges(configId?: number | undefined, approverId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    approvePayrollConfiguration(configId?: number | undefined, approvedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureEscalationWorkflow(thresholdAmount?: number | undefined, approverRole?: string | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureOvertimeRules(dayType?: string | undefined, multiplier?: number | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configurePayGrades(gradeName?: string | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    definePayGrades(gradeName?: string | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateSalaryType(employeeId?: number | undefined, salaryTypeId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    definePayType(employeeId?: number | undefined, payType?: string | undefined, effectiveDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureShiftAllowances(shiftType?: string | undefined, allowanceName?: string | undefined, amount?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureShiftAllowanceWithAudit(shiftType?: string | undefined, allowanceAmount?: number | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureInsuranceBrackets(insuranceType?: string | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, employeeContribution?: number | undefined, employerContribution?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateInsuranceBrackets(bracketId?: number | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, employeeContribution?: number | undefined, employerContribution?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    manageTaxRules(taxRuleName?: string | undefined, countryCode?: string | undefined, rate?: number | undefined, exemption?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    enableMultiCurrencyPayroll(currencyCode?: string | undefined, exchangeRate?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getMonthlyPayrollSummary(month?: number | undefined, year?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getEmployeePayrollHistory(employeeId: number, signal?: AbortSignal): Promise<FileResponse>;
    getPayrollByDepartment(departmentId?: number | undefined, month?: number | undefined, year?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    generateTaxStatement(employeeId?: number | undefined, taxYear?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
}

export class PayrollClient implements IPayrollClient {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance || axios.create();

        this.baseUrl = baseUrl ?? "https://localhost:7140";

    }

    generatePayroll(startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/GeneratePayroll?";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGeneratePayroll(_response);
        });
    }

    protected processGeneratePayroll(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    calculateNetSalary(payrollId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/CalculateNetSalary?";
        if (payrollId === null)
            throw new globalThis.Error("The parameter 'payrollId' cannot be null.");
        else if (payrollId !== undefined)
            url_ += "payrollId=" + encodeURIComponent("" + payrollId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCalculateNetSalary(_response);
        });
    }

    protected processCalculateNetSalary(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    adjustPayrollItem(payrollId?: number | undefined, type?: string | undefined, amount?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/AdjustPayrollItem?";
        if (payrollId === null)
            throw new globalThis.Error("The parameter 'payrollId' cannot be null.");
        else if (payrollId !== undefined)
            url_ += "payrollId=" + encodeURIComponent("" + payrollId) + "&";
        if (type === null)
            throw new globalThis.Error("The parameter 'type' cannot be null.");
        else if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        if (amount === null)
            throw new globalThis.Error("The parameter 'amount' cannot be null.");
        else if (amount !== undefined)
            url_ += "amount=" + encodeURIComponent("" + amount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAdjustPayrollItem(_response);
        });
    }

    protected processAdjustPayrollItem(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    modifyPastPayroll(payrollRunId?: number | undefined, employeeId?: number | undefined, fieldName?: string | undefined, newValue?: number | undefined, modifiedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ModifyPastPayroll?";
        if (payrollRunId === null)
            throw new globalThis.Error("The parameter 'payrollRunId' cannot be null.");
        else if (payrollRunId !== undefined)
            url_ += "payrollRunId=" + encodeURIComponent("" + payrollRunId) + "&";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (fieldName === null)
            throw new globalThis.Error("The parameter 'fieldName' cannot be null.");
        else if (fieldName !== undefined)
            url_ += "fieldName=" + encodeURIComponent("" + fieldName) + "&";
        if (newValue === null)
            throw new globalThis.Error("The parameter 'newValue' cannot be null.");
        else if (newValue !== undefined)
            url_ += "newValue=" + encodeURIComponent("" + newValue) + "&";
        if (modifiedBy === null)
            throw new globalThis.Error("The parameter 'modifiedBy' cannot be null.");
        else if (modifiedBy !== undefined)
            url_ += "modifiedBy=" + encodeURIComponent("" + modifiedBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processModifyPastPayroll(_response);
        });
    }

    protected processModifyPastPayroll(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    validateAttendanceBeforePayroll(payrollPeriodId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ValidateAttendanceBeforePayroll?";
        if (payrollPeriodId === null)
            throw new globalThis.Error("The parameter 'payrollPeriodId' cannot be null.");
        else if (payrollPeriodId !== undefined)
            url_ += "payrollPeriodId=" + encodeURIComponent("" + payrollPeriodId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processValidateAttendanceBeforePayroll(_response);
        });
    }

    protected processValidateAttendanceBeforePayroll(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    syncAttendanceToPayroll(syncDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/SyncAttendanceToPayroll?";
        if (syncDate === null)
            throw new globalThis.Error("The parameter 'syncDate' cannot be null.");
        else if (syncDate !== undefined)
            url_ += "syncDate=" + encodeURIComponent(syncDate ? "" + syncDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSyncAttendanceToPayroll(_response);
        });
    }

    protected processSyncAttendanceToPayroll(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    syncApprovedPermissionsToPayroll(payrollPeriodId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/SyncApprovedPermissionsToPayroll?";
        if (payrollPeriodId === null)
            throw new globalThis.Error("The parameter 'payrollPeriodId' cannot be null.");
        else if (payrollPeriodId !== undefined)
            url_ += "payrollPeriodId=" + encodeURIComponent("" + payrollPeriodId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSyncApprovedPermissionsToPayroll(_response);
        });
    }

    protected processSyncApprovedPermissionsToPayroll(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureSigningBonus(employeeId?: number | undefined, bonusAmount?: number | undefined, effectiveDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureSigningBonus?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (bonusAmount === null)
            throw new globalThis.Error("The parameter 'bonusAmount' cannot be null.");
        else if (bonusAmount !== undefined)
            url_ += "bonusAmount=" + encodeURIComponent("" + bonusAmount) + "&";
        if (effectiveDate === null)
            throw new globalThis.Error("The parameter 'effectiveDate' cannot be null.");
        else if (effectiveDate !== undefined)
            url_ += "effectiveDate=" + encodeURIComponent(effectiveDate ? "" + effectiveDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureSigningBonus(_response);
        });
    }

    protected processConfigureSigningBonus(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureTerminationBenefits(employeeId?: number | undefined, compensationAmount?: number | undefined, effectiveDate?: Date | undefined, reason?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureTerminationBenefits?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (compensationAmount === null)
            throw new globalThis.Error("The parameter 'compensationAmount' cannot be null.");
        else if (compensationAmount !== undefined)
            url_ += "compensationAmount=" + encodeURIComponent("" + compensationAmount) + "&";
        if (effectiveDate === null)
            throw new globalThis.Error("The parameter 'effectiveDate' cannot be null.");
        else if (effectiveDate !== undefined)
            url_ += "effectiveDate=" + encodeURIComponent(effectiveDate ? "" + effectiveDate.toISOString() : "") + "&";
        if (reason === null)
            throw new globalThis.Error("The parameter 'reason' cannot be null.");
        else if (reason !== undefined)
            url_ += "reason=" + encodeURIComponent("" + reason) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureTerminationBenefits(_response);
        });
    }

    protected processConfigureTerminationBenefits(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureSigningBonusPolicy(bonusType?: string | undefined, amount?: number | undefined, eligibilityCriteria?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureSigningBonusPolicy?";
        if (bonusType === null)
            throw new globalThis.Error("The parameter 'bonusType' cannot be null.");
        else if (bonusType !== undefined)
            url_ += "bonusType=" + encodeURIComponent("" + bonusType) + "&";
        if (amount === null)
            throw new globalThis.Error("The parameter 'amount' cannot be null.");
        else if (amount !== undefined)
            url_ += "amount=" + encodeURIComponent("" + amount) + "&";
        if (eligibilityCriteria === null)
            throw new globalThis.Error("The parameter 'eligibilityCriteria' cannot be null.");
        else if (eligibilityCriteria !== undefined)
            url_ += "eligibilityCriteria=" + encodeURIComponent("" + eligibilityCriteria) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureSigningBonusPolicy(_response);
        });
    }

    protected processConfigureSigningBonusPolicy(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getBonusEligibleEmployees(month?: number | undefined, year?: number | undefined, signal?: AbortSignal): Promise<any[]> {
        let url_ = this.baseUrl + "/Payroll/GetBonusEligibleEmployees?";
        if (month === null)
            throw new globalThis.Error("The parameter 'month' cannot be null.");
        else if (month !== undefined)
            url_ += "month=" + encodeURIComponent("" + month) + "&";
        if (year === null)
            throw new globalThis.Error("The parameter 'year' cannot be null.");
        else if (year !== undefined)
            url_ += "year=" + encodeURIComponent("" + year) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetBonusEligibleEmployees(_response);
        });
    }

    protected processGetBonusEligibleEmployees(response: AxiosResponse): Promise<any[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<any[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<any[]>(null as any);
    }

    applyPayrollPolicy(policyId?: number | undefined, payrollId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ApplyPayrollPolicy?";
        if (policyId === null)
            throw new globalThis.Error("The parameter 'policyId' cannot be null.");
        else if (policyId !== undefined)
            url_ += "policyId=" + encodeURIComponent("" + policyId) + "&";
        if (payrollId === null)
            throw new globalThis.Error("The parameter 'payrollId' cannot be null.");
        else if (payrollId !== undefined)
            url_ += "payrollId=" + encodeURIComponent("" + payrollId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApplyPayrollPolicy(_response);
        });
    }

    protected processApplyPayrollPolicy(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configurePayrollPolicies(policyType?: string | undefined, policyDetails?: string | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigurePayrollPolicies?";
        if (policyType === null)
            throw new globalThis.Error("The parameter 'policyType' cannot be null.");
        else if (policyType !== undefined)
            url_ += "policyType=" + encodeURIComponent("" + policyType) + "&";
        if (policyDetails === null)
            throw new globalThis.Error("The parameter 'policyDetails' cannot be null.");
        else if (policyDetails !== undefined)
            url_ += "policyDetails=" + encodeURIComponent("" + policyDetails) + "&";
        if (createdBy === null)
            throw new globalThis.Error("The parameter 'createdBy' cannot be null.");
        else if (createdBy !== undefined)
            url_ += "createdBy=" + encodeURIComponent("" + createdBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigurePayrollPolicies(_response);
        });
    }

    protected processConfigurePayrollPolicies(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    approvePayrollConfigChanges(configId?: number | undefined, approverId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ApprovePayrollConfigChanges?";
        if (configId === null)
            throw new globalThis.Error("The parameter 'configId' cannot be null.");
        else if (configId !== undefined)
            url_ += "configId=" + encodeURIComponent("" + configId) + "&";
        if (approverId === null)
            throw new globalThis.Error("The parameter 'approverId' cannot be null.");
        else if (approverId !== undefined)
            url_ += "approverId=" + encodeURIComponent("" + approverId) + "&";
        if (status === null)
            throw new globalThis.Error("The parameter 'status' cannot be null.");
        else if (status !== undefined)
            url_ += "status=" + encodeURIComponent("" + status) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApprovePayrollConfigChanges(_response);
        });
    }

    protected processApprovePayrollConfigChanges(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    approvePayrollConfiguration(configId?: number | undefined, approvedBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ApprovePayrollConfiguration?";
        if (configId === null)
            throw new globalThis.Error("The parameter 'configId' cannot be null.");
        else if (configId !== undefined)
            url_ += "configId=" + encodeURIComponent("" + configId) + "&";
        if (approvedBy === null)
            throw new globalThis.Error("The parameter 'approvedBy' cannot be null.");
        else if (approvedBy !== undefined)
            url_ += "approvedBy=" + encodeURIComponent("" + approvedBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApprovePayrollConfiguration(_response);
        });
    }

    protected processApprovePayrollConfiguration(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureEscalationWorkflow(thresholdAmount?: number | undefined, approverRole?: string | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureEscalationWorkflow?";
        if (thresholdAmount === null)
            throw new globalThis.Error("The parameter 'thresholdAmount' cannot be null.");
        else if (thresholdAmount !== undefined)
            url_ += "thresholdAmount=" + encodeURIComponent("" + thresholdAmount) + "&";
        if (approverRole === null)
            throw new globalThis.Error("The parameter 'approverRole' cannot be null.");
        else if (approverRole !== undefined)
            url_ += "approverRole=" + encodeURIComponent("" + approverRole) + "&";
        if (createdBy === null)
            throw new globalThis.Error("The parameter 'createdBy' cannot be null.");
        else if (createdBy !== undefined)
            url_ += "createdBy=" + encodeURIComponent("" + createdBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureEscalationWorkflow(_response);
        });
    }

    protected processConfigureEscalationWorkflow(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureOvertimeRules(dayType?: string | undefined, multiplier?: number | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureOvertimeRules?";
        if (dayType === null)
            throw new globalThis.Error("The parameter 'dayType' cannot be null.");
        else if (dayType !== undefined)
            url_ += "dayType=" + encodeURIComponent("" + dayType) + "&";
        if (multiplier === null)
            throw new globalThis.Error("The parameter 'multiplier' cannot be null.");
        else if (multiplier !== undefined)
            url_ += "multiplier=" + encodeURIComponent("" + multiplier) + "&";
        if (createdBy === null)
            throw new globalThis.Error("The parameter 'createdBy' cannot be null.");
        else if (createdBy !== undefined)
            url_ += "createdBy=" + encodeURIComponent("" + createdBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureOvertimeRules(_response);
        });
    }

    protected processConfigureOvertimeRules(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configurePayGrades(gradeName?: string | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigurePayGrades?";
        if (gradeName === null)
            throw new globalThis.Error("The parameter 'gradeName' cannot be null.");
        else if (gradeName !== undefined)
            url_ += "gradeName=" + encodeURIComponent("" + gradeName) + "&";
        if (minSalary === null)
            throw new globalThis.Error("The parameter 'minSalary' cannot be null.");
        else if (minSalary !== undefined)
            url_ += "minSalary=" + encodeURIComponent("" + minSalary) + "&";
        if (maxSalary === null)
            throw new globalThis.Error("The parameter 'maxSalary' cannot be null.");
        else if (maxSalary !== undefined)
            url_ += "maxSalary=" + encodeURIComponent("" + maxSalary) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigurePayGrades(_response);
        });
    }

    protected processConfigurePayGrades(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    definePayGrades(gradeName?: string | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/DefinePayGrades?";
        if (gradeName === null)
            throw new globalThis.Error("The parameter 'gradeName' cannot be null.");
        else if (gradeName !== undefined)
            url_ += "gradeName=" + encodeURIComponent("" + gradeName) + "&";
        if (minSalary === null)
            throw new globalThis.Error("The parameter 'minSalary' cannot be null.");
        else if (minSalary !== undefined)
            url_ += "minSalary=" + encodeURIComponent("" + minSalary) + "&";
        if (maxSalary === null)
            throw new globalThis.Error("The parameter 'maxSalary' cannot be null.");
        else if (maxSalary !== undefined)
            url_ += "maxSalary=" + encodeURIComponent("" + maxSalary) + "&";
        if (createdBy === null)
            throw new globalThis.Error("The parameter 'createdBy' cannot be null.");
        else if (createdBy !== undefined)
            url_ += "createdBy=" + encodeURIComponent("" + createdBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDefinePayGrades(_response);
        });
    }

    protected processDefinePayGrades(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateSalaryType(employeeId?: number | undefined, salaryTypeId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/UpdateSalaryType?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (salaryTypeId === null)
            throw new globalThis.Error("The parameter 'salaryTypeId' cannot be null.");
        else if (salaryTypeId !== undefined)
            url_ += "salaryTypeId=" + encodeURIComponent("" + salaryTypeId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateSalaryType(_response);
        });
    }

    protected processUpdateSalaryType(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    definePayType(employeeId?: number | undefined, payType?: string | undefined, effectiveDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/DefinePayType?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (payType === null)
            throw new globalThis.Error("The parameter 'payType' cannot be null.");
        else if (payType !== undefined)
            url_ += "payType=" + encodeURIComponent("" + payType) + "&";
        if (effectiveDate === null)
            throw new globalThis.Error("The parameter 'effectiveDate' cannot be null.");
        else if (effectiveDate !== undefined)
            url_ += "effectiveDate=" + encodeURIComponent(effectiveDate ? "" + effectiveDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDefinePayType(_response);
        });
    }

    protected processDefinePayType(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureShiftAllowances(shiftType?: string | undefined, allowanceName?: string | undefined, amount?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureShiftAllowances?";
        if (shiftType === null)
            throw new globalThis.Error("The parameter 'shiftType' cannot be null.");
        else if (shiftType !== undefined)
            url_ += "shiftType=" + encodeURIComponent("" + shiftType) + "&";
        if (allowanceName === null)
            throw new globalThis.Error("The parameter 'allowanceName' cannot be null.");
        else if (allowanceName !== undefined)
            url_ += "allowanceName=" + encodeURIComponent("" + allowanceName) + "&";
        if (amount === null)
            throw new globalThis.Error("The parameter 'amount' cannot be null.");
        else if (amount !== undefined)
            url_ += "amount=" + encodeURIComponent("" + amount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureShiftAllowances(_response);
        });
    }

    protected processConfigureShiftAllowances(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureShiftAllowanceWithAudit(shiftType?: string | undefined, allowanceAmount?: number | undefined, createdBy?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureShiftAllowanceWithAudit?";
        if (shiftType === null)
            throw new globalThis.Error("The parameter 'shiftType' cannot be null.");
        else if (shiftType !== undefined)
            url_ += "shiftType=" + encodeURIComponent("" + shiftType) + "&";
        if (allowanceAmount === null)
            throw new globalThis.Error("The parameter 'allowanceAmount' cannot be null.");
        else if (allowanceAmount !== undefined)
            url_ += "allowanceAmount=" + encodeURIComponent("" + allowanceAmount) + "&";
        if (createdBy === null)
            throw new globalThis.Error("The parameter 'createdBy' cannot be null.");
        else if (createdBy !== undefined)
            url_ += "createdBy=" + encodeURIComponent("" + createdBy) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureShiftAllowanceWithAudit(_response);
        });
    }

    protected processConfigureShiftAllowanceWithAudit(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureInsuranceBrackets(insuranceType?: string | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, employeeContribution?: number | undefined, employerContribution?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ConfigureInsuranceBrackets?";
        if (insuranceType === null)
            throw new globalThis.Error("The parameter 'insuranceType' cannot be null.");
        else if (insuranceType !== undefined)
            url_ += "insuranceType=" + encodeURIComponent("" + insuranceType) + "&";
        if (minSalary === null)
            throw new globalThis.Error("The parameter 'minSalary' cannot be null.");
        else if (minSalary !== undefined)
            url_ += "minSalary=" + encodeURIComponent("" + minSalary) + "&";
        if (maxSalary === null)
            throw new globalThis.Error("The parameter 'maxSalary' cannot be null.");
        else if (maxSalary !== undefined)
            url_ += "maxSalary=" + encodeURIComponent("" + maxSalary) + "&";
        if (employeeContribution === null)
            throw new globalThis.Error("The parameter 'employeeContribution' cannot be null.");
        else if (employeeContribution !== undefined)
            url_ += "employeeContribution=" + encodeURIComponent("" + employeeContribution) + "&";
        if (employerContribution === null)
            throw new globalThis.Error("The parameter 'employerContribution' cannot be null.");
        else if (employerContribution !== undefined)
            url_ += "employerContribution=" + encodeURIComponent("" + employerContribution) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureInsuranceBrackets(_response);
        });
    }

    protected processConfigureInsuranceBrackets(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateInsuranceBrackets(bracketId?: number | undefined, minSalary?: number | undefined, maxSalary?: number | undefined, employeeContribution?: number | undefined, employerContribution?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/UpdateInsuranceBrackets?";
        if (bracketId === null)
            throw new globalThis.Error("The parameter 'bracketId' cannot be null.");
        else if (bracketId !== undefined)
            url_ += "bracketId=" + encodeURIComponent("" + bracketId) + "&";
        if (minSalary === null)
            throw new globalThis.Error("The parameter 'minSalary' cannot be null.");
        else if (minSalary !== undefined)
            url_ += "minSalary=" + encodeURIComponent("" + minSalary) + "&";
        if (maxSalary === null)
            throw new globalThis.Error("The parameter 'maxSalary' cannot be null.");
        else if (maxSalary !== undefined)
            url_ += "maxSalary=" + encodeURIComponent("" + maxSalary) + "&";
        if (employeeContribution === null)
            throw new globalThis.Error("The parameter 'employeeContribution' cannot be null.");
        else if (employeeContribution !== undefined)
            url_ += "employeeContribution=" + encodeURIComponent("" + employeeContribution) + "&";
        if (employerContribution === null)
            throw new globalThis.Error("The parameter 'employerContribution' cannot be null.");
        else if (employerContribution !== undefined)
            url_ += "employerContribution=" + encodeURIComponent("" + employerContribution) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateInsuranceBrackets(_response);
        });
    }

    protected processUpdateInsuranceBrackets(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    manageTaxRules(taxRuleName?: string | undefined, countryCode?: string | undefined, rate?: number | undefined, exemption?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/ManageTaxRules?";
        if (taxRuleName === null)
            throw new globalThis.Error("The parameter 'taxRuleName' cannot be null.");
        else if (taxRuleName !== undefined)
            url_ += "taxRuleName=" + encodeURIComponent("" + taxRuleName) + "&";
        if (countryCode === null)
            throw new globalThis.Error("The parameter 'countryCode' cannot be null.");
        else if (countryCode !== undefined)
            url_ += "countryCode=" + encodeURIComponent("" + countryCode) + "&";
        if (rate === null)
            throw new globalThis.Error("The parameter 'rate' cannot be null.");
        else if (rate !== undefined)
            url_ += "rate=" + encodeURIComponent("" + rate) + "&";
        if (exemption === null)
            throw new globalThis.Error("The parameter 'exemption' cannot be null.");
        else if (exemption !== undefined)
            url_ += "exemption=" + encodeURIComponent("" + exemption) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processManageTaxRules(_response);
        });
    }

    protected processManageTaxRules(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    enableMultiCurrencyPayroll(currencyCode?: string | undefined, exchangeRate?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/EnableMultiCurrencyPayroll?";
        if (currencyCode === null)
            throw new globalThis.Error("The parameter 'currencyCode' cannot be null.");
        else if (currencyCode !== undefined)
            url_ += "currencyCode=" + encodeURIComponent("" + currencyCode) + "&";
        if (exchangeRate === null)
            throw new globalThis.Error("The parameter 'exchangeRate' cannot be null.");
        else if (exchangeRate !== undefined)
            url_ += "exchangeRate=" + encodeURIComponent("" + exchangeRate) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processEnableMultiCurrencyPayroll(_response);
        });
    }

    protected processEnableMultiCurrencyPayroll(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getMonthlyPayrollSummary(month?: number | undefined, year?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/GetMonthlyPayrollSummary?";
        if (month === null)
            throw new globalThis.Error("The parameter 'month' cannot be null.");
        else if (month !== undefined)
            url_ += "month=" + encodeURIComponent("" + month) + "&";
        if (year === null)
            throw new globalThis.Error("The parameter 'year' cannot be null.");
        else if (year !== undefined)
            url_ += "year=" + encodeURIComponent("" + year) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetMonthlyPayrollSummary(_response);
        });
    }

    protected processGetMonthlyPayrollSummary(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getEmployeePayrollHistory(employeeId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/GetEmployeePayrollHistory/{employeeId}";
        if (employeeId === undefined || employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' must be defined.");
        url_ = url_.replace("{employeeId}", encodeURIComponent("" + employeeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetEmployeePayrollHistory(_response);
        });
    }

    protected processGetEmployeePayrollHistory(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getPayrollByDepartment(departmentId?: number | undefined, month?: number | undefined, year?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/GetPayrollByDepartment?";
        if (departmentId === null)
            throw new globalThis.Error("The parameter 'departmentId' cannot be null.");
        else if (departmentId !== undefined)
            url_ += "departmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (month === null)
            throw new globalThis.Error("The parameter 'month' cannot be null.");
        else if (month !== undefined)
            url_ += "month=" + encodeURIComponent("" + month) + "&";
        if (year === null)
            throw new globalThis.Error("The parameter 'year' cannot be null.");
        else if (year !== undefined)
            url_ += "year=" + encodeURIComponent("" + year) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetPayrollByDepartment(_response);
        });
    }

    protected processGetPayrollByDepartment(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    generateTaxStatement(employeeId?: number | undefined, taxYear?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/Payroll/GenerateTaxStatement?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (taxYear === null)
            throw new globalThis.Error("The parameter 'taxYear' cannot be null.");
        else if (taxYear !== undefined)
            url_ += "taxYear=" + encodeURIComponent("" + taxYear) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGenerateTaxStatement(_response);
        });
    }

    protected processGenerateTaxStatement(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export interface IAdminClient {
    viewEmployeeInfo(id: number, signal?: AbortSignal): Promise<Employee>;
    addEmployee(employee: Employee, signal?: AbortSignal): Promise<FileResponse>;
    updateEmployeeInfo(id: number, employee: Employee, signal?: AbortSignal): Promise<FileResponse>;
    assignRole(employeeId?: number | undefined, roleId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    getDepartmentEmployeeStats(signal?: AbortSignal): Promise<FileResponse>;
    reassignManager(employeeId?: number | undefined, newManagerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    reassignHierarchy(employeeId?: number | undefined, newDepartmentId?: number | undefined, newManagerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    notifyStructureChange(affectedEmployees?: string | undefined, message?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    viewOrgHierarchy(signal?: AbortSignal): Promise<FileResponse>;
    assignShiftToEmployee(employeeId?: number | undefined, shiftId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    updateShiftStatus(shiftAssignmentId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    assignShiftToDepartment(departmentId?: number | undefined, shiftId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    assignCustomShift(employeeId?: number | undefined, shiftName?: string | undefined, shiftType?: string | undefined, startTime?: string | undefined, endTime?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    configureSplitShift(shiftName?: string | undefined, firstSlotStart?: string | undefined, firstSlotEnd?: string | undefined, secondSlotStart?: string | undefined, secondSlotEnd?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    enableFirstInLastOut(enable?: boolean | undefined, signal?: AbortSignal): Promise<FileResponse>;
    tagAttendanceSource(attendanceId?: number | undefined, sourceType?: string | undefined, deviceId?: number | undefined, latitude?: number | undefined, longitude?: number | undefined, signal?: AbortSignal): Promise<FileResponse>;
    syncOfflineAttendance(deviceId?: number | undefined, employeeId?: number | undefined, clockTime?: Date | undefined, type?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
    logAttendanceEdit(attendanceId?: number | undefined, editedBy?: number | undefined, oldValue?: Date | undefined, newValue?: Date | undefined, editTimestamp?: Date | undefined, signal?: AbortSignal): Promise<FileResponse>;
    applyHolidayOverrides(holidayId: number, signal?: AbortSignal): Promise<FileResponse>;
    manageUserAccounts(userId?: number | undefined, role?: string | undefined, action?: string | undefined, signal?: AbortSignal): Promise<FileResponse>;
}

export class AdminClient implements IAdminClient {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance || axios.create();

        this.baseUrl = baseUrl ?? "https://localhost:7140";

    }

    viewEmployeeInfo(id: number, signal?: AbortSignal): Promise<Employee> {
        let url_ = this.baseUrl + "/SystemAdmin/ViewEmployeeInfo/{id}";
        if (id === undefined || id === null)
            throw new globalThis.Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewEmployeeInfo(_response);
        });
    }

    protected processViewEmployeeInfo(response: AxiosResponse): Promise<Employee> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Employee>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Employee>(null as any);
    }

    addEmployee(employee: Employee, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/AddEmployee";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(employee);

        let options_: AxiosRequestConfig = {
            data: content_,
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddEmployee(_response);
        });
    }

    protected processAddEmployee(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateEmployeeInfo(id: number, employee: Employee, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/UpdateEmployeeInfo/{id}";
        if (id === undefined || id === null)
            throw new globalThis.Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(employee);

        let options_: AxiosRequestConfig = {
            data: content_,
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateEmployeeInfo(_response);
        });
    }

    protected processUpdateEmployeeInfo(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    assignRole(employeeId?: number | undefined, roleId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/AssignRole?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (roleId === null)
            throw new globalThis.Error("The parameter 'roleId' cannot be null.");
        else if (roleId !== undefined)
            url_ += "roleId=" + encodeURIComponent("" + roleId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAssignRole(_response);
        });
    }

    protected processAssignRole(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    getDepartmentEmployeeStats(signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/GetDepartmentEmployeeStats";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetDepartmentEmployeeStats(_response);
        });
    }

    protected processGetDepartmentEmployeeStats(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    reassignManager(employeeId?: number | undefined, newManagerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/ReassignManager?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (newManagerId === null)
            throw new globalThis.Error("The parameter 'newManagerId' cannot be null.");
        else if (newManagerId !== undefined)
            url_ += "newManagerId=" + encodeURIComponent("" + newManagerId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processReassignManager(_response);
        });
    }

    protected processReassignManager(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    reassignHierarchy(employeeId?: number | undefined, newDepartmentId?: number | undefined, newManagerId?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/ReassignHierarchy?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (newDepartmentId === null)
            throw new globalThis.Error("The parameter 'newDepartmentId' cannot be null.");
        else if (newDepartmentId !== undefined)
            url_ += "newDepartmentId=" + encodeURIComponent("" + newDepartmentId) + "&";
        if (newManagerId === null)
            throw new globalThis.Error("The parameter 'newManagerId' cannot be null.");
        else if (newManagerId !== undefined)
            url_ += "newManagerId=" + encodeURIComponent("" + newManagerId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processReassignHierarchy(_response);
        });
    }

    protected processReassignHierarchy(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    notifyStructureChange(affectedEmployees?: string | undefined, message?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/NotifyStructureChange?";
        if (affectedEmployees === null)
            throw new globalThis.Error("The parameter 'affectedEmployees' cannot be null.");
        else if (affectedEmployees !== undefined)
            url_ += "affectedEmployees=" + encodeURIComponent("" + affectedEmployees) + "&";
        if (message === null)
            throw new globalThis.Error("The parameter 'message' cannot be null.");
        else if (message !== undefined)
            url_ += "message=" + encodeURIComponent("" + message) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processNotifyStructureChange(_response);
        });
    }

    protected processNotifyStructureChange(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    viewOrgHierarchy(signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/ViewOrgHierarchy";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processViewOrgHierarchy(_response);
        });
    }

    protected processViewOrgHierarchy(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    assignShiftToEmployee(employeeId?: number | undefined, shiftId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/AssignShiftToEmployee?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (shiftId === null)
            throw new globalThis.Error("The parameter 'shiftId' cannot be null.");
        else if (shiftId !== undefined)
            url_ += "shiftId=" + encodeURIComponent("" + shiftId) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAssignShiftToEmployee(_response);
        });
    }

    protected processAssignShiftToEmployee(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateShiftStatus(shiftAssignmentId?: number | undefined, status?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/UpdateShiftStatus?";
        if (shiftAssignmentId === null)
            throw new globalThis.Error("The parameter 'shiftAssignmentId' cannot be null.");
        else if (shiftAssignmentId !== undefined)
            url_ += "shiftAssignmentId=" + encodeURIComponent("" + shiftAssignmentId) + "&";
        if (status === null)
            throw new globalThis.Error("The parameter 'status' cannot be null.");
        else if (status !== undefined)
            url_ += "status=" + encodeURIComponent("" + status) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateShiftStatus(_response);
        });
    }

    protected processUpdateShiftStatus(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    assignShiftToDepartment(departmentId?: number | undefined, shiftId?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/AssignShiftToDepartment?";
        if (departmentId === null)
            throw new globalThis.Error("The parameter 'departmentId' cannot be null.");
        else if (departmentId !== undefined)
            url_ += "departmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (shiftId === null)
            throw new globalThis.Error("The parameter 'shiftId' cannot be null.");
        else if (shiftId !== undefined)
            url_ += "shiftId=" + encodeURIComponent("" + shiftId) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAssignShiftToDepartment(_response);
        });
    }

    protected processAssignShiftToDepartment(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    assignCustomShift(employeeId?: number | undefined, shiftName?: string | undefined, shiftType?: string | undefined, startTime?: string | undefined, endTime?: string | undefined, startDate?: Date | undefined, endDate?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/AssignCustomShift?";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (shiftName === null)
            throw new globalThis.Error("The parameter 'shiftName' cannot be null.");
        else if (shiftName !== undefined)
            url_ += "shiftName=" + encodeURIComponent("" + shiftName) + "&";
        if (shiftType === null)
            throw new globalThis.Error("The parameter 'shiftType' cannot be null.");
        else if (shiftType !== undefined)
            url_ += "shiftType=" + encodeURIComponent("" + shiftType) + "&";
        if (startTime === null)
            throw new globalThis.Error("The parameter 'startTime' cannot be null.");
        else if (startTime !== undefined)
            url_ += "startTime=" + encodeURIComponent("" + startTime) + "&";
        if (endTime === null)
            throw new globalThis.Error("The parameter 'endTime' cannot be null.");
        else if (endTime !== undefined)
            url_ += "endTime=" + encodeURIComponent("" + endTime) + "&";
        if (startDate === null)
            throw new globalThis.Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "startDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        if (endDate === null)
            throw new globalThis.Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "endDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAssignCustomShift(_response);
        });
    }

    protected processAssignCustomShift(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    configureSplitShift(shiftName?: string | undefined, firstSlotStart?: string | undefined, firstSlotEnd?: string | undefined, secondSlotStart?: string | undefined, secondSlotEnd?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/ConfigureSplitShift?";
        if (shiftName === null)
            throw new globalThis.Error("The parameter 'shiftName' cannot be null.");
        else if (shiftName !== undefined)
            url_ += "shiftName=" + encodeURIComponent("" + shiftName) + "&";
        if (firstSlotStart === null)
            throw new globalThis.Error("The parameter 'firstSlotStart' cannot be null.");
        else if (firstSlotStart !== undefined)
            url_ += "firstSlotStart=" + encodeURIComponent("" + firstSlotStart) + "&";
        if (firstSlotEnd === null)
            throw new globalThis.Error("The parameter 'firstSlotEnd' cannot be null.");
        else if (firstSlotEnd !== undefined)
            url_ += "firstSlotEnd=" + encodeURIComponent("" + firstSlotEnd) + "&";
        if (secondSlotStart === null)
            throw new globalThis.Error("The parameter 'secondSlotStart' cannot be null.");
        else if (secondSlotStart !== undefined)
            url_ += "secondSlotStart=" + encodeURIComponent("" + secondSlotStart) + "&";
        if (secondSlotEnd === null)
            throw new globalThis.Error("The parameter 'secondSlotEnd' cannot be null.");
        else if (secondSlotEnd !== undefined)
            url_ += "secondSlotEnd=" + encodeURIComponent("" + secondSlotEnd) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processConfigureSplitShift(_response);
        });
    }

    protected processConfigureSplitShift(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    enableFirstInLastOut(enable?: boolean | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/EnableFirstInLastOut?";
        if (enable === null)
            throw new globalThis.Error("The parameter 'enable' cannot be null.");
        else if (enable !== undefined)
            url_ += "enable=" + encodeURIComponent("" + enable) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processEnableFirstInLastOut(_response);
        });
    }

    protected processEnableFirstInLastOut(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    tagAttendanceSource(attendanceId?: number | undefined, sourceType?: string | undefined, deviceId?: number | undefined, latitude?: number | undefined, longitude?: number | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/TagAttendanceSource?";
        if (attendanceId === null)
            throw new globalThis.Error("The parameter 'attendanceId' cannot be null.");
        else if (attendanceId !== undefined)
            url_ += "attendanceId=" + encodeURIComponent("" + attendanceId) + "&";
        if (sourceType === null)
            throw new globalThis.Error("The parameter 'sourceType' cannot be null.");
        else if (sourceType !== undefined)
            url_ += "sourceType=" + encodeURIComponent("" + sourceType) + "&";
        if (deviceId === null)
            throw new globalThis.Error("The parameter 'deviceId' cannot be null.");
        else if (deviceId !== undefined)
            url_ += "deviceId=" + encodeURIComponent("" + deviceId) + "&";
        if (latitude === null)
            throw new globalThis.Error("The parameter 'latitude' cannot be null.");
        else if (latitude !== undefined)
            url_ += "latitude=" + encodeURIComponent("" + latitude) + "&";
        if (longitude === null)
            throw new globalThis.Error("The parameter 'longitude' cannot be null.");
        else if (longitude !== undefined)
            url_ += "longitude=" + encodeURIComponent("" + longitude) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processTagAttendanceSource(_response);
        });
    }

    protected processTagAttendanceSource(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    syncOfflineAttendance(deviceId?: number | undefined, employeeId?: number | undefined, clockTime?: Date | undefined, type?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/SyncOfflineAttendance?";
        if (deviceId === null)
            throw new globalThis.Error("The parameter 'deviceId' cannot be null.");
        else if (deviceId !== undefined)
            url_ += "deviceId=" + encodeURIComponent("" + deviceId) + "&";
        if (employeeId === null)
            throw new globalThis.Error("The parameter 'employeeId' cannot be null.");
        else if (employeeId !== undefined)
            url_ += "employeeId=" + encodeURIComponent("" + employeeId) + "&";
        if (clockTime === null)
            throw new globalThis.Error("The parameter 'clockTime' cannot be null.");
        else if (clockTime !== undefined)
            url_ += "clockTime=" + encodeURIComponent(clockTime ? "" + clockTime.toISOString() : "") + "&";
        if (type === null)
            throw new globalThis.Error("The parameter 'type' cannot be null.");
        else if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSyncOfflineAttendance(_response);
        });
    }

    protected processSyncOfflineAttendance(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    logAttendanceEdit(attendanceId?: number | undefined, editedBy?: number | undefined, oldValue?: Date | undefined, newValue?: Date | undefined, editTimestamp?: Date | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/LogAttendanceEdit?";
        if (attendanceId === null)
            throw new globalThis.Error("The parameter 'attendanceId' cannot be null.");
        else if (attendanceId !== undefined)
            url_ += "attendanceId=" + encodeURIComponent("" + attendanceId) + "&";
        if (editedBy === null)
            throw new globalThis.Error("The parameter 'editedBy' cannot be null.");
        else if (editedBy !== undefined)
            url_ += "editedBy=" + encodeURIComponent("" + editedBy) + "&";
        if (oldValue === null)
            throw new globalThis.Error("The parameter 'oldValue' cannot be null.");
        else if (oldValue !== undefined)
            url_ += "oldValue=" + encodeURIComponent(oldValue ? "" + oldValue.toISOString() : "") + "&";
        if (newValue === null)
            throw new globalThis.Error("The parameter 'newValue' cannot be null.");
        else if (newValue !== undefined)
            url_ += "newValue=" + encodeURIComponent(newValue ? "" + newValue.toISOString() : "") + "&";
        if (editTimestamp === null)
            throw new globalThis.Error("The parameter 'editTimestamp' cannot be null.");
        else if (editTimestamp !== undefined)
            url_ += "editTimestamp=" + encodeURIComponent(editTimestamp ? "" + editTimestamp.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processLogAttendanceEdit(_response);
        });
    }

    protected processLogAttendanceEdit(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    applyHolidayOverrides(holidayId: number, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/ApplyHolidayOverrides/{holidayId}";
        if (holidayId === undefined || holidayId === null)
            throw new globalThis.Error("The parameter 'holidayId' must be defined.");
        url_ = url_.replace("{holidayId}", encodeURIComponent("" + holidayId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processApplyHolidayOverrides(_response);
        });
    }

    protected processApplyHolidayOverrides(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    manageUserAccounts(userId?: number | undefined, role?: string | undefined, action?: string | undefined, signal?: AbortSignal): Promise<FileResponse> {
        let url_ = this.baseUrl + "/SystemAdmin/ManageUserAccounts?";
        if (userId === null)
            throw new globalThis.Error("The parameter 'userId' cannot be null.");
        else if (userId !== undefined)
            url_ += "userId=" + encodeURIComponent("" + userId) + "&";
        if (role === null)
            throw new globalThis.Error("The parameter 'role' cannot be null.");
        else if (role !== undefined)
            url_ += "role=" + encodeURIComponent("" + role) + "&";
        if (action === null)
            throw new globalThis.Error("The parameter 'action' cannot be null.");
        else if (action !== undefined)
            url_ += "action=" + encodeURIComponent("" + action) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processManageUserAccounts(_response);
        });
    }

    protected processManageUserAccounts(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}



export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}

function isAxiosError(obj: any): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}


