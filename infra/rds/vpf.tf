resource "aws_vpc" "vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
  enable_classiclink   = "false"
  instance_tenancy     = "default"
}

resource "aws_internet_gateway" "aig" {
  vpc_id = "${aws_vpc.vpc.id}"
}
