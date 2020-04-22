resource "aws_db_subnet_group" "rds-private-subnet" {
  name       = "rds-private-subnet-group"
  subnet_ids = ["${aws_subnet.subnet-public-1.id}", "${aws_subnet.subnet-public-2.id}"]
}
