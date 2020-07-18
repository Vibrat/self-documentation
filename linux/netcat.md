# Learn how to use netcat

https://www.digitalocean.com/community/tutorials/how-to-use-netcat-to-establish-and-test-tcp-and-udp-connections-on-a-vps


# Netcat in Docker containers:

* The normal command of netcat does not work in docker containers. So in docker network, please use the following `nc -vlkp 9999`
