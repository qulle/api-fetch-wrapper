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
}

export default Fetcher;