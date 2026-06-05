$headers = @{
    "Authorization" = "Bearer rnd_GowGk0vEpSkGmgJxKt3r1MbYHunl"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$body = @{
    "name" = "neogents.tech"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.render.com/v1/services/srv-d8grl8u47okc73849mt0/customDomains" -Method Post -Headers $headers -Body $body
    Write-Host "SUCCESS: Custom domain added"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response: $errorBody"
    }
}
