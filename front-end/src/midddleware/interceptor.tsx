const { fetch: originalFetch } = window;
export function fetchInterceptor() {
    window.fetch = async (...args) => {
        let [resource, config ] = args;
        // request interceptor ends
       document.body.classList.add('loading-indicator', 'loading-gif');
        const response = await originalFetch(resource, config);
        // response interceptor here
        document.body.classList.remove('loading-indicator', 'loading-gif');
        return response;
    };
}

