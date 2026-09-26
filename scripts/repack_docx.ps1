param (
    [Parameter(Mandatory=$true)]
    [string]$UnpackedDir,

    [Parameter(Mandatory=$true)]
    [string]$OutputDocx,

    [Parameter(Mandatory=$false)]
    [string]$OutputPdf = ""
)

# 1. Compress directory to .zip then rename to .docx
$tempZip = [System.IO.Path]::ChangeExtension($OutputDocx, ".zip")
if (Test-Path $tempZip) { Remove-Item $tempZip -Force }
if (Test-Path $OutputDocx) { Remove-Item $OutputDocx -Force }

Write-Host "Compressing $UnpackedDir to $OutputDocx..."
Compress-Archive -Path "$UnpackedDir\*" -DestinationPath $tempZip -Force
Move-Item $tempZip $OutputDocx -Force
Write-Host "Successfully generated: $OutputDocx"

# 2. Optionally convert to PDF using native Word COM automation
if ($OutputPdf -ne "") {
    Write-Host "Exporting to PDF: $OutputPdf..."
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    try {
        $doc = $word.Documents.Open((Resolve-Path $OutputDocx).Path, $false, $true)
        $doc.SaveAs([ref](Resolve-Path -Path (Split-Path $OutputPdf -Parent) | Join-Path -ChildPath (Split-Path $OutputPdf -Leaf)), [ref]17)
        $doc.Close()
        Write-Host "Successfully created PDF: $OutputPdf"
    } catch {
        Write-Host "Error converting to PDF: $_"
    } finally {
        $word.Quit()
    }
}
