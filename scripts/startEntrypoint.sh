sudo echo "server=$(cat /etc/resolv.conf | grep nameserver | head -n 1 | awk '{print $2}')" > /etc/dnsmasq.d/02-nameservers.conf
#update resolv.conf to localhost
sudo echo -e "nameserver 127.0.0.1:5300" > /etc/resolv.conf
/usr/sbin/dnsmasq --conf-dir=/etc/dnsmasq.d
su node -c "node lib/server"
