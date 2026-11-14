#!/usr/bin/env bash
# scripts/verify-structure.sh
# Verifies project structure against PROJECT_STRUCTURE.md for AI agents and developers.

set -e

echo "=== Verifying Project Structure ==="

ERRORS=0

check_path() {
    if [ -e "$1" ]; then
        echo "  [OK] $1"
    else
        echo "  [MISSING] $1"
        ERRORS=$((ERRORS + 1))
    fi
}

echo "Checking core root files..."
check_path "AGENTS.md"
check_path "PROJECT_STRUCTURE.md"
check_path "README.md"

echo "Checking Backend Go architecture..."
check_path "Backend_Go/main.go"
check_path "Backend_Go/cmd/serve.go"
check_path "Backend_Go/config/config.go"
check_path "Backend_Go/domain/appointment.go"
check_path "Backend_Go/appointment/service.go"
check_path "Backend_Go/repo/appointment.go"
check_path "Backend_Go/rest/server.go"
check_path "Backend_Go/rest/handlers/appointment/routes.go"
check_path "Backend_Go/rest/handlers/server_status/routes.go"
check_path "Backend_Go/migrations/000002-create-appointments.up.sql"

echo "Checking Frontend Svelte applications..."
check_path "Frontend_Svelte/Admin/package.json"
check_path "Frontend_Svelte/Admin/src/routes/+page.svelte"
check_path "Frontend_Svelte/Admin/src/lib/api.ts"
check_path "Frontend_Svelte/Client/package.json"

if [ $ERRORS -gt 0 ]; then
    echo "=== Verification Failed: $ERRORS path(s) missing ==="
    exit 1
fi

echo "=== Verification Succeeded: All core paths exist ==="
exit 0

