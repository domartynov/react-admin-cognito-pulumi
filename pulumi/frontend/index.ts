import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as path from "path";
import * as mime from "mime";
import {readAllFiles, publicReadPolicyForBucket} from "./util"

const project = pulumi.getProject()

const siteDir = "../../frontend/build"
const siteBucket = new aws.s3.Bucket(`${project}-s3`, {
    website: {
        indexDocument: "index.html",
    },
})

for (let item of readAllFiles(siteDir)) {
    let filePath = path.join(siteDir, item);
    let object = new aws.s3.BucketObject(item, {
        bucket: siteBucket,
        source: new pulumi.asset.FileAsset(filePath),
        contentType: mime.getType(filePath) || undefined,
    });
}

let bucketPolicy = new aws.s3.BucketPolicy(`${project}-bucketPolicy`, {
    bucket: siteBucket.bucket,
    policy: siteBucket.bucket.apply(publicReadPolicyForBucket)
});

export const websiteUrl = siteBucket.websiteEndpoint
