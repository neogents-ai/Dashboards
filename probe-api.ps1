$headers = @{
    "Authorization" = "Bearer rnd_GowGk0vEpSkGmgJxKt3r1MbYHunl"
    "Accept" = "application/json"
}

$endpoints = @(
    "https://api.render.com/v1/services/srv-d8grl8u47okc73849mt0/customDomains",
    "https://api.render.com/v1/services/srv-d8grl8u47okc73849mt0/custom-domains",
    "https://api.render.com/v1/customDomains",
    "https://api.render.com/v1/custom-domains"
)

foreach ($uri in $endpoints) {
    try {
        $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
        Write-Host "SUCCESS: $uri"
        $response | ConvertTo-Json -Depth 5
        break
    } catch {
        Write-Host "FAILED: $uri - $($_.Exception.Message)"
    }
}
