$headers = @{
    "Authorization" = "Bearer rnd_GowGk0vEpSkGmgJxKt3r1MbYHunl"
    "Accept" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.render.com/v1/services?limit=20" -Method Get -Headers $headers
    Write-Host "Services found:"
    $response | ForEach-Object {
        Write-Host "ID: $($_.service.id) | Name: $($_.service.name) | Type: $($_.service.type) | URL: $($_.service.serviceDetails.url)"
    }
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
