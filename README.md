# todo-list
Full Stack Tech Assignment <br />
<br />
API URL: https://vb93flt8m0.execute-api.us-east-2.amazonaws.com/prod/ <br />
POST /list/create – {description} <br />
 { <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name": “string”, <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "description": “string” <br />
 } <br />

POST /list/{list_name}/item – {description} <br />
{ <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name": “string”  <br />
} <br />

DELETE /list/{list_name}/item - {description} <br />
{ <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name": “string” <br />
} <br />

GET /list/{list_name}/get-items - {description} <br />

Postman Link: https://github.com/philfgf/todo-list/blob/main/todo-list-api.postman_collection.json <br />

![alt text](https://github.com/philfgf/todo-list/blob/main/gateway%20%20methods.PNG)

