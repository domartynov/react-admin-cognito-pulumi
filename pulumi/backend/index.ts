import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const project = pulumi.getProject()

// TODO temp
const corsHeaders = () => {
    return {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Expose-Headers": "*"
    }
}

const sampleTodos = [
    {id: "1", done: false, title: "item 1"},
    {id: "2", done: false, title: "item 2"},
    {id: "3", done: true, title: "item 3"},
]

const api = new awsx.apigateway.API(`${project}-api`, {
    routes: [
        {
            path: "/",
            method: "GET",
            eventHandler: async (event) => {
                return {
                    statusCode: 200,
                    body: "Hello!!!",
                    headers: {...corsHeaders()}
                }
            }
        },
        {
            path: "/todos",
            method: "GET",
            eventHandler: async (event) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(sampleTodos),
                    headers: {
                        "X-Total-Count": sampleTodos.length,
                        "Content-Type": "application/json; charset=utf-8",
                        ...corsHeaders(),
                    }
                }

            }
        }],
})


const cognitoUserPool = new aws.cognito.UserPool(`${project}-pool`, {})
const cognitoAppClient = new aws.cognito.UserPoolClient(`${project}-appclient`, {
    userPoolId: cognitoUserPool.id
})


export const apiUrl = api.url
export const cognitoRegionId = pulumi.output(aws.getRegion()).apply(r => r.id)
export const cognitoUserPoolId = cognitoUserPool.id
export const cognitoAppClientId = cognitoAppClient.id

