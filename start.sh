#!/bin/bash
echo "========================================================"
echo "  Launching ContentCraft AI (Autonomous Agent Engine)"
echo "========================================================"
echo ""
echo "Starting server on http://localhost:3000 ..."

if which xdg-open > /dev/null; then
  xdg-open http://localhost:3000 &
elif which open > /dev/null; then
  open http://localhost:3000 &
fi

npx -y serve . -l 3000
