import { App, Stack, Environment, CfnParameter, Duration } from 'aws-cdk-lib';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, FunctionUrlAuthType, HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';

const stackName = 'foresight';
const env: Environment = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.REGION
};

const app = new App();

const stack = new Stack(app, 'dev', { stackName, env });

const websiteBucket = new CfnParameter(stack, "website", {
    type: "String",
    description: "Bucket for webapp hosting"});

const website = new Bucket(stack, 'Website', {
    bucketName: websiteBucket.valueAsString,
    websiteIndexDocument: 'index.html',
    blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
    encryption: BucketEncryption.S3_MANAGED,
    enforceSSL: false,
    versioned: false,
});

website.addToResourcePolicy(
    new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetObject'],
        resources: [website.arnForObjects('*')],
        principals: [new AnyPrincipal()],
    })
);

const backend = new Function(stack, 'Backend', {
    functionName: `${stackName}-backend`,
    runtime: Runtime.PYTHON_3_10,
    code: Code.fromInline('def lambda_handler(event, context):\n    pass'),
    handler: 'lambda_function.lambda_handler',
    timeout: Duration.seconds(15),
});

backend.addFunctionUrl({
    authType: FunctionUrlAuthType.NONE,
    cors: {
        allowedOrigins: ['*'],
        allowedMethods: [HttpMethod.POST],
        allowedHeaders: [
            'Content-Length', 'Accept', 'Date', 'Content-Type'
        ],
        exposedHeaders: [
            'Content-Length', 'Content-Type', 'Date',
            'X-Amz-Apigw-Id', 'X-Amzn-Requestid', 'X-Amzn-Trace-Id'
        ],
    }
});
