#!/bin/bash
# ChrisAlchemy — local dev server
# Usage: ./start.sh [port]

PORT=${1:-3000}
DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$DIR/.server.pid"

# Check if already running
if [ -f "$PID_FILE" ]; then
  OLD_PID=$(cat "$PID_FILE")
  if kill -0 "$OLD_PID" 2>/dev/null; then
    echo "Server already running (PID $OLD_PID) at http://localhost:$PORT"
    open "http://localhost:$PORT"
    exit 0
  fi
fi

echo "Starting ChrisAlchemy on http://localhost:$PORT ..."
cd "$DIR"
npm run dev -- --port "$PORT" &
SERVER_PID=$!
echo $SERVER_PID > "$PID_FILE"

# Wait for it to be ready
for i in {1..20}; do
  sleep 1
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" | grep -q "200"; then
    echo "Ready! Opening http://localhost:$PORT"
    open "http://localhost:$PORT"
    echo "PID $SERVER_PID saved. Run ./stop.sh to shut down."
    exit 0
  fi
done

echo "Server started (PID $SERVER_PID) — may still be compiling, check http://localhost:$PORT"
