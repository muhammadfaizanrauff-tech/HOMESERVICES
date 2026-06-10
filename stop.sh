#!/bin/bash
# ChrisAlchemy — stop local dev server

DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$DIR/.server.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "No PID file found. Server may not be running."
  exit 0
fi

PID=$(cat "$PID_FILE")
if kill -0 "$PID" 2>/dev/null; then
  kill "$PID"
  rm "$PID_FILE"
  echo "Server (PID $PID) stopped."
else
  echo "No server running at PID $PID."
  rm -f "$PID_FILE"
fi
