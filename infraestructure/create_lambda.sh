LAMBDA_NAME="foresight-lambda"
AWS_REGION="us-east-1"

aws --profile kllmmc lambda create-function \
    --function-name $LAMBDA_NAME \
    --runtime PYTHON_3_9 \
    --environment "Variables={FUNCTION_URL_ENABLED=true}" \
    --handler "lambda_function.lambda_handler" \
    --code "def lambda_handler(event, context): \n  pass"

aws lambda update-function-configuration \
    --function-name $LAMBDA_NAME \
    --environment "Variables={FUNCTION_URL_ENABLED=true}" \
    --tracing-config "Mode=Active" \
    --cors-configuration "AllowOrigins=[*],AllowHeaders=[*],AllowMethods=[POST,OPTIONS],AllowCredentials=false"
