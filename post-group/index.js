'use strict'

const AWS = require('aws-sdk')
const uuid = require('uuid')

const docClient = new AWS.DynamoDB.DocumentClient()

const table = process.env.TABLE

exports.handler = async (event) => {
    console.log('Creating a group')
    const itemId = uuid.v4()

    const parsedBody = JSON.parse(event.body)

    const newItem = {
        id: itemId,
        name: parsedBody.name,
        description: parsedBody.description
    }

    await docClient.put({
        TableName: table,
        Item: newItem
    }).promise()


    // TODO implement
    const response = {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            newItem
        })
    };
    return response;
};
