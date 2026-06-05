$file = "C:\Users\Admin\Desktop\neo-gents-os\Dashboards\artifacts\mockup-sandbox\src\components\dashboard\photography\DashboardPhotography.tsx"
$content = Get-Content -Raw $file

# Dark theme → Light theme color replacements
$replacements = @(
    @('text-white', 'text-[var(--dl-ink)]'),
    @('text-[#888]', 'text-[var(--dl-muted)]'),
    @('text-[#666]', 'text-[var(--dl-muted)]'),
    @('text-[#444]', 'text-[var(--dl-muted)]'),
    @('bg-[var(--canvas-surface)]', 'bg-white/40'),
    @('bg-[var(--canvas-surface-raised)]', 'bg-white/60'),
    @('border-[var(--canvas-border)]', 'border-white/50'),
    @('hover:bg-[#222]', 'hover:bg-white/80'),
    @('bg-[var(--accent-rose-500)]', 'bg-amber-500'),
    @('bg-[var(--accent-rose-600)]', 'bg-amber-600'),
    @('text-[var(--accent-rose-400)]', 'text-amber-500'),
    @('text-[var(--accent-rose-500)]', 'text-amber-500'),
    @('text-[var(--accent-rose-600)]', 'text-amber-600')
)

foreach ($r in $replacements) {
    $content = $content.Replace($r[0], $r[1])
}

Set-Content -NoNewline -Path $file -Value $content
Write-Host "Done - replaced $($replacements.Count) patterns"
