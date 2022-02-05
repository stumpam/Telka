# Telka - Elgato Stream deck plugin for LG televisions

With this plugin you can control your LG television by Elgato Stream deck.

## It is beta version

You have to edit IP address in source and recompile project to work and label are for now just in `czech` language.

## How to use plugin

1. Clone repo to StreamDeck plugin folder in Windows typically
`C:\Users\<username>\AppData\Roaming\Elgato\StreamDeck\Plugins`

2. Open `eu.stumpa.telka.sdPlugin` folder

3. edit `lg/lg.ts` file - enter your tv's ip address on line 47

4. rebuild plugin
  - for first time run `yarn` or `npm install` for installation of dependencies
  - run `yarn run build` for compilation
  
5. Start your StreamDeck - plugin actions should appear in `Custom` folder
