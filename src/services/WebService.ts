import { Transport as ITransport } from '../interfaces/services/Transport';

/**
 * Base web service
 */
export abstract class WebService {
    private transport: ITransport;

    /**
     * Set transport
     * 
     * @param transport 
     */
    setTransport(transport: ITransport): WebService {
        this.transport = transport;

        return this;
    }

    /**
     * Get transport
     */
    getTransport(): ITransport {
        return this.transport;
    }

    objectToMap(o: any): Map<string, any> {
        const mp = new Map;
        Object.keys(o).forEach(k => { mp.set(k, o[k]) });
        return mp;
    }
}