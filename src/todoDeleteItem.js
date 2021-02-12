"use strict";

var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, "  "));
    
    var listName = decodeURI(event.pathParameters.list_name);
    var tableName = "todo_list";
    
    var todoParams = {
        TableName: tableName,
        KeyConditionExpression: "#list_name = :list_name AND #item_name = :item_name",
        ExpressionAttributeNames: {
            "#list_name": "list_name",
            "#item_name": "item_name"
        },
        ExpressionAttributeValues: {
            ":list_name": {S: listName},
            ":item_name": {S: "0000"}
        }
    };
    
    var data = await dynamodb.query(todoParams).promise();
    
    if (data.Items.length === 0) {
        const response = {
            statusCode: 400,
            body: "List name in the path does not exist in DynamoDb."
        };
        return response;
    }
    
    try {
        var body = JSON.parse(event.body);
    } catch (err) {
        const response = {
            statusCode: 400,
            body: "Missing JSON body."
        };
        return response;
    }
    
    if (!body.name) {
        const response = {
            statusCode: 400,
            body: "Missing some required fields in the JSON body."
        };
        return response;
    }
    
    if (typeof body.name !== "string") {
        const response = {
            statusCode: 400,
            body: "JSON fields have to be string"
        };
        return response;
    }
    
    try {
        todoParams = {
            TableName: tableName,
            Key: {
                list_name: {S: listName},
                item_name: {S: body.name}
            }
        };
        await dynamodb.deleteItem(todoParams).promise();
    } catch (err) {
        throw new Error(`Error deleting item: ${JSON.stringify(err)}`);
    }
    
    const response = {
        statusCode: 200,
        body: "Successfully deleted item from list."
    };
   
    return response;
};