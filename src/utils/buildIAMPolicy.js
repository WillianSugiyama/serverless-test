export default function buildIAMPolicy(userId, effect, resource, context) {
    console.log(`Building IAM Policy ${userId} ${effect} ${resource}`);

    const policy = {
        principalId: userId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            }, ],
        },
        context,
    };

    console.log(JSON.stringify(policy));

    return policy;
}