#$1 is name of the stream
#$2 input source
#$3 is the port
#$5 output IP address
#$4 is the room number which helps to create the unique playlist file names]



streamUrl=$1
streamLow="rtmp://$5:$3/live/$1_st_low"
streamMid="rtmp://$5:$3/live/$1_st_mid"
streamHigh="rtmp://$5:$3/live/$1_st_high"

inital="http://192.168.0.114:$3/live/"
httpLow="$inital$1_st_low/index.m3u8"
httpMid="$inital$1_st_mid/index.m3u8"
httpHigh="$inital$1_st_high/index.m3u8"

echo $httpMid

finalplay="#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-STREAM-INF:BANDWIDTH=300000,RESOLUTION=640x360\n$httpLow\n#EXT-X-STREAM-INF:BANDWIDTH=600000,RESOLUTION=842x480\n$httpMid\n#EXT-X-STREAM-INF:BANDWIDTH=1000000,RESOLUTION=1280x720\n$httpHigh"

echo $finalplay > "./playlists/playlist$4.m3u8"

ffmpeg -re -hwaccel auto -i $2 \
 -vf scale=w=640:h=360 -c:a aac -ar 11025 -c:v h264 -crf 20 -f flv $streamLow \
 -vf scale=w=842:h=480 -c:a aac -ar 11025 -c:v h264  -crf 20  -f flv $streamMid \
 -vf scale=w=1280:h=720 -c:a aac -ar 48000 -c:v h264  -crf 20 -f flv $streamHigh
