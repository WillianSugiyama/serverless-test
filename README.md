# How to start the infrastructure

## Requireds

      Terraform installed

## Step by Step (Aurora)

- Go to infra/rds folder
- Add the access key and secret_key (IAM AWS) on provider.tf
- Exec:
  `terraform init`
- and:
  `terraform apply`

## Step by Step (SQS)

- Go to infra/sqs folder
- Add the access key and secret_key (IAM AWS) on provider.tf
- Exec:
  `terraform init`
- and:
  `terraform apply`



# How to set envs on project:

- Set variables on secrets.json
- Set config on config/config.js (database access) you can up a local db on docker.

