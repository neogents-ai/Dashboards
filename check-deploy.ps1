$headers = @{
    "Authorization" = "Bearer rnd_GowGk0vEpSkGmgJxKt3r1MbYHunl"
    "Accept" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.render.com/v1/services/srv-d8grl8u47okc73849mt0/deploys?limit=1" -Method Get -Headers $headers
    $deploy = $response[0].deploy
    Write-Host "Latest Deploy:"
    Write-Host "  ID: $($deploy.id)"
    Write-Host "  Status: $($deploy.status)"
    Write-Host "  Commit: $($deploy.commit.message)"
    Write-Host "  Finished: $($deploy.finishedAt)"
} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
}
