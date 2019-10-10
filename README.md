## Exiletrade
Exiletrade is a wrapper for pathofexile.com/trade
- trade is always on top (Path of Exile have to be ***windowed or windowed fullscreen***)
- click on whisper button sends trade request instantly
- hotkey for minimize/restore (***alt+f*** default)

## Building from sources

### Required
- [Node.js](https://nodejs.org/) (10.16.3 and 12.11.1 work for me)
- [CMake](https://www.cmake.org/download/)
- A proper C/C++ compiler toolchain of the given platform
    - **Windows**:
        - [Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
        or a recent version of Visual C++ will do ([the free Community](https://www.visualstudio.com/products/visual-studio-community-vs) version works well)
		
### Build
    git clone https://gitlab.com/Linhurdos/Exiletrade . 
    npm install
    npm run build

## OS support
Only Windows (window management module works using WinApi)

Linux version comming soon
