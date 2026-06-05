param(
    [string]$DashboardFile,
    [string]$TokenFile = "",
    [string]$AccentColor = "#3b6bff",
    [string]$UserName = "User",
    [string]$UserInitials = "U",
    [string]$BusinessName = "",
    [string[]]$AvatarGradient = @("#3b6bff", "#6366f1"),
    [string]$Tab1 = "home",
    [string]$Tab1Label = "Dashboard",
    [string]$Tab1Icon = "LayoutDashboard",
    [string]$Tab2 = "calendar",
    [string]$Tab2Label = "Calendar",
    [string]$Tab2Icon = "Calendar",
    [string]$Tab3 = "clients",
    [string]$Tab3Label = "Clients",
    [string]$Tab3Icon = "Users",
    [string]$Tab4 = "money",
    [string]$Tab4Label = "Money",
    [string]$Tab4Icon = "DollarSign",
    [string]$Tab5 = "more",
    [string]$Tab5Label = "More",
    [string]$Tab5Icon = "MoreHorizontal"
)

$content = Get-Content -Raw $DashboardFile

# 1. Replace imports
$content = $content -replace 'import\s+\{\s*GlassShell\s*,\s*type\s+TabKey\s*\}\s+from\s+"[^"]+"', 'import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell"'
$content = $content -replace 'import\s+"../shared/glass-tokens\.css"', 'import "../shared/dashboard-light.css"'

# 2. Replace useState<TabKey> with useState
$content = $content -replace 'useState<TabKey>', 'useState'

# 3. Replace GlassShell wrapper with LightDashboardShell
# This is a complex regex - we'll do a simpler string replacement
$content = $content -replace '<GlassShell', '<LightDashboardShell'
$content = $content -replace '</GlassShell>', '</LightDashboardShell>'

# 4. Remove className="photography-canvas" or similar
$content = $content -replace '\s+className="[^"]*-canvas"', ''

# 5. Replace dark colors with light colors
$replacements = @(
    @('text-white', 'text-[var(--dl-ink)]'),
    @('text-[#888]', 'text-[var(--dl-muted)]'),
    @('text-[#666]', 'text-[var(--dl-muted)]'),
    @('text-[#444]', 'text-[var(--dl-muted)]'),
    @('bg-[var(--canvas-surface)]', 'bg-white/40'),
    @('bg-[var(--canvas-surface-raised)]', 'bg-white/60'),
    @('border-[var(--canvas-border)]', 'border-white/50'),
    @('hover:bg-[#222]', 'hover:bg-white/80'),
    @('hover:bg-\[#1a1a1a\]', 'hover:bg-white/70')
)

foreach ($r in $replacements) {
    $content = $content.Replace($r[0], $r[1])
}

Set-Content -NoNewline -Path $DashboardFile -Value $content
Write-Host "Done - $DashboardFile"

# Update token file if provided
if ($TokenFile -and (Test-Path $TokenFile)) {
    $tokenContent = Get-Content -Raw $TokenFile
    $tokenContent = $tokenContent -replace '--canvas-base:\s*#[^;]+', '--canvas-base: #f8fafc'
    $tokenContent = $tokenContent -replace '--canvas-gradient:\s*#[^;]+', '--canvas-gradient: #f8fafc'
    $tokenContent = $tokenContent -replace '--canvas-surface:\s*#[^;]+', '--canvas-surface: rgba(255,255,255,0.45)'
    $tokenContent = $tokenContent -replace '--canvas-surface-raised:\s*#[^;]+', '--canvas-surface-raised: rgba(255,255,255,0.6)'
    $tokenContent = $tokenContent -replace '--canvas-border:\s*#[^;]+', '--canvas-border: rgba(255,255,255,0.5)'
    $tokenContent = $tokenContent -replace '--canvas-border-hover:\s*#[^;]+', '--canvas-border-hover: rgba(255,255,255,0.7)'
    Set-Content -NoNewline -Path $TokenFile -Value $tokenContent
    Write-Host "Done - $TokenFile"
}
