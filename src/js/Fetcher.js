class Fetcher {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async doFetch(resource, options = {}) {
        const {timeout = 8000} = options;

        const constroller = new AbortController();
        const timeoutId = setTimeout(() => constroller.abort(), timeout);

        const response = await fetch(this.baseUrl + resource, {
            ...options,
            signal: constroller.signal
        });

        clearTimeout(timeoutId);

        return response;
    }

    async get(endpoint, filterJsonKeys = []) {
        const response = await this.doFetch(endpoint);

        if(!response.ok) {
            throw new Error(`Fetch error ${response.status}`);
        }

        let jsonResult = await response.json();

        // Filter out sub part of json response if not the entire object is wanted.
        // If no keys are given, the response is returned as the endpoint has responded.
        filterJsonKeys.forEach(key => jsonResult = jsonResult[key]);

        return jsonResult;
    }
}

export default Fetcher;