IF (!(Test-Path HKCU:\Software\Classes\gist))
{
    New-Item -Path HKCU:\Software\Classes\gist -Force | Out-Null
    Set-Itemproperty -path HKCU:\Software\Classes\gist -Name "URL Protocol" -Value "gist.cafe"
    New-Item -Path HKCU:\Software\Classes\gist\shell\open\command -Force | Out-Null
    Set-Item -Path HKCU:\Software\Classes\gist\shell\open\command -Value "$env:USERPROFILE\.dotnet\tools\x.exe ""%1""" -Force | Out-Null
}
$hold = $ErrorActionPreference 
$ErrorActionPreference = 'stop'
try { Get-Command x }
catch {
    Write-Output "Installing x dotnet tool..."
    dotnet tool install -g x 
} finally { $ErrorActionPreference = $hold }
