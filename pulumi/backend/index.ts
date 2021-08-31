import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const project = pulumi.getProject()

const api = new awsx.apigateway.API(`${project}-api`, {
    routes: [{
        path: "/",
        method: "GET",
        eventHandler: async (event) => {
           return {
               statusCode: 200,
               body: "Hello!!!",
           }
        }
    }],
})

const cognitoUserPool = new aws.cognito.UserPool(`${project}-pool`, {})
const cognitoAppClient = new aws.cognito.UserPoolClient(`${project}-appclient`, {
    userPoolId: cognitoUserPool.id
})

export const apiUrl = api.url
export const cognitoUserPoolId = cognitoUserPool.id
export const cognitoAppClientId = cognitoAppClient.id

