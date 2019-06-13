echo "Starting stream"

ffmpeg -re -i $1 -c:v libx264 -s 640x480 -input_format yuyv422 -preset superfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://$2:$3/live/$4