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
        todoParams = {
            TableName: tableName,
            KeyConditionExpression: "#list_name = :list_name AND #item_name > :item_name",
            ExpressionAttributeNames: {
                "#list_name": "list_name",
                "#item_name": "item_name"
            },
            ExpressionAttributeValues: {
                ":list_name": {S: listName},
                ":item_name": {S: "0000"}
            }
        };
        data = await dynamodb.query(todoParams).promise();
    } catch (err) {
        throw new Error(`Error adding item: ${JSON.stringify(err)}`);
    }
   
    var items = data.Items.map(
        function (item) {
            return item.item_name.S;
        }
    );
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };
    
    return response;
};