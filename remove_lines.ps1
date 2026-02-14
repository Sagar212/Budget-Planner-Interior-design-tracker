$file = "j:\Git repo\Budget-Planner-Interior-design-tracker\index.html"
$lines = Get-Content $file
$newLines = $lines[0..3324] + $lines[3546..($lines.Count-1)]
$newLines | Set-Content $file -Encoding UTF8
Write-Host "Lines removed."
