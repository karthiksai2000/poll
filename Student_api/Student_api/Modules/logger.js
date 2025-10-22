function logRequest(method, url) {
    const time = new Date().toLocaleString();
    console.log(`[${time}] ${method} request to ${url}`);
}
module.exports = logRequest;
