import { Model } from "../Model"
import { Program as IProgram, ProgramCertificate, ProgramCourse } from "../../interfaces/models/Programs/Program";
import { Price } from "../../interfaces/models/Payment/Price";
import { Price as PriceModel } from "../Payment/Price";
import { objectToMap } from "../../services/Helpers";

/**
 * Program: a list item of GET /api/v2/programs or the whole of GET /api/v2/programs/{id}
 *
 * The list item has no description, courses, progress or certificate; those
 * stay empty.
 */
export class Program extends Model implements IProgram {
    public title: string;
    public alias: string;
    public note: string;
    public description: string;
    public cover: string | null = null;
    public coverBig: string | null = null;
    public accessType: string;
    public timeLimit: number | null = null;
    public coursesCount: number = 0;
    public hasAccess: boolean = false;
    public accessTill: string | null = null;
    public canEnroll: boolean = false;
    public progress: number | null = null;
    public finished: boolean = false;
    public finishedAt: string | null = null;
    public courses: ProgramCourse[] = [];
    public certificate: ProgramCertificate | null = null;
    private prices: Array<Price> = [];

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    getPrices(): Price[] {
        return this.prices;
    }

    fill(attributes: Map<string, any>): IProgram {
        this.id = attributes.get('id');
        this.title = attributes.get('title');
        this.alias = attributes.get('alias');
        this.note = attributes.get('note');
        this.description = attributes.get('description') ?? '';
        this.accessType = attributes.get('access_type');
        this.timeLimit = attributes.get('time_limit') ?? null;
        this.coursesCount = attributes.get('courses_count') ?? 0;
        this.hasAccess = attributes.get('has_access') === true;
        this.accessTill = attributes.get('access_till') ?? null;
        this.canEnroll = attributes.get('can_enroll') === true;
        this.progress = typeof attributes.get('progress') === 'number' ? attributes.get('progress') : null;
        this.finished = attributes.get('finished') === true;
        this.finishedAt = attributes.get('finished_at') ?? null;

        const cover = Program.coverOf(attributes.get('cover'));
        this.cover = cover.medium;
        this.coverBig = cover.big;

        // absent when the program has no active price
        this.prices = (attributes.get('prices') ?? []).map((item: any) => new PriceModel(item instanceof Map ? item : objectToMap(item)));
        this.courses = (attributes.get('courses') ?? []).map(Program.courseOf);
        this.certificate = Program.certificateOf(attributes.get('certificate'));

        return this;
    }

    /** `[]` when there is no cover, a map of the versions otherwise */
    private static coverOf(cover: any): { medium: string | null, big: string | null } {
        if (!cover || Array.isArray(cover)) {
            return { medium: null, big: null };
        }

        return {
            medium: cover.medium ?? cover.big ?? null,
            big: cover.big ?? cover.medium ?? null
        };
    }

    private static courseOf(item: any): ProgramCourse {
        return {
            id: item.id,
            title: item.title,
            alias: item.alias,
            note: item.note ?? '',
            cover: Program.coverOf(item.cover).medium,
            timeLimit: item.time_limit ?? null,
            accessType: item.access_type,
            progress: typeof item.progress === 'number' ? item.progress : null,
            finished: item.finished === true,
            // 1/0 here, unlike the bool of the program
            hasAccess: item.has_access === true || item.has_access === 1
        };
    }

    private static certificateOf(data: any): ProgramCertificate | null {
        if (!data) {
            return null;
        }

        return {
            available: data.available === true,
            issued: data.issued === true,
            imageUrl: data.image_url || null,
            pdfUrl: data.pdf_url || null
        };
    }
}
