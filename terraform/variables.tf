variable "region" {
  default = "eu-central-1"
}

variable "cluster_name" {
  default = "devops-cluster"
}

variable "node_instance_type" {
  default = "t3.small"
}

variable "node_desired" {
  default = 2
}

variable "node_min" {
  default = 1
}

variable "node_max" {
  default = 3
}
