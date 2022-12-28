#!/bin/sh

avahi-daemon -D --no-rlimits --debug
/usr/sbin/cups-browsed &
/etc/init.d/epson_devicecontrollogserviced restart
/etc/init.d/epson_pcsvcd restart
/usr/sbin/cupsd -f
