// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        console.log('Path info: ' + event.path);

        if (!event.pathParameters) {
            throw 'No path parameters were matched!';
        }

        const id = event.pathParameters.user_id
        if (!id) {
            throw 'No user id!';
        }

        console.log(`Retrieving record for user ${id}`);
        if (id !== '1039877046') {
            throw 'Unknown record';
        }

        if (event.httpMethod !== "GET" && event.httpMethod !== "OPTIONS") {
            throw `Invalid method ${event.httpMethod}`;
        }

        // For OPTIONS or GET
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
        }

        if (event.httpMethod === "GET") {
            response.body = JSON.stringify({
                id: id,
                message: 'Record for user',
                curr_rank: 'LCDR',
                name: 'Sailor McSailorson',
                curr_serv_start: '2003-11-18',
            })
        }
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 400,
            'headers': {},
            'body': JSON.stringify({
                message: "An error was encountered",
            })
        }
    }

    response.headers['Content-Type'] = 'application/json';
    return response
};
