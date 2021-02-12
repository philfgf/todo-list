# todo-list
Full Stack Tech Assignment

API URL: https://vb93flt8m0.execute-api.us-east-2.amazonaws.com/prod/
POST /list/create – {description}
•	JSON Body Schema => {
    name: “string”,
    description: “string”
} 
POST /list/{list_name}/item – {description}
•	JSON Body Schema => {
    name: “string” 
}
DELETE /list/{list_name}/item - {description}
•	JSON Body Schema => {
    name: “string” 
} 
GET /list/{list_name}/get-items - {description}

Postman Link: https://github.com/philfgf/todo-list/blob/main/todo-list-api.postman_collection.json
