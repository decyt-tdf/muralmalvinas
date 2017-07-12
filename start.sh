if [ -z "`docker network ls | grep 'panel-net'`" ];
 then docker network create --driver bridge panel-net;
 fi
docker run -d --name muraldb \
 -v /data/db \
 --network panel-net \
 -d mongo:3.4 
docker run -d -p 8081 \
 --network panel-net \
 --name muralmalvinas \
 -v /home/img \
 -v /home/imgthumb \
 -e "VIRTUAL_HOST=muralmalvinas.tierradelfuego.gob.ar" \
 -e "HTTPS_METHOD=nohttps" \
 -e "VIRTUAL_PORT=8081" \
 -d decyt/muralmalvinas
docker network connect bridge muralmalvinas
