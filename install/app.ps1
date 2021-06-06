IF (!(Test-Path HKCU:\Software\Classes\app))
{
    New-Item -Path HKCU:\Software\Classes\app -Force | Out-Null
    Set-Itemproperty -path HKCU:\Software\Classes\app -Name "URL Protocol" -Value "ServiceStack app"
    New-Item -Path HKCU:\Software\Classes\app\shell\open\command -Force | Out-Null
    Set-Item -Path HKCU:\Software\Classes\app\shell\open\command -Value "$env:USERPROFILE\.dotnet\tools\app.exe ""%1""" -Force | Out-Null
}
$hold = $ErrorActionPreference 
$ErrorActionPreference = 'stop'
try { Get-Command app }
catch {
    Write-Output "Installing 'app' dotnet tool, this will take a while..."
    dotnet tool install -g app
} finally { $ErrorActionPreference = $hold }
