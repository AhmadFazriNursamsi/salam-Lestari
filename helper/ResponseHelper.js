const responseCodes = {
    created: 201,
    deleted: 200,
    updated: 200,
    no_content: 204,
    invalid_request: 400,
    unsupported_response_type: 400,
    invalid_scope: 400,
    invalid_grant: 400,
    invalid_credentials: 400,
    invalid_refresh: 400,
    no_data: 400,
    invalid_data: 400,
    access_denied: 401,
    unauthorized: 401,
    invalid_client: 401,
    forbidden: 403,
    resource_not_found: 404,
    not_acceptable: 406,
    resource_exists: 409,
    conflict: 409,
    resource_gone: 410,
    payload_too_large: 413,
    unsupported_media_type: 415,
    too_many_requests: 429,
    server_error: 500,
    unsupported_grant_type: 501,
    not_implemented: 501,
    temporarily_unavailable: 503,
};

const responseHelper = (req, res, next = null) => {
   
    if (res.json === undefined) {
        res.json = (data) => {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(data));
        };
    }

    res.respond = (data = null, status = 200, message = '') => {
        res.statusCode = status;
        if (data === null)
            res.end(message);
        else
            res.json(data);
    };

    res.success = (messages, status = 200, data = null) => {
        const response = {
            code: 0,
            error: null,
            message: messages,
            body: data
        };

        res.respond(response, status);
    };

    res.fail = (messages, status = 400, error = null) => {
        const response = {
            code: status,
            error: error,
            message: messages,
            body: null
        };

        res.respond(response, status);
    };

    res.respondCreated = (data = null, message = '') => {
        res.respond(data, responseCodes.created, message);
    };

    res.respondDeleted = (data = null, message = '') => {
        res.respond(data, responseCodes.deleted, message);
    };

    res.respondUpdated = (data = null, message = '') => {
        res.respond(data, responseCodes.updated, message);
    };

    res.respondNoContent = () => {
        res.respond(null, responseCodes.no_content);
    };

    res.failUnauthorized = (message) => {
        res.fail(message, responseCodes.unauthorized, 'Unauthorized');
    };

    res.failForbidden = (message) => {
        res.fail(message, responseCodes.forbidden, 'Forbidden');
    };

    res.failNotFound = (message) => {
        res.fail(message, responseCodes.resource_not_found, 'Not Found');
    };

    res.failValidationError = (message) => {
        res.fail(message, responseCodes.invalid_data, 'Bad Request');
    };

    res.failResourceExists = (message) => {
        res.fail(message, responseCodes.resource_exists, 'Conflict');
    };

    res.failResourceGone = (message) => {
        res.fail(message, responseCodes.resource_gone, 'Gone');
    };

    res.failTooManyRequests = (message) => {
        res.fail(message, responseCodes.too_many_requests, 'Too Many Requests');
    };

    res.failServerError = (message) => {
        res.fail(message, responseCodes.server_error, 'Internal Server Error');
    };

    if (next !== null)
        next();
};

module.exports = {
    helper: () => responseHelper,
    responseCodes: responseCodes,
};