/**
 * Refusal of the API, taken apart
 *
 * The API answers an error with `[{code, error, reason?}]`: `code` repeats the
 * HTTP status, `error` is a translated message and `reason` a machine code the
 * client can branch on (need_to_pay, attempts_exhausted, time_expired, ...).
 */
export interface ApiError {

    /** HTTP status, null when the request never reached the server */
    status: number | null;

    /** Machine code of the refusal, null when the server gave none */
    reason: string | null;

    /** Translated message, may be empty */
    message: string;

    /** Seconds from Retry-After, when the server sent one */
    retryAfter: number | null;
}

export const describeError = (error: any): ApiError => {
    const response = error?.response;
    if (!response) {
        return { status: null, reason: null, message: '', retryAfter: null };
    }

    const body = response.data;
    const first = Array.isArray(body) ? body[0] : body;
    const retryAfter = parseInt(response.headers?.['retry-after'] ?? '', 10);

    return {
        status: response.status ?? null,
        reason: first?.reason ?? null,
        message: typeof first?.error === 'string' ? first.error : '',
        retryAfter: isNaN(retryAfter) ? null : retryAfter
    };
};
