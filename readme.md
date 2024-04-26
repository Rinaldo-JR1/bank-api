# Bank API

update your docker file with your credentials

```dockerfile
MYSQL_ROOT_PASSWORD: YOURPASSWORD
MYSQL_DATABASE: Bank_DB
MYSQL_USER: YOURUSER
MYSQL_PASSWORD: YOURPASSWORD
```


Initilize Docker Mysql Docker

```bash
docker compose up -d
```
Install Dependencies

```bash
npm install
#or
yarn install
```
.development.env file (For development)
```env
PORT = 2004
DATABASE_URL="mysql://yourUser:yourPassword@localhost:3306/Bank_DB"
```
.env file (For production)
```env
PORT = 3003
DATABASE_URL="mysql://yourUser:yourPassword@localhost:3306/Bank_DB"
```

### Run the aplication in development mode

```bash
    npm run dev
```

### Run the aplication in production mode
```bash
    #Compile The project
    npm run compile
    #Run the project
    npm run start
``` 
### Postman Json (bank-postman.json)
```json
{
	"info": {
		"_postman_id": "136d02c6-e201-4b22-9295-23312fe57a31",
		"name": "Bank api",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "22563392"
	},
	"item": [
		{
			"name": "Account Requests",
			"item": [
				{
					"name": "Deactivate account",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{url}}/account/desativate/:id",
							"host": [
								"{{url}}"
							],
							"path": [
								"account",
								"desativate",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "clvfnpb9d0000ouymb8zxr8lp"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Get account by id",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{url}}/account/get/:id",
							"host": [
								"{{url}}"
							],
							"path": [
								"account",
								"get",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "clvfnpb9d0000ouymb8zxr8lp"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "New account",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\":\"Allan\",\n    \"email\":\"allan@email.com.br\",\n    \"password\":\"123456\",\n    \"cpf\":\"12312312333\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{url}}/account/new",
							"host": [
								"{{url}}"
							],
							"path": [
								"account",
								"new"
							]
						}
					},
					"response": []
				},
				{
					"name": "Count Users",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{url}}/account/count",
							"host": [
								"{{url}}"
							],
							"path": [
								"account",
								"count"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Deposits",
			"item": [
				{
					"name": "Novo deposito",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id\":\"clvfnpb9d0000ouymb8zxr8lp\",\n    \"value\":10000\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{url}}/deposit/",
							"host": [
								"{{url}}"
							],
							"path": [
								"deposit",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "WIthdraws",
			"item": [
				{
					"name": "Witdhraw",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id\":\"clvfnpb9d0000ouymb8zxr8lp\",\n    \"value\":1700\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{url}}/withdraw/",
							"host": [
								"{{url}}"
							],
							"path": [
								"withdraw",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Transactions",
			"item": [
				{
					"name": "New Request",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"recieverId\": \"clvgo3on7000012jljwmqzr1o\",\n    \"senderId\": \"clvfnpb9d0000ouymb8zxr8lp\",\n    \"value\": 900\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{url}}/transactions/",
							"host": [
								"{{url}}"
							],
							"path": [
								"transactions",
								""
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
```


