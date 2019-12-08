## Exiletrade
Exiletrade is an overlay wrapper for [https://pathofexile.com/trade](https://pathofexile.com/trade)
- Trade is always on top (Path of Exile have to be ***windowed or windowed fullscreen***)
- Click on whisper/contant button sends trade request instantly
- Hotkey for hide/show (***alt+a*** as default)

### How to install
Download and install Java: [https://java.com/download](https://java.com/download)
Download Exiletrade.zip: [Latest release](https://github.com/DoomerRoman/Exiletrade/releases

## Building from sources
### Required
- [Node.js](https://nodejs.org/) (10.16.3 and 12.11.1 work for me)
- [CMake](https://www.cmake.org/download/)
- A proper C/C++ compiler toolchain of the given platform
    - **Windows**:
        - [Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
        or a recent version of Visual C++ will do ([the free Community](https://www.visualstudio.com/products/visual-studio-community-vs) version works well)
		
### Build
	git clone https://github.com/DoomerRoman/Exiletrade .
	or
    git clone https://gitlab.com/DoomerRoman/Exiletrade .
    npm install
    npm run build

## OS support
Only Windows (window management module works using WinApi)

