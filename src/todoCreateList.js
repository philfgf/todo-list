"use strict";

var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, "  "));
    
    try {
        var body = JSON.parse(event.body);
    } catch (err) {
        const response = {
            statusCode: 400,
            body: "Missing JSON body."
        };
        return response;
    }

    if (!body.name || !body.description) {
        const response = {
            statusCode: 400,
            body: "Missing some required fields in the JSON body."
        };
        return response;
    }

    if (typeof body.name !== "string" || typeof body.description !== "string") {
        const response = {
            statusCode: 400,
            body: "JSON fields have to be string."
        };
        return response;
    }

    var tableName = "todo_list";

    var todoParams = {
        TableName: tableName,
        Item: {
            list_name: {S: body.name},
            item_name: {S: "0000"},
            list_description: {S: body.description}
        }
    }
    
    try {
        await dynamodb.putItem(todoParams).promise();
    } catch (err) {
        throw new Error(`Error creating todo list: ${JSON.stringify(err)}`);
    }

    const response = {
        statusCode: 200,
        body: "Successfully created todo list."
    };

    return response;
};