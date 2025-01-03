const handleRequest = (promise) => {
    return promise
        .then((data) => [undefined, data])
        .catch((err) => [err, undefined]);
};

module.exports = handleRequest;
