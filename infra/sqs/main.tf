module "queue" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "~> 2.0"

  name = "queue"
}
