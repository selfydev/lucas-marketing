# Fast push script for marketing app to GitHub
# This uses git archive + git push which is much faster than subtree split

$ErrorActionPreference = "Stop"

# Get the marketing remote URL
$remoteUrl = git remote get-url marketing
if (-not $remoteUrl) {
    Write-Host "Error: 'marketing' remote not found" -ForegroundColor Red
    exit 1
}

# Create a temporary directory
$tempDir = New-TemporaryFile | ForEach-Object { Remove-Item $_; New-Item -ItemType Directory -Path $_ }
$tempRepo = Join-Path $tempDir "marketing-repo"

try {
    # Clone the marketing repo to temp directory
    Write-Host "Cloning marketing repo..." -ForegroundColor Cyan
    git clone --depth 1 --branch tanstack-router $remoteUrl $tempRepo 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        # Branch doesn't exist, clone without branch
        git clone --depth 1 $remoteUrl $tempRepo 2>&1 | Out-Null
    }

    # Copy all files from apps/marketing to temp repo
    Write-Host "Copying files..." -ForegroundColor Cyan
    $sourceDir = "apps\marketing"
    $destDir = $tempRepo
    
    # Remove everything except .git
    Get-ChildItem -Path $destDir -Exclude .git | Remove-Item -Recurse -Force
    
    # Copy all files
    Copy-Item -Path "$sourceDir\*" -Destination $destDir -Recurse -Force -Exclude ".git"
    
    # Commit and push
    Push-Location $tempRepo
    try {
        git add -A
        $commitMsg = git log -1 --format=%s
        if (-not $commitMsg) {
            $commitMsg = "Update marketing site"
        }
        git commit -m $commitMsg --allow-empty 2>&1 | Out-Null
        git push origin tanstack-router --force 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully pushed to marketing repo!" -ForegroundColor Green
        } else {
            Write-Host "Error pushing to remote" -ForegroundColor Red
            exit 1
        }
    } finally {
        Pop-Location
    }
} finally {
    # Cleanup
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}

