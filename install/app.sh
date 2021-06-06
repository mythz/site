#!/usr/bin/env sh

if [ ! -f /usr/bin/dotnet ]; then
    echo .NET 5 SDK Required
    xdg-open https://docs.microsoft.com/dotnet/core/install/linux
    exit 1;
fi

[ ! -f $HOME/.dotnet/tools/x ] && dotnet tool install -g x

cat <<EOF > ~/.local/share/applications/gistcafe.desktop
[Desktop Entry]
Type=Application
Name=gist hadler
Exec=$HOME/.dotnet/tools/x %u
StartupNotify=false
MimeType=x-scheme-handler/gist;
EOF

xdg-mime default gistcafe.desktop x-scheme-handler/gist
