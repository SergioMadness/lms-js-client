/**
 * An issued certificate
 */
export interface IssuedCertificate {
    id: string;
    number: string;
    createdAt: string | null;
    imageUrl: string | null;
    /** Null until the PDF is made: ask for it with pdf() */
    pdfUrl: string | null;
}

/** The names printed on a certificate; each falls back to the one of the profile */
export interface CertificateNames {
    firstName?: string;
    middleName?: string;
    lastName?: string;
}

/**
 * Interface for service to work with certificates (lms-certificates B2C)
 */
export interface Certificates {
    /**
     * Show the certificate of a course: the lesson `certificate` is passed by it
     */
    view(courseId: string, taskId: string): Promise<IssuedCertificate>;

    /**
     * Issue the certificate of a course again, with other names
     */
    issue(courseId: string, taskId: string, names?: CertificateNames): Promise<IssuedCertificate>;

    /**
     * Url of the PDF of the certificate of a course
     */
    pdf(courseId: string, taskId: string): Promise<string | null>;

    /**
     * Issue (or get the issued) certificate of a finished program
     */
    issueForProgram(programId: string): Promise<IssuedCertificate>;

    /**
     * Url of the PDF of the certificate of a program
     */
    programPdf(programId: string): Promise<string | null>;
}
