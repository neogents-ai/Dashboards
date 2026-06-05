$base = "C:\Users\Admin\Desktop\neo-gents-os\Dashboards\artifacts\mockup-sandbox\src\components\dashboard"

$dashboards = @(
    @{File="$base\aesthetician\DashboardAesthetician2.tsx"; Token="$base\aesthetician\aesthetician-tokens.css"; Accent="#10b981"; Name="Sofia"; Initials="SO"; Business="Glow Aesthetics"; Gradient=@("#10b981","#059669")},
    @{File="$base\barber\DashboardBarber2.tsx"; Token="$base\barber\barber-tokens.css"; Accent="#f59e0b"; Name="Marcus"; Initials="MA"; Business="The Fade Room"; Gradient=@("#f59e0b","#d97706")},
    @{File="$base\creators\DashboardCreators.tsx"; Token="$base\creators\creators-tokens.css"; Accent="#6366f1"; Name="Kai"; Initials="KA"; Business="Creator Studio"; Gradient=@("#6366f1","#4f46e5")},
    @{File="$base\hairstylist\DashboardHairstylist.tsx"; Token=""; Accent="#ec4899"; Name="Lisa"; Initials="LI"; Business="Lisa's Salon"; Gradient=@("#ec4899","#db2777")},
    @{File="$base\realtor\DashboardRealtor2.tsx"; Token="$base\realtor\realtor-tokens.css"; Accent="#3b82f6"; Name="Jordan"; Initials="JO"; Business="Jordan Realty"; Gradient=@("#3b82f6","#2563eb")}
)

foreach ($d in $dashboards) {
    $content = Get-Content -Raw $d.File

    # 1. Replace imports
    $content = $content -replace 'import\s+\{\s*GlassShell\s*,\s*type\s+TabKey\s*\}\s+from\s+"[^"]+"', 'import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell"'
    $content = $content -replace 'import\s+"../shared/glass-tokens\.css"', 'import "../shared/dashboard-light.css"'

    # 2. Replace useState<TabKey> with useState<string>
    $content = $content -replace 'useState<TabKey>', 'useState<string>'

    # 3. Replace GlassShell with LightDashboardShell
    $content = $content -replace '\bGlassShell\b', 'LightDashboardShell'

    # 4. Remove className="xxx-canvas" from LightDashboardShell
    $content = $content -replace '\s+className="[a-z-]+-canvas"', ''

    # 5. Replace dark colors with light colors
    $content = $content.Replace('text-white', 'text-[var(--dl-ink)]')
    $content = $content.Replace('text-[#888]', 'text-[var(--dl-muted)]')
    $content = $content.Replace('text-[#666]', 'text-[var(--dl-muted)]')
    $content = $content.Replace('text-[#444]', 'text-[var(--dl-muted)]')
    $content = $content.Replace('bg-[var(--canvas-surface)]', 'bg-white/40')
    $content = $content.Replace('bg-[var(--canvas-surface-raised)]', 'bg-white/60')
    $content = $content.Replace('border-[var(--canvas-border)]', 'border-white/50')
    $content = $content.Replace('hover:bg-[#222]', 'hover:bg-white/80')
    $content = $content.Replace('hover:bg-[#1a1a1a]', 'hover:bg-white/70')

    Set-Content -NoNewline -Path $d.File -Value $content
    Write-Host "Done - $($d.File)"

    # Update token file if exists
    if ($d.Token -and (Test-Path $d.Token)) {
        $tc = Get-Content -Raw $d.Token
        $tc = $tc -replace '--canvas-base:\s*#[^;]+', '--canvas-base: #f8fafc'
        $tc = $tc -replace '--canvas-gradient:\s*#[^;]+', '--canvas-gradient: #f8fafc'
        $tc = $tc -replace '--canvas-surface:\s*#[^;]+', '--canvas-surface: rgba(255,255,255,0.45)'
        $tc = $tc -replace '--canvas-surface-raised:\s*#[^;]+', '--canvas-surface-raised: rgba(255,255,255,0.6)'
        $tc = $tc -replace '--canvas-border:\s*#[^;]+', '--canvas-border: rgba(255,255,255,0.5)'
        $tc = $tc -replace '--canvas-border-hover:\s*#[^;]+', '--canvas-border-hover: rgba(255,255,255,0.7)'
        Set-Content -NoNewline -Path $d.Token -Value $tc
        Write-Host "Done - $($d.Token)"
    }
}

Write-Host "All dashboards migrated to light theme!"
